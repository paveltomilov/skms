import { setGatePosition, setGateState } from '@/store/gateSlice';
import {
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	INSERT_NDO_CMD_OPEN_PTK_ID,
	INSERT_NDO_CMD_CLOSE_PTK_ID,
} from '../configs/controlCircuit/constants';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';
import { KRUZAP_BUTTONS_CONFIG } from '../configs/header';
import { useRef } from 'react';
import { GATE_STATE_TYPE } from '../types/gate';
import { BASE_RESISTANCE } from '../configs/schemeElements';
import { BASE_RESISTANCE_CONSTANT, ELEMENT_KIND } from '../configs/elementKind';
import { getResistanceByKind } from '../utils/getResistanceByKind/getResistanceByKind';
import store from '@/store/store';
import { useGetMalfunctionKruzapButtons } from './useGetMalfunctionKruzapButtons';

/**
 * Хук для управления кнопками КРУЗАП.
 * Обрабатывает нажатия кнопок "Открыть" и "Закрыть" для управления задвижкой через КРУЗАП.
 * Кнопки работают по принципу удержания (onMouseDown/onMouseUp).
 */
export const useKruzapButtons = () => {
	const dispatch = useAppDispatch();

	// Получаем возможные неисправсноии кнопок КРУЗА-П

	const {
		hasMalfunctionNoContactKruzapOpenButton,
		hasMalfunctionNoContactKruzapCloseButton,
	} = useGetMalfunctionKruzapButtons();

	// Получаем id активной задвижки из стора
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';

	// Получаем концевые выключатели из схемы
	const limitSwitchOpenElement = findElementByID(
		LIMIT_SWITCH_OPEN_ID,
		useAppSelector(state => state.circuit),
	);

	const limitSwitchCloseElement = findElementByID(
		LIMIT_SWITCH_CLOSE_ID,
		useAppSelector(state => state.circuit),
	);

	// Получаем элементы кнопок ПТК из схемы для проверки их состояния
	const openPtkElement = findElementByID(
		INSERT_NDO_CMD_OPEN_PTK_ID,
		useAppSelector(state => state.circuit),
	);

	const closePtkElement = findElementByID(
		INSERT_NDO_CMD_CLOSE_PTK_ID,
		useAppSelector(state => state.circuit),
	);

	// Проверяем, активна ли какая-либо кнопка ПТК (сопротивление = 0)
	const isAnyPtkButtonActive =
		openPtkElement.resistance === 0 || closePtkElement.resistance === 0;

	// Кнопки КРУЗАП дизейблены, если:
	// - соответствующий концевой выключатель разомкнут ИЛИ
	// - какая-либо кнопка ПТК активна (сопротивление = 0)
	const openKruzapDisabled =
		limitSwitchOpenElement.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance || isAnyPtkButtonActive;
	const closeKruzapDisabled =
		limitSwitchCloseElement.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance || isAnyPtkButtonActive;

	// Определяем состояние задвижки (закрыта/открыта) на основе концевых выключателей
	const openOn =
		limitSwitchCloseElement.resistance ===
		BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID];
	const closeOn =
		limitSwitchOpenElement.resistance ===
		BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID];

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

	// Создаём интервал в ref, чтобы к нему можно было обращаться и изменять его в функциях stopKruzapMovement и handleKruzapButton
	const gateInterval = useRef<NodeJS.Timeout | null>(null);

	// Функция для остановки движения задвижки через КРУЗАП
	const stopKruzapMovement = () => {
		// Обновляем сопротивления, которые меняются сразу после отпускания кнопки
		KRUZAP_BUTTONS_CONFIG.stop.forEach(action => {
			dispatch(setResistance(action));
		});

		if (gateInterval.current) {
			clearInterval(gateInterval.current);
			gateInterval.current = null;

			// Обновляем концевые выключатели на основе текущего положения при остановке
			const currentCircuit = store.getState().circuit;
			const currentPosition = gatePosition.current;

			// Концевой "открыто": разомкнут если position === 100%, иначе замкнут
			const limitSwitchOpen = findElementByID(
				LIMIT_SWITCH_OPEN_ID,
				currentCircuit,
			);
			const shouldOpenBeOpen =
				currentPosition >= 100
					? BASE_RESISTANCE_CONSTANT.highResistance
					: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
			if (limitSwitchOpen.resistance !== shouldOpenBeOpen) {
				dispatch(
					setResistance({
						id: LIMIT_SWITCH_OPEN_ID,
						value: shouldOpenBeOpen,
					}),
				);
			}

			// Концевой "закрыто": разомкнут если position === 0%, иначе замкнут
			const limitSwitchClose = findElementByID(
				LIMIT_SWITCH_CLOSE_ID,
				currentCircuit,
			);
			const shouldCloseBeOpen =
				currentPosition <= 0
					? BASE_RESISTANCE_CONSTANT.highResistance
					: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
			if (limitSwitchClose.resistance !== shouldCloseBeOpen) {
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

	const handleKruzapButton = (button: 'close' | 'open') => {

		// Проверяем кнопки на наличие неисправности 'Нет контакта, цепь не замыкается'
		if (button === 'open' && hasMalfunctionNoContactKruzapOpenButton) {
			console.info(
				'Кнопка ОТКРЫТЬ КРУЗА-П имеет активную неисправность "Нет контакта, цепь не замыкается"',
			);
			return;
		}

		if (button === 'close' && hasMalfunctionNoContactKruzapCloseButton) {
			console.info(
				'Кнопка ЗАКРЫТЬ КРУЗА-П имеет активную неисправность "Нет контакта, цепь не замыкается"',
			);
			return;
		}

		// Обновляем сопротивления, которые меняются сразу после нажатия на кнопку "Открыть"/"Закрыть"
		KRUZAP_BUTTONS_CONFIG[button].forEach(action => {
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
				gatePosition.current += 1;
				dispatch(
					setGateState({
						id: gateId,
						states: GATE_STATE_TYPE.toOpen,
					}),
				);

				// Обновляем концевые выключатели на основе текущего положения
				// Концевой "открыто": разомкнут если position === 100%, иначе замкнут
				const limitSwitchOpen = findElementByID(
					LIMIT_SWITCH_OPEN_ID,
					currentCircuit,
				);
				const shouldOpenBeOpen =
					gatePosition.current >= 100
						? BASE_RESISTANCE_CONSTANT.highResistance
						: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
				if (limitSwitchOpen.resistance !== shouldOpenBeOpen) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_OPEN_ID,
							value: shouldOpenBeOpen,
						}),
					);
				}

				// Концевой "закрыто": разомкнут если position === 0%, иначе замкнут
				const limitSwitchClose = findElementByID(
					LIMIT_SWITCH_CLOSE_ID,
					currentCircuit,
				);
				const shouldCloseBeOpen =
					gatePosition.current <= 0
						? BASE_RESISTANCE_CONSTANT.highResistance
						: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
				if (limitSwitchClose.resistance !== shouldCloseBeOpen) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_CLOSE_ID,
							value: shouldCloseBeOpen,
						}),
					);
				}

				if (gatePosition.current >= 100) {
					gatePosition.current = 100;
					stopKruzapMovement();
					dispatch(
						setGateState({
							id: gateId,
							states: GATE_STATE_TYPE.open,
						}),
					);

					// При достижении 100% размыкаем элементы открытия (кроме концевых выключателей, они уже обновлены)
					KRUZAP_BUTTONS_CONFIG.opening.forEach(action => {
						if (
							action.id !== LIMIT_SWITCH_OPEN_ID &&
							action.id !== LIMIT_SWITCH_CLOSE_ID
						) {
							dispatch(setResistance(action));
						}
					});
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
				const limitSwitchOpen = findElementByID(
					LIMIT_SWITCH_OPEN_ID,
					currentCircuit,
				);
				const shouldOpenBeOpen =
					gatePosition.current >= 100
						? BASE_RESISTANCE_CONSTANT.highResistance
						: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
				if (limitSwitchOpen.resistance !== shouldOpenBeOpen) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_OPEN_ID,
							value: shouldOpenBeOpen,
						}),
					);
				}

				// Концевой "закрыто": разомкнут если position === 0%, иначе замкнут
				const limitSwitchClose = findElementByID(
					LIMIT_SWITCH_CLOSE_ID,
					currentCircuit,
				);
				const shouldCloseBeOpen =
					gatePosition.current <= 0
						? BASE_RESISTANCE_CONSTANT.highResistance
						: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH);
				if (limitSwitchClose.resistance !== shouldCloseBeOpen) {
					dispatch(
						setResistance({
							id: LIMIT_SWITCH_CLOSE_ID,
							value: shouldCloseBeOpen,
						}),
					);
				}

				if (gatePosition.current <= 0) {
					gatePosition.current = 0;
					stopKruzapMovement();
					dispatch(
						setGateState({
							id: gateId,
							states: GATE_STATE_TYPE.close,
						}),
					);

					// При достижении 0% размыкаем элементы закрытия (кроме концевых выключателей, они уже обновлены)
					KRUZAP_BUTTONS_CONFIG.closing.forEach(action => {
						if (
							action.id !== LIMIT_SWITCH_OPEN_ID &&
							action.id !== LIMIT_SWITCH_CLOSE_ID
						) {
							dispatch(setResistance(action));
						}
					});
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
		handleKruzapButton,
		stopKruzapMovement,
		openKruzapDisabled,
		closeKruzapDisabled,
		openOn,
		closeOn,
		currentPosition: currentGatePosition,
	};
};
