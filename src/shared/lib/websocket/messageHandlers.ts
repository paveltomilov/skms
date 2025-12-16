import { AppDispatch } from '@/store/store';
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
	GateMalfunctionsUpdateMessage,
} from '@/shared/types/websocket';
import {
	setGatePosition,
	setGateState,
	setGateMalfunctions,
	setActiveGate,
} from '@/store/gateSlice';
import { setVoltagePoints } from '@/store/pointsSlice';
import { GATE_STATE_TYPE } from '@/shared/types/gate';
import { setSimulation, resetSimulation } from '@/store/simulationSlice';
import { activateMalfunction } from '@/store/circuitSlice';

/**
 * Обработчик входящих WebSocket сообщений
 * Диспатчит соответствующие действия в Redux store
 */
export function createMessageHandler(dispatch: AppDispatch) {
	return (message: WebSocketIncomingMessage): void => {
		// Проверяем наличие поля type для определения типа сообщения
		const messageAny = message as unknown as Record<string, unknown>;

		// Обработка сообщений без поля type (инициализация симуляции)
		if (!('type' in messageAny) || !messageAny.type) {
			// Проверяем наличие полей gate и malfunctions
			if ('gate' in messageAny && 'malfunctions' in messageAny) {
				const initMessage = message as SimulationInitMessage;

				// Преобразуем массив объектов в массив ID неисправностей
				// Поддерживаем два формата:
				// 1. [{"malfunction_id": "c.0.1", "description": "..."}]
				// 2. [{"additionalProp1": "c.0.1"}] - динамические ключи
				const malfunctionIds: string[] = initMessage.malfunctions
					.map(m => {
						// Если есть поле malfunction_id, используем его
						if (
							'malfunction_id' in m &&
							typeof m.malfunction_id === 'string'
						) {
							return m.malfunction_id;
						}
						// Иначе извлекаем все значения из объекта (для формата с динамическими ключами)
						return (
							Object.values(m).find(
								(v): v is string => typeof v === 'string',
							) || ''
						);
					})
					.filter(Boolean);

				// Преобразуем в формат для setSimulation
				const malfunctionsForState = initMessage.malfunctions.map(m => {
					// Если есть поле malfunction_id, используем его
					if (
						'malfunction_id' in m &&
						typeof m.malfunction_id === 'string'
					) {
						return {
							malfunction_id: m.malfunction_id,
							description:
								'description' in m &&
								typeof m.description === 'string'
									? m.description
									: m.malfunction_id,
						};
					}
					// Иначе извлекаем значение из объекта
					const malfunctionId =
						Object.values(m).find(
							(v): v is string => typeof v === 'string',
						) || '';
					return {
						malfunction_id: malfunctionId,
						description: malfunctionId,
					};
				});

				// Обновляем неисправности задвижки и устанавливаем активную задвижку
				if (initMessage.gate) {
					dispatch(setActiveGate(initMessage.gate));
					dispatch(
						setGateMalfunctions({
							id: initMessage.gate,
							malfunctions: malfunctionIds,
						}),
					);
				}

				// Обновляем данные симуляции в Redux
				dispatch(
					setSimulation({
						gate: initMessage.gate,
						malfunctions: malfunctionsForState,
					}),
				);

				// Активируем неисправности в схеме
				malfunctionIds.forEach(malfunctionId => {
					dispatch(activateMalfunction(malfunctionId));
				});

				console.info(
					'[WebSocket] Инициализация симуляции:',
					initMessage.gate,
					malfunctionIds,
				);
				return;
			}

			// Если нет type и нет gate/malfunctions, это неизвестное сообщение
			console.warn(
				'[WebSocket] Сообщение без поля type и без gate/malfunctions:',
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

				// Обрабатываем завершение симуляции
				// resetSimulation возвращает начальное состояние
				dispatch(resetSimulation());

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
				// Обработка устаревшего формата GateMalfunctionsUpdateMessage
				if ('gate' in messageAny && 'malfunctions' in messageAny) {
					const malfunctionsMessage =
						message as unknown as GateMalfunctionsUpdateMessage;
					// Преобразуем массив объектов в массив строк (ID неисправностей)
					const malfunctionIds: string[] =
						malfunctionsMessage.malfunctions.flatMap(malfunction =>
							Object.values(malfunction),
						);
					dispatch(
						setGateMalfunctions({
							id: malfunctionsMessage.gate,
							malfunctions: malfunctionIds,
						}),
					);
					console.info(
						'[WebSocket] Обновлены неисправности задвижки (устаревший формат):',
						malfunctionsMessage.gate,
						malfunctionIds,
					);
					break;
				}

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
