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
} from '@/store/gateSlice';
import { setVoltagePoints } from '@/store/pointsSlice';
import { GATE_STATE_TYPE } from '@/shared/types/gate';
import { setSimulation, resetSimulation } from '@/store/simulationSlice';

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
				// Преобразуем массив объектов с malfunction_id и description в массив ID
				const malfunctionIds: string[] = initMessage.malfunctions.map(
					m => m.malfunction_id,
				);

				// Обновляем неисправности задвижки
				if (initMessage.gate) {
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
						malfunctions: initMessage.malfunctions,
					}),
				);

				console.log(
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
				console.log(
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
				console.log('Simulation status update:', statusMessage);
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
				console.log('Circuit update received:', message);
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
					console.log(
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
