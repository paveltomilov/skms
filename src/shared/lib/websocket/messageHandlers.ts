import { AppDispatch} from '@/store/store';
import {
	WebSocketIncomingMessage,
	SimulationInitMessage,
	SimulationFinishedStudentMessage,
	SimulationFinishedTeacherMessage,
	UserLogMessage,
	GatePositionUpdateMessage,
	GateStateUpdateMessage,
	PointsUpdateMessage,
	SimulationStatusMessage,
	ErrorMessage,
} from '@/shared/types/websocket';
import {
	setGatePosition,
	setGateState,
	setGateMalfunctions,
	setActiveGate,
} from '@/store/gateSlice';
import { setVoltagePoints } from '@/store/pointsSlice';
import { GATE_STATE_TYPE } from '@/shared/types/gate';
import {
	resetSimulation,
	setCompletedSimulationId,
	setSimulation,
} from '@/store/simulationSlice';
import { activateMalfunction } from '@/store/circuitSlice';
import { openModal } from '@/store/modalSlice';

/**
 * Обработчик входящих WebSocket сообщений
 * Диспатчит соответствующие действия в Redux store
 * @param dispatch - функция для диспатча действий Redux
 * @param getState - функция для получения текущего состояния Redux (опционально)
 */
export function createMessageHandler(
	dispatch: AppDispatch,
	
) {
	return (message: WebSocketIncomingMessage): void => {
		// Проверяем наличие поля type для определения типа сообщения
		const messageAny = message as unknown as Record<string, unknown>;

		// Обработка сообщений без поля type (инициализация симуляции)
		if (!('type' in messageAny) || !messageAny.type) {
			// Проверяем наличие поля malfunctions (gate может быть null, но malfunctions обязательны)
			if ('malfunctions' in messageAny && Array.isArray(messageAny.malfunctions)) {
				const initMessage = message as SimulationInitMessage;

				// Извлекаем ID неисправностей
				// Поддерживаем два формата:
				// 1. [{"additionalProp1":"c.0.1"}, {"additionalProp2":"c.3.0.3.0"}]
				// 2. [{"malfunction_id": "c.1.2"}]
				const malfunctionIds = initMessage.malfunctions
					.map(m => {
						// Если есть ключ "malfunction_id", используем его
						if ('malfunction_id' in m && typeof m.malfunction_id === 'string') {
							return m.malfunction_id;
						}
						// Иначе берем первое значение из объекта
						return Object.values(m)[0];
					})
					.filter((id): id is string => typeof id === 'string');

				// Преобразуем для состояния симуляции
				const malfunctionsForState = malfunctionIds.map(
					malfunctionId => ({
						malfunction_id: malfunctionId,
						description: malfunctionId,
					}),
				);

				// Обновляем активную задвижку и неисправности задвижки
				if (initMessage.gate) {
					dispatch(setActiveGate(initMessage.gate));
					dispatch(
						setGateMalfunctions({
							id: initMessage.gate,
							malfunctions: malfunctionIds,
						}),
					);
				}

				// Обновляем данные симуляции в Redux (включая simulation_id)
				dispatch(
					setSimulation({
						simulationId: initMessage.simulation_id,
						gate: initMessage.gate,
						malfunctions: malfunctionsForState,
					}),
				);

				// Активируем неисправности в схеме
				malfunctionIds.forEach(malfunctionId => {
					dispatch(activateMalfunction(malfunctionId));
				});

				// Открываем попап о начале симуляции только если он еще не был показан для этой симуляции
				// Проверяем sessionStorage, чтобы избежать повторного показа при перезагрузке страницы
				if (typeof window !== 'undefined') {
					if (initMessage.simulation_id !== undefined) {
						const shownSimulationId = sessionStorage.getItem(
							'shownStartSimulationId',
						);
						const currentSimulationId = String(
							initMessage.simulation_id,
						);

						if (shownSimulationId !== currentSimulationId) {
							dispatch(openModal('infoStartSimulation'));
							sessionStorage.setItem(
								'shownStartSimulationId',
								currentSimulationId,
							);
						}
					} else {
						// Если simulation_id нет, показываем попап один раз за сессию
						const hasShownWithoutId = sessionStorage.getItem(
							'shownStartSimulationWithoutId',
						);
						if (!hasShownWithoutId) {
							dispatch(openModal('infoStartSimulation'));
							sessionStorage.setItem(
								'shownStartSimulationWithoutId',
								'true',
							);
						}
					}
				} else {
					// На сервере (SSR) всегда показываем попап (но это не должно происходить)
					dispatch(openModal('infoStartSimulation'));
				}

				console.info('[WebSocket] Инициализация симуляции:', {
					simulation_id: initMessage.simulation_id,
					gate: initMessage.gate,
					malfunctionIds,
				});
				return;
			}

			// Если нет type и нет malfunctions, это неизвестное сообщение
			console.warn(
				'[WebSocket] Сообщение без поля type и без malfunctions:',
				message,
			);
			return;
		}

		// Обработка сообщений с полем type
		const messageType = messageAny.type as string;
		switch (messageType) {
			case 'simulation_finished': {
				const finishedMessage = message as
					| SimulationFinishedStudentMessage
					| SimulationFinishedTeacherMessage;
				const completedId = finishedMessage.simulation_id;

				// Обрабатываем завершение симуляции
				// resetSimulation возвращает начальное состояние
				dispatch(resetSimulation());
				if (completedId) {
					dispatch(setCompletedSimulationId(completedId));
				}

				// Открываем модалку о завершении симуляции
				dispatch(openModal('simulationComplete'));

				console.info(
					'[WebSocket] Симуляция завершена:',
					finishedMessage.simulation_id,
					'Время:',
					finishedMessage.time_spent,
					'секунд',
				);
				break;
			}

			case 'user_log': {
				const userLogMessage = message as UserLogMessage;
				// TODO: Добавить обработку лога действия в userLogSlice (для учителя)
				// dispatch(addUserLog(userLogMessage.data));
				console.info(
					'[WebSocket] Лог действия студента:',
					userLogMessage.data,
				);
				break;
			}

			case 'gate_position': {
				const gateMessage = message as GatePositionUpdateMessage;
				dispatch(
					setGatePosition({
						id: gateMessage.gateId,
						position: gateMessage.position,
					}),
				);
				break;
			}

			case 'gate_state': {
				const stateMessage = message as GateStateUpdateMessage;
				// Проверяем, что состояние валидно
				if (
					Object.values(GATE_STATE_TYPE).includes(
						stateMessage.state as GATE_STATE_TYPE,
					)
				) {
					dispatch(
						setGateState({
							id: stateMessage.gateId,
							states: stateMessage.state as GATE_STATE_TYPE,
						}),
					);
				} else {
					console.warn(
						`Invalid gate state received: ${stateMessage.state}`,
					);
				}
				break;
			}

			case 'points_update': {
				const pointsMessage = message as PointsUpdateMessage;
				dispatch(setVoltagePoints(pointsMessage.points));
				break;
			}

			case 'simulation_status': {
				const statusMessage = message as SimulationStatusMessage;
				// TODO: Добавить обработку статуса симуляции в simulationSlice
				console.info('Simulation status update:', statusMessage);
				break;
			}

			case 'error': {
				const errorMessage = message as ErrorMessage;
				console.error('WebSocket error message:', errorMessage);
				// TODO: Показать уведомление пользователю через toast
				// Для этого нужно передать showToast в createMessageHandler
				break;
			}

			case 'circuit_update': {
				// TODO: Добавить обработку обновления схемы
				console.info('Circuit update received:', message);
				break;
			}

			default: {
				// Неизвестное сообщение
				const unknownMessage = message as { type?: string };
				console.warn(
					'[WebSocket] Unknown message type:',
					unknownMessage.type || 'no type field',
					message,
				);
			}
		}
	};
}
