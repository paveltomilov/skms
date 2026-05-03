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
import { useEffect, useMemo, useRef } from 'react';
import { GATE_STATE_TYPE } from '../types/gate';
import { BASE_RESISTANCE } from '../configs/schemeElements';
import { BASE_RESISTANCE_CONSTANT } from '../configs/elementKind';
import {
	INPUT_CIRCUIT_BREAKER_ID,
} from '../configs/powerCircuit/constants';
import { useGetMalfunctionSwitchLimit } from './useGetMalfunctionSwitchLimit';
import { PositionClose, PositionOpen } from '../configs/gate';
import { useGetMalfunctionKruzapButtons } from './useGetMalfunctionKruzapButtons';
import { TypeButtons } from './useGateControlButtons';
import { TimeShutdownInputBreaker } from './usePtkButtons';
import {
	createTickSnapshotFromPreset,
	dispatchSimulationCommand,
	gateControlPresets,
} from '@/features/scheme-simulation';
import { dispatchInputBreakerSwitchCommand } from '@/store/inputBreakerSlice';

const timeStepIntervalGateMoving = 100;
const newTimeShutdownInputBreaker =
	(TimeShutdownInputBreaker * 1000) / timeStepIntervalGateMoving;

/**
 * Хук для управления кнопками КРУЗАП.
 * Обрабатывает нажатия кнопок "Открыть" и "Закрыть" для управления задвижкой через КРУЗАП.
 * Кнопки работают по принципу удержания (onMouseDown/onMouseUp).
 */

