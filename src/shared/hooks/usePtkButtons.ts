import { setGatePosition, setGateState } from '@/store/gateSlice';

import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';
import { PTK_BUTTONS_CONFIG } from '../configs/header';
import { useRef } from 'react';
import { GATE_STATE_TYPE } from '../types/gate';
import { BASE_RESISTANCE_CONSTANT } from '../configs/elementKind';
import {
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	CLOSE_CMD_PTK_BRANCH_POINT_ID,
	OPEN_CMD_PTK_BRANCH_POINT_ID,
} from '../configs/controlCircuit/constants';
import { BASE_RESISTANCE } from '../configs/schemeElements';
import store from '@/store/store';

/**
 * Хук для управления кнопками ПТК.
 * Обрабатывает нажатия кнопок "Открыть", "Закрыть" и "Стоп" для управления задвижкой через ПТК.
 */
export const usePtkButtons = () => {
	const dispatch = useAppDispatch();

	// Получаем id активной задвижки из стора
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';

	// Получаем концевые выключатели для проверки состояния
	const limitSwitchOpenElement = findElementByID(
		LIMIT_SWITCH_OPEN_ID,
		useAppSelector(state => state.circuit),
	);

	const limitSwitchCloseElement = findElementByID(
		LIMIT_SWITCH_CLOSE_ID,
		useAppSelector(state => state.circuit),
	);

	// Получаем текущее состояние задвижки
	const gateState = useAppSelector(state => state.gate.gates[gateId].states);

	// Кнопки "Открыть"/"Закрыть" ПТК активны (визуально нажаты) только когда задвижка реально движется
	const openPtkActive = gateState === GATE_STATE_TYPE.toOpen;
	const closePtkActive = gateState === GATE_STATE_TYPE.toClose;

	// Получаем состояние точек для проверки напряжения
	const closeCmdPtkBranchPointVoltage = useAppSelector(
		state => state.points[CLOSE_CMD_PTK_BRANCH_POINT_ID],
	);
	const openCmdPtkBranchPointVoltage = useAppSelector(
		state => state.points[OPEN_CMD_PTK_BRANCH_POINT_ID],
	);

	// Проверяем, достигла ли задвижка крайних положений
	const isGateFullyOpen = gateState === GATE_STATE_TYPE.open;
	const isGateFullyClose = gateState === GATE_STATE_TYPE.close;

	// Кнопка "Открыть" завершила работу только если задвижка полностью открыта (100%)
	const openButtonFinished = isGateFullyOpen;
	// Кнопка "Закрыть" завершила работу только если задвижка полностью закрыта (0%)
	const closeButtonFinished = isGateFullyClose;

	// У кнопок ПТК "Открыть" - дизейбл если:
	// - кнопка "Закрыть" активна (движется) ИЛИ
	// - концевой "открыть" разомкнут ИЛИ
	// - задвижка полностью открыта (100%) ИЛИ
	// - задвижка полностью закрыта И нет напряжения в точке OPEN_CMD_PTK_BRANCH_POINT_ID
	const openPtkDisabled =
		closePtkActive ||
		limitSwitchOpenElement.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance ||
		openButtonFinished ||
		(closeButtonFinished && !openCmdPtkBranchPointVoltage);

	// У кнопок ПТК "Закрыть" - дизейбл если:
	// - кнопка "Открыть" активна (движется) ИЛИ
	// - концевой "закрыть" разомкнут ИЛИ
	// - задвижка полностью закрыта (0%) ИЛИ
	// - задвижка полностью открыта И нет напряжения в точке CLOSE_CMD_PTK_BRANCH_POINT_ID
	const closePtkDisabled =
		openPtkActive ||
		limitSwitchCloseElement.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance ||
		closeButtonFinished ||
		(openButtonFinished && !closeCmdPtkBranchPointVoltage);

	// Кнопка "Стоп" дизейблена, когда не нажаты кнопки "Открыть" и "Закрыть" ПТК
	const stopPtkDisabled = !openPtkActive && !closePtkActive;

	// Получаем текущее положение задвижки из стора для синхронизации
	const currentGatePosition = useAppSelector(
		state => state.gate.gates[gateId].position,
	);

	// Создаём ref для отслеживания положения задвижки
	const gatePosition = useRef(currentGatePosition);

	// Синхронизируем ref с актуальным значением из стора при его изменении
	if (gatePosition.current !== currentGatePosition) {
		gatePosition.current = currentGatePosition;
	}

	// Создаём интервал в ref, чтобы к нему можно было обращаться и изменять его в функциях stopPtkMovement и handlePtkButton
	const gateInterval = useRef<NodeJS.Timeout | null>(null);

	// Функция для остановки движения задвижки через ПТК
	const stopPtkMovement = () => {
		// Обновляем сопротивления, которые меняются сразу после нажатия на кнопку "Стоп"
		PTK_BUTTONS_CONFIG.stop.forEach(action => {
			dispatch(setResistance(action));
		});

		if (gateInterval.current) {
			clearInterval(gateInterval.current);
			gateInterval.current = null;
			dispatch(
				setGatePosition({ id: gateId, position: gatePosition.current }),
			); // Диспатчим текущее положение при остановке
			dispatch(
				setGateState({
					id: gateId,
					states: GATE_STATE_TYPE.intermediate,
				}),
			);
			console.log(
				`Задвижка остановилась в положении: ${gatePosition.current}%`,
			);
		}
	};

	const handlePtkButton = (button: 'close' | 'open') => {
		// Обновляем сопротивления, которые меняются сразу после нажатия на кнопку "Открыть"/"Закрыть"
		PTK_BUTTONS_CONFIG[button].forEach(action => {
			dispatch(setResistance(action));
		});

		// Очищаем предыдущий интервал
		if (gateInterval.current) {
			clearInterval(gateInterval.current);
			gateInterval.current = null;
		}

		// Запускаем новый интервал
		gateInterval.current = setInterval(() => {
			// Получаем актуальное состояние схемы из store для проверки концевых выключателей
			const currentCircuit = store.getState().circuit;

			// Обновляем положение задвижки
			if (button === 'open') {
				// Проверяем и замыкаем концевой "закрыть", если он разомкнут
				const limitSwitchClose = findElementByID(
					LIMIT_SWITCH_CLOSE_ID,
					currentCircuit,
				);
				if (
					limitSwitchClose.resistance ===
					BASE_RESISTANCE_CONSTANT.highResistance
				) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_CLOSE_ID,
							value: BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID],
						}),
					);
				}

				gatePosition.current += 1;
				dispatch(
					setGateState({
						id: gateId,
						states: GATE_STATE_TYPE.toOpen,
					}),
				);

				if (gatePosition.current >= 100) {
					gatePosition.current = 100;

					// Очищаем интервал
					if (gateInterval.current) {
						clearInterval(gateInterval.current);
						gateInterval.current = null;
					}

					// При достижении 100% размыкаем кнопку ПТК "открыть" и концевой "открыть"
					PTK_BUTTONS_CONFIG.opening.forEach(action => {
						dispatch(setResistance(action));
					});

					// Обновляем состояние задвижки
					dispatch(
						setGatePosition({
							id: gateId,
							position: gatePosition.current,
						}),
					);
					dispatch(
						setGateState({
							id: gateId,
							states: GATE_STATE_TYPE.open,
						}),
					);

					console.log(
						`Задвижка полностью открыта. Положение: ${gatePosition.current}%`,
					);
				}

				// Диспатчим обновлённую позицию в Redux store
				dispatch(
					setGatePosition({
						id: gateId,
						position: gatePosition.current,
					}),
				);
			} else if (button === 'close') {
				// Проверяем и замыкаем концевой "открыть", если он разомкнут
				const limitSwitchOpen = findElementByID(
					LIMIT_SWITCH_OPEN_ID,
					currentCircuit,
				);
				if (
					limitSwitchOpen.resistance ===
					BASE_RESISTANCE_CONSTANT.highResistance
				) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_OPEN_ID,
							value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
						}),
					);
				}

				gatePosition.current -= 1;
				dispatch(
					setGateState({
						id: gateId,
						states: GATE_STATE_TYPE.toClose,
					}),
				);

				if (gatePosition.current <= 0) {
					gatePosition.current = 0;

					// Очищаем интервал
					if (gateInterval.current) {
						clearInterval(gateInterval.current);
						gateInterval.current = null;
					}

					// При достижении 0% размыкаем кнопку ПТК "закрыть" и концевой "закрыть"
					PTK_BUTTONS_CONFIG.closing.forEach(action => {
						dispatch(setResistance(action));
					});

					// Обновляем состояние задвижки
					dispatch(
						setGatePosition({
							id: gateId,
							position: gatePosition.current,
						}),
					);
					dispatch(
						setGateState({
							id: gateId,
							states: GATE_STATE_TYPE.close,
						}),
					);

					console.log(
						`Задвижка полностью закрыта. Положение: ${gatePosition.current}%`,
					);
				}

				// Диспатчим обновлённую позицию в Redux store
				dispatch(
					setGatePosition({
						id: gateId,
						position: gatePosition.current,
					}),
				);
			}

			// Логируем текущее положение задвижки для отладки
			console.log(`Положение задвижки: ${gatePosition.current}%`);
		}, 100);
	};

	return {
		handlePtkButton,
		stopPtkMovement,
		openPtkDisabled,
		closePtkDisabled,
		stopPtkDisabled,
		openPtkActive,
		closePtkActive,
		currentPosition: currentGatePosition,
	};
};
