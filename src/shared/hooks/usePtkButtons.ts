import { setGatePosition, setGateState } from '@/store/gateSlice';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';
import { PTK_BUTTONS_CONFIG } from '../configs/header';
import { useRef } from 'react';
import { GATE_STATE_TYPE } from '../types/gate';
import { BASE_RESISTANCE_CONSTANT, ELEMENT_KIND } from '../configs/elementKind';
import {
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	CLOSE_CMD_PTK_BRANCH_POINT_ID,
	OPEN_CMD_PTK_BRANCH_POINT_ID,
} from '../configs/controlCircuit/constants';
import { getResistanceByKind } from '../utils/getResistanceByKind/getResistanceByKind';
import { TypeButtons } from './useGateControlButtons';

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

			// Обновляем концевые выключатели на основе текущего положения при остановке
			const currentPosition = gatePosition.current;

			// Концевой "открыто": разомкнут если position === 100%, иначе замкнут
			const shouldOpenBeOpen =
				currentPosition >= 100
					? BASE_RESISTANCE_CONSTANT.highResistance
					: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
			if (limitSwitchOpenElement.resistance !== shouldOpenBeOpen) {
				dispatch(
					setResistance({
						id: LIMIT_SWITCH_OPEN_ID,
						value: shouldOpenBeOpen,
					}),
				);
			}

			// Концевой "закрыто": разомкнут если position === 0%, иначе замкнут
			const shouldCloseBeOpen =
				currentPosition <= 0
					? BASE_RESISTANCE_CONSTANT.highResistance
					: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
			if (limitSwitchCloseElement.resistance !== shouldCloseBeOpen) {
				dispatch(
					setResistance({
						id: LIMIT_SWITCH_CLOSE_ID,
						value: shouldCloseBeOpen,
					}),
				);
			}

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

	const handlePtkButton = (button: TypeButtons) => {
		// Обновляем сопротивления, которые меняются сразу после нажатия на кнопку "Открыть"/"Закрыть"
		PTK_BUTTONS_CONFIG[button].forEach(action => {
			console.log(
				`Изменение сопротивления для ${action.id}: ${action.value}`,
			);
			dispatch(setResistance(action));
		});

		// Очищаем предыдущий интервал
		if (gateInterval.current) {
			clearInterval(gateInterval.current);
			gateInterval.current = null;
		}

		// Запускаем новый интервал
		gateInterval.current = setInterval(() => {
			// Обновляем положение задвижки
			if (button === 'open') {
				gatePosition.current += 1;
				dispatch(
					setGateState({
						id: gateId,
						states: GATE_STATE_TYPE.toOpen,
					}),
				);

				// Обновляем концевые выключатели на основе текущего положения
				// Концевой "открыто": разомкнут если position === 100%, иначе замкнут
				const shouldOpenBeOpen =
					gatePosition.current >= 100
						? BASE_RESISTANCE_CONSTANT.highResistance
						: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
				if (limitSwitchOpenElement.resistance !== shouldOpenBeOpen) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_OPEN_ID,
							value: shouldOpenBeOpen,
						}),
					);
				}

				// Концевой "закрыто": разомкнут если position === 0%, иначе замкнут
				const shouldCloseBeOpen =
					gatePosition.current <= 0
						? BASE_RESISTANCE_CONSTANT.highResistance
						: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
				if (limitSwitchCloseElement.resistance !== shouldCloseBeOpen) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_CLOSE_ID,
							value: shouldCloseBeOpen,
						}),
					);
				}

				if (gatePosition.current >= 100) {
					gatePosition.current = 100;

					// Очищаем интервал
					if (gateInterval.current) {
						clearInterval(gateInterval.current);
						gateInterval.current = null;
					}

					// При достижении 100% размыкаем кнопку ПТК "открыть"
					PTK_BUTTONS_CONFIG.opening.forEach(action => {
						if (action.id !== LIMIT_SWITCH_OPEN_ID) {
							dispatch(setResistance(action));
						}
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
				gatePosition.current -= 1;
				dispatch(
					setGateState({
						id: gateId,
						states: GATE_STATE_TYPE.toClose,
					}),
				);

				// Обновляем концевые выключатели на основе текущего положения
				// Концевой "открыто": разомкнут если position === 100%, иначе замкнут
				const shouldOpenBeOpen =
					gatePosition.current >= 100
						? BASE_RESISTANCE_CONSTANT.highResistance
						: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
				if (limitSwitchOpenElement.resistance !== shouldOpenBeOpen) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_OPEN_ID,
							value: shouldOpenBeOpen,
						}),
					);
				}

				// Концевой "закрыто": разомкнут если position === 0%, иначе замкнут
				const shouldCloseBeOpen =
					gatePosition.current <= 0
						? BASE_RESISTANCE_CONSTANT.highResistance
						: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
				if (limitSwitchCloseElement.resistance !== shouldCloseBeOpen) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_CLOSE_ID,
							value: shouldCloseBeOpen,
						}),
					);
				}

				if (gatePosition.current <= 0) {
					gatePosition.current = 0;

					// Очищаем интервал
					if (gateInterval.current) {
						clearInterval(gateInterval.current);
						gateInterval.current = null;
					}

					// При достижении 0% размыкаем кнопку ПТК "закрыть"
					PTK_BUTTONS_CONFIG.closing.forEach(action => {
						if (action.id !== LIMIT_SWITCH_CLOSE_ID) {
							dispatch(setResistance(action));
						}
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