export const useKruzapButtons = () => {
	const dispatch = useAppDispatch();
	const circuit = useAppSelector(state => state.circuit);
	// Получаем возможные неисправсноии кнопок КРУЗА-П

	const {
		hasMalfunctionNoContactKruzapOpenButton,
		hasMalfunctionNoContactKruzapCloseButton,
	} = useGetMalfunctionKruzapButtons();

	// Получаем id активной задвижки из стора
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';

	// Получаем концевые выключатели для проверки состояния и получения возможных неисправностей
	const {
		limitSwitchCloseElement,
		limitSwitchOpenElement,
		hasMalfunctionNoContactSwitchOpenElement,
		hasMalfunctionNoContactSwitchCloseElement,
		hasMalfunctionStuckContactSwitchOpenElement,
		hasMalfunctionStuckContactSwitchCloseElement,
	} = useGetMalfunctionSwitchLimit();

	// Получаем фазу А вводного автомата от которой запитывается схемы управления
	/** Фаза вводного автомата питающая сеть управления */
	const inputCircuitBreakerPhaseAElement = findElementByID(
		INPUT_CIRCUIT_BREAKER_ID[0],
		useAppSelector(state => state.circuit),
	);
	// Проверяем состояние контактов вводного автомата фазы А
	const isOpenInputBreakerPhaseA =
		inputCircuitBreakerPhaseAElement.resistance >=
		BASE_RESISTANCE_CONSTANT.highResistance;

	useEffect(() => {
		if (hasMalfunctionNoContactSwitchCloseElement) {
			dispatch(
				setResistance({
					id: LIMIT_SWITCH_CLOSE_ID,
					value: BASE_RESISTANCE_CONSTANT.highResistance,
				}),
			);
		}

		if (hasMalfunctionNoContactSwitchOpenElement) {
			dispatch(
				setResistance({
					id: LIMIT_SWITCH_OPEN_ID,
					value: BASE_RESISTANCE_CONSTANT.highResistance,
				}),
			);
		}
	}, [
		hasMalfunctionNoContactSwitchCloseElement,
		hasMalfunctionNoContactSwitchOpenElement,
		dispatch,
	]);

	// Получаем элементы кнопок ПТК из схемы для проверки их состояния
	const openPtkElement = useMemo(
		() => findElementByID(INSERT_NDO_CMD_OPEN_PTK_ID, circuit),
		[circuit],
	);

	const closePtkElement = useMemo(
		() => findElementByID(INSERT_NDO_CMD_CLOSE_PTK_ID, circuit),
		[circuit],
	);

	// Проверяем, активна ли какая-либо кнопка ПТК (сопротивление = 0)
	const isAnyPtkButtonActive =
		openPtkElement.resistance === 0 || closePtkElement.resistance === 0;

	// Кнопки КРУЗАП дизейблены, если:
	// - соответствующий концевой выключатель разомкнут ИЛИ
	// - какая-либо кнопка ПТК активна (сопротивление = 0)
	const openKruzapDisabled =
		hasMalfunctionNoContactSwitchOpenElement ||
		hasMalfunctionStuckContactSwitchOpenElement
			? false
			: limitSwitchOpenElement.resistance ===
					BASE_RESISTANCE_CONSTANT.highResistance ||
				isAnyPtkButtonActive;
	const closeKruzapDisabled =
		hasMalfunctionNoContactSwitchCloseElement ||
		hasMalfunctionStuckContactSwitchCloseElement
			? false
			: limitSwitchCloseElement.resistance ===
					BASE_RESISTANCE_CONSTANT.highResistance ||
				isAnyPtkButtonActive;

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

	const timerTriggeringInputAutomaton = useRef<number>(0);

	const applyLimitSwitchResistance = (
		limitSwitchOpenResistance: number,
		limitSwitchCloseResistance: number,
	) => {
		if (limitSwitchOpenElement.resistance !== limitSwitchOpenResistance) {
			dispatch(
				setResistance({
					id: LIMIT_SWITCH_OPEN_ID,
					value: limitSwitchOpenResistance,
				}),
			);
		}

		if (limitSwitchCloseElement.resistance !== limitSwitchCloseResistance) {
			dispatch(
				setResistance({
					id: LIMIT_SWITCH_CLOSE_ID,
					value: limitSwitchCloseResistance,
				}),
			);
		}
	};

	// Функция для остановки движения задвижки через КРУЗАП
	const stopKruzapMovement = () => {
		// Сбрасываем таймер отвечающего за выключение вводно автомата
		if (timerTriggeringInputAutomaton.current) {
			timerTriggeringInputAutomaton.current = 0;
		}
		// Обновляем сопротивления, которые меняются сразу после отпускания кнопки
		KRUZAP_BUTTONS_CONFIG.stop.forEach(action => {
			dispatch(setResistance(action));
		});

		if (gateInterval.current) {
			clearInterval(gateInterval.current);
			gateInterval.current = null;

			const stopResult = dispatchSimulationCommand({
				type: 'stop',
				payload: {
					snapshot: {
						currentPosition: gatePosition.current,
						positionOpen: gateControlPresets.kruzap.positionOpen,
						positionClose: gateControlPresets.kruzap.positionClose,
						defaultLimitSwitchResistance:
							gateControlPresets.kruzap.defaultLimitSwitchResistance,
						highResistance: gateControlPresets.kruzap.highResistance,
						hasMalfunctionStuckContactSwitchOpenElement,
						hasMalfunctionStuckContactSwitchCloseElement,
					},
				},
			});
			applyLimitSwitchResistance(
				stopResult.limitSwitchOpenResistance,
				stopResult.limitSwitchCloseResistance,
			);

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

	const handleKruzapButton = (button: TypeButtons) => {
		// Сбрасываем таймер отвечающего за выключение вводно автомата
		if (timerTriggeringInputAutomaton.current) {
			timerTriggeringInputAutomaton.current = 0;
		}
		// При наличии неисправности останавливаем обработчик событий
		if (hasMalfunctionNoContactSwitchCloseElement && button === 'close') {
			console.info(
				'Активна неиспраность <Нет контакта> концевого выключателя цепи ЗАКРЫТЬ ',
			);
			return;
		}
		if (hasMalfunctionNoContactSwitchOpenElement && button === 'open') {
			console.info(
				'Активна неиспраность <Нет контакта> концевого выключателя цепи ОТКРЫТЬ ',
			);
			return;
		}
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
		// Проверяем наличие питания в цепи управления
		if (isOpenInputBreakerPhaseA) {
			console.info(
				'Нет питания сети управления ВВОДНОЙ АВТОМАТ РАЗОБРАН',
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
			// Обновляем положение задвижки
			if (button === 'open') {
				const tickResult = dispatchSimulationCommand({
					type: 'tick',
					payload: {
						direction: 'open',
						snapshot: createTickSnapshotFromPreset('kruzap', gatePosition.current, {
							hasMalfunctionStuckContactSwitchOpenElement,
							hasMalfunctionStuckContactSwitchCloseElement,
						}),
					},
				});
				gatePosition.current = tickResult.nextPosition;
				dispatch(
					setGateState({
						id: gateId,
						states: tickResult.gateState,
					}),
				);
				applyLimitSwitchResistance(
					tickResult.limitSwitchOpenResistance,
					tickResult.limitSwitchCloseResistance,
				);

				if (tickResult.shouldStop) {
					gatePosition.current = PositionOpen;
					if (hasMalfunctionStuckContactSwitchOpenElement) {
						if (
							timerTriggeringInputAutomaton.current ===
							newTimeShutdownInputBreaker
						) {
							dispatch(dispatchInputBreakerSwitchCommand('off'));
							stopKruzapMovement();
						}
						timerTriggeringInputAutomaton.current++;
						return;
					}

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
				const tickResult = dispatchSimulationCommand({
					type: 'tick',
					payload: {
						direction: 'close',
						snapshot: createTickSnapshotFromPreset('kruzap', gatePosition.current, {
							hasMalfunctionStuckContactSwitchOpenElement,
							hasMalfunctionStuckContactSwitchCloseElement,
						}),
					},
				});
				gatePosition.current = tickResult.nextPosition;
				dispatch(
					setGateState({
						id: gateId,
						states: tickResult.gateState,
					}),
				);
				applyLimitSwitchResistance(
					tickResult.limitSwitchOpenResistance,
					tickResult.limitSwitchCloseResistance,
				);

				if (tickResult.shouldStop) {
					gatePosition.current = PositionClose;
					if (hasMalfunctionStuckContactSwitchCloseElement) {
						if (
							timerTriggeringInputAutomaton.current ===
							newTimeShutdownInputBreaker
						) {
							dispatch(dispatchInputBreakerSwitchCommand('off'));
							stopKruzapMovement();
						}
						timerTriggeringInputAutomaton.current++;
						return;
					}

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
		}, timeStepIntervalGateMoving);
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
