import { setGatePosition, setGateState } from '@/store/gateSlice';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';
import { PTK_BUTTONS_CONFIG } from '../configs/header';
import { useEffect, useMemo, useRef } from 'react';
import { GATE_STATE_TYPE } from '../types/gate';
import { BASE_RESISTANCE_CONSTANT } from '../configs/elementKind';
import {
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	CLOSE_CMD_PTK_BRANCH_POINT_ID,
	OPEN_CMD_PTK_BRANCH_POINT_ID,
} from '../configs/controlCircuit/constants';
import {
	INPUT_CIRCUIT_BREAKER_ID,
} from '../configs/powerCircuit/constants';
import { useGetMalfunctionSwitchLimit } from './useGetMalfunctionSwitchLimit';
import { PositionClose, PositionOpen } from '../configs/gate';
import { TypeButtons } from './useGateControlButtons';
import {
	createTickSnapshotFromPreset,
	dispatchSimulationCommand,
	gateControlPresets,
} from '@/features/scheme-simulation';
import { dispatchInputBreakerSwitchCommand } from '@/store/inputBreakerSlice';

export const TimeShutdownInputBreaker: number = 1;
export const TimeUpdateInterval: number = 1000;

/**
 * Хук для управления кнопками ПТК.
 * Обрабатывает нажатия кнопок "Открыть", "Закрыть" и "Стоп" для управления задвижкой через ПТК.
 */

