import { AppDispatch, RootState } from '@/store/store';
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
import { openModal } from '@/store/modalSlice';

/**
 * Обработчик входящих WebSocket сообщений
 * Диспатчит соответствующие действия в Redux store
 * @param dispatch - функция для диспатча действий Redux
 * @param getState - функция для получения текущего состояния Redux (опционально)
 */
export function createMessageHandler(
	dispatch: AppDispatch,
	getState?: () => RootState,
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

				// Проверяем, что это новая симуляция (с simulation_id, gate и malfunctions)
				// gate может быть null, но должен быть определен (не undefined)
				const isNewSimulation =
					initMessage.simulation_id !== undefined &&
					initMessage.simulation_id !== null &&
					initMessage.gate !== undefined &&
					initMessage.malfunctions.length > 0;

				// Получаем текущий simulationId из Redux для сравнения
				let currentSimulationId: number | null = null;
				if (getState) {
					currentSimulationId = getState().simulation.simulationId;
				}

				// Проверяем, что это действительно новая симуляция (отличается от текущей)
				const isDifferentSimulation =
					isNewSimulation &&
					initMessage.simulation_id !== currentSimulationId;

				// Обновляем данные симуляции в Redux (включая simulation_id)
				dispatch(
					setSimulation({
						simulation_id: initMessage.simulation_id,
						gate: initMessage.gate,
						malfunctions: malfunctionsForState,
					}),
				);

				// Активируем неисправности в схеме
				malfunctionIds.forEach(malfunctionId => {
					dispatch(activateMalfunction(malfunctionId));
				});

				// Если это новая симуляция, показываем попап начала симуляции
				if (isDifferentSimulation) {
					dispatch(openModal('infoStartSimulation'));
					console.info(
						'[WebSocket] ✓ Новая симуляция обнаружена, открыт попап начала симуляции:',
						{
							simulation_id: initMessage.simulation_id,
							gate: initMessage.gate,
							malfunctionIds,
						},
					);
				} else {
					console.info(
						'[WebSocket] ✓ Инициализация симуляции обработана:',
						{
							simulation_id: initMessage.simulation_id,
							gate: initMessage.gate,
							malfunctionIds,
							isNewSimulation,
							currentSimulationId,
						},
					);
				}
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

				// Сохраняем simulation_id в sessionStorage для PopupSimulationComplete
				if (finishedMessage.simulation_id) {
					sessionStorage.setItem(
						'completedSimulationId',
						String(finishedMessage.simulation_id),
					);
				}

				// Обрабатываем завершение симуляции
				// resetSimulation возвращает начальное состояние
				dispatch(resetSimulation());

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