export const usePtkButtons = () => {
	const dispatch = useAppDispatch();
	const circuit = useAppSelector(state => state.circuit);

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
	const inputCircuitBreakerPhaseAElement = useMemo(
		() => findElementByID(INPUT_CIRCUIT_BREAKER_ID[0], circuit),
		[circuit],
	);

	// Проверяем состояние контактов вводного автомата фазы А
	const isOpenInputBreakerPhaseA =
		inputCircuitBreakerPhaseAElement.resistance >=
		BASE_RESISTANCE_CONSTANT.highResistance;

	useEffect(() => {
		if (hasMalfunctionStuckContactSwitchCloseElement) {
			dispatch(
				setResistance({
					id: LIMIT_SWITCH_CLOSE_ID,
					value: BASE_RESISTANCE_CONSTANT.blockingContact,
				}),
			);
		}

		if (hasMalfunctionStuckContactSwitchOpenElement) {
			dispatch(
				setResistance({
					id: LIMIT_SWITCH_OPEN_ID,
					value: BASE_RESISTANCE_CONSTANT.blockingContact,
				}),
			);
		}
	}, [
		hasMalfunctionStuckContactSwitchCloseElement,
		hasMalfunctionStuckContactSwitchOpenElement,
		dispatch,
	]);

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
	const isGateFullyOpen =
		hasMalfunctionStuckContactSwitchOpenElement ||
		hasMalfunctionNoContactSwitchOpenElement
			? false
			: gateState === GATE_STATE_TYPE.open;
	const isGateFullyClose =
		hasMalfunctionStuckContactSwitchCloseElement ||
		hasMalfunctionNoContactSwitchCloseElement
			? false
			: gateState === GATE_STATE_TYPE.close;

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
		(limitSwitchOpenElement.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance &&
			!hasMalfunctionNoContactSwitchOpenElement) ||
		openButtonFinished ||
		(closeButtonFinished &&
			!openCmdPtkBranchPointVoltage &&
			!hasMalfunctionNoContactSwitchOpenElement);

	// У кнопок ПТК "Закрыть" - дизейбл если:
	// - кнопка "Открыть" активна (движется) ИЛИ
	// - концевой "закрыть" разомкнут ИЛИ
	// - задвижка полностью закрыта (0%) ИЛИ
	// - задвижка полностью открыта И нет напряжения в точке CLOSE_CMD_PTK_BRANCH_POINT_ID
	const closePtkDisabled =
		openPtkActive ||
		(limitSwitchCloseElement.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance &&
			!hasMalfunctionNoContactSwitchCloseElement) ||
		closeButtonFinished ||
		(openButtonFinished &&
			!closeCmdPtkBranchPointVoltage &&
			!hasMalfunctionNoContactSwitchCloseElement);

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

	// Создаём интервал в ref, для разбора вводного автомата
	const inputBrakerInterval = useRef<NodeJS.Timeout | null>(null);

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

	// Функция для остановки движения задвижки через ПТК
	const stopPtkMovement = () => {
		// Очищаем интервал отвечающего за отсчет времени выключение вводного автомта
		if (inputBrakerInterval.current) {
			clearInterval(inputBrakerInterval.current);
			inputBrakerInterval.current = null;
		}

		if (
			gatePosition.current >= PositionOpen &&
			hasMalfunctionStuckContactSwitchOpenElement
		) {
			dispatch(
				setGateState({
					id: gateId,
					states: GATE_STATE_TYPE.open,
				}),
			);

			PTK_BUTTONS_CONFIG.open.forEach(action => {
				if (action.id !== LIMIT_SWITCH_OPEN_ID) {
					dispatch(setResistance(action));
				}
			});
		}

		if (
			gatePosition.current <= PositionClose &&
			hasMalfunctionStuckContactSwitchCloseElement
		) {
			dispatch(
				setGateState({
					id: gateId,
					states: GATE_STATE_TYPE.close,
				}),
			);

			PTK_BUTTONS_CONFIG.close.forEach(action => {
				if (action.id !== LIMIT_SWITCH_CLOSE_ID) {
					dispatch(setResistance(action));
				}
			});
		}

		// Обновляем сопротивления, которые меняются сразу после нажатия на кнопку "Стоп"
		PTK_BUTTONS_CONFIG.stop.forEach(action => {
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
						positionOpen: gateControlPresets.ptk.positionOpen,
						positionClose: gateControlPresets.ptk.positionClose,
						defaultLimitSwitchResistance:
							gateControlPresets.ptk.defaultLimitSwitchResistance,
						highResistance: gateControlPresets.ptk.highResistance,
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
			);
			// Диспатчим текущее положение при остановке
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
		if (inputBrakerInterval.current) {
			clearInterval(inputBrakerInterval.current);
			inputBrakerInterval.current = null;
		}

		// Проверяем наличие питания в цепи управления
		if (isOpenInputBreakerPhaseA) {
			console.info(
				'Нет питания сети управления ВВОДНОЙ АВТОМАТ РАЗОБРАН',
			);
			return;
		}
		// проверяем концевые выключатели на наличие неисправности 'Нет контакта'
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
				const tickResult = dispatchSimulationCommand({
					type: 'tick',
					payload: {
						direction: 'open',
						snapshot: createTickSnapshotFromPreset('ptk', gatePosition.current, {
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
				if (
					tickResult.shouldStop ||
					tickResult.shouldTriggerInputBreakerShutdownTimer
				) {
					// при наличии неисправности запуск таймера на отключения вводного автомата
					if (hasMalfunctionStuckContactSwitchOpenElement) {
						let timerTriggeringInputAutomaton = 0;

						dispatch(
							setGateState({
								id: gateId,
								states: GATE_STATE_TYPE.toOpen,
							}),
						);
						dispatch(
							setGatePosition({
								id: gateId,
								position: PositionOpen,
							}),
						);
						inputBrakerInterval.current = setInterval(() => {
							console.info(
								'Задвижка полностью открыта. Положение: 100%',
							);
							timerTriggeringInputAutomaton++;
							if (
								timerTriggeringInputAutomaton >=
								TimeShutdownInputBreaker
							) {
								dispatch(
									setGateState({
										id: gateId,
										states: GATE_STATE_TYPE.open,
									}),
								);

								// Отключяем вводной автомат через FSM-команду.
								dispatch(dispatchInputBreakerSwitchCommand('off'));
								PTK_BUTTONS_CONFIG.open.forEach(action => {
									if (action.id !== LIMIT_SWITCH_OPEN_ID) {
										dispatch(setResistance(action));
									}
								});
								console.info(
									'Обесточен вводной автомат, залипший контакт концевого выключателя цепи ОТКРЫТЬ',
								);
								if (inputBrakerInterval.current) {
									clearInterval(inputBrakerInterval.current);
									inputBrakerInterval.current = null;
								}
								stopPtkMovement();
							}
						}, TimeUpdateInterval);
					} else {
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
						stopPtkMovement();
					}
					gatePosition.current = PositionOpen;

					// Очищаем интервал
					if (gateInterval.current) {
						clearInterval(gateInterval.current);
						gateInterval.current = null;
					}
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
				const tickResult = dispatchSimulationCommand({
					type: 'tick',
					payload: {
						direction: 'close',
						snapshot: createTickSnapshotFromPreset('ptk', gatePosition.current, {
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

				if (
					tickResult.shouldStop ||
					tickResult.shouldTriggerInputBreakerShutdownTimer
				) {
					// при наличии неисправности запуск таймера на отключения вводного автомата
					if (hasMalfunctionStuckContactSwitchCloseElement) {
						let timerTriggeringInputAutomaton = 0;

						dispatch(
							setGateState({
								id: gateId,
								states: GATE_STATE_TYPE.toClose,
							}),
						);
						dispatch(
							setGatePosition({
								id: gateId,
								position: PositionClose,
							}),
						);
						inputBrakerInterval.current = setInterval(() => {
							console.info(
								'Задвижка полностью закрыта. Положение: 0%',
							);
							timerTriggeringInputAutomaton++;
							if (
								timerTriggeringInputAutomaton >=
								TimeShutdownInputBreaker
							) {
								dispatch(
									setGateState({
										id: gateId,
										states: GATE_STATE_TYPE.close,
									}),
								);

								// Отключяем вводной автомат через FSM-команду.
								dispatch(dispatchInputBreakerSwitchCommand('off'));
								PTK_BUTTONS_CONFIG.close.forEach(action => {
									if (action.id !== LIMIT_SWITCH_CLOSE_ID) {
										dispatch(setResistance(action));
									}
								});
								console.info(
									'Обесточен вводной автомат, залипший контакт концевого выключателя цепи ЗАКРЫТЬ',
								);
								if (inputBrakerInterval.current) {
									clearInterval(inputBrakerInterval.current);
									inputBrakerInterval.current = null;
								}
								stopPtkMovement();
							}
						}, TimeUpdateInterval);
					} else {
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
						stopPtkMovement();
					}
					gatePosition.current = PositionClose;

					// Очищаем интервал
					if (gateInterval.current) {
						clearInterval(gateInterval.current);
						gateInterval.current = null;
					}

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
