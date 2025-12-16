/**
 * Типы для WebSocket сообщений
 */

/**
 * Состояния WebSocket соединения
 */
export enum WebSocketStatus {
	CONNECTING = 'connecting',
	CONNECTED = 'connected',
	DISCONNECTED = 'disconnected',
	ERROR = 'error',
}

/**
 * Исходящие сообщения (от клиента к серверу)
 * ⚠️ ВАЖНО: Бэкенд НЕ обрабатывает входящие сообщения через WebSocket
 * Все действия должны выполняться через REST API
 * Этот тип оставлен для обратной совместимости, но не должен использоваться
 */
export interface OutgoingMessage {
	type: string;
	[key: string]: unknown;
}

/**
 * Сообщение инициализации симуляции (без поля type)
 * Отправляется при подключении или создании симуляции
 * Поддерживает  формат:
 *  {"gate": "g2", "malfunctions": [{"additionalProp1": "c.0.1"}]}
 */
export interface SimulationInitMessage {
	gate?: string;
	
	malfunctions: Array<Record<string, string>>;
}

/**
 * Сообщение завершения симуляции (для студента)
 */
export interface SimulationFinishedStudentMessage {
	type: 'simulation_finished';
	simulation_id: number;
	time_spent: number;
}

/**
 * Сообщение завершения симуляции (для учителя)
 */
export interface SimulationFinishedTeacherMessage {
	type: 'simulation_finished';
	simulation_id: number;
	student_name: string;
	time_spent: number;
}

/**
 * Сообщение лога действия студента (для учителя)
 */
export interface UserLogMessage {
	type: 'user_log';
	data: {
		id: number;
		user: number;
		created_at: string;
		simulation: number;
		answer_correct: boolean;
		malfunction_id?: string | null;
	};
}

/**
 * Сообщение об обновлении позиции задвижки
 */
export interface GatePositionUpdateMessage {
	type: 'gate_position';
	gateId: string;
	position: number;
}

/**
 * Сообщение об обновлении состояния задвижки
 */
export interface GateStateUpdateMessage {
	type: 'gate_state';
	gateId: string;
	state: string;
}

/**
 * Сообщение об обновлении схемы
 */
export interface CircuitUpdateMessage {
	type: 'circuit_update';
	circuit: unknown; // TODO: типизировать после уточнения структуры
}

/**
 * Сообщение об обновлении точек
 */
export interface PointsUpdateMessage {
	type: 'points_update';
	points: Record<string, boolean>;
}

/**
 * Сообщение об ошибке
 */
export interface ErrorMessage {
	type: 'error';
	message: string;
	code?: string;
}

/**
 * Сообщение о статусе симуляции
 */
export interface SimulationStatusMessage {
	type: 'simulation_status';
	active: boolean;
	simulationId?: string;
}

/**
 * Тип для всех возможных входящих сообщений
 */
export type WebSocketIncomingMessage =
	| SimulationInitMessage
	| SimulationFinishedStudentMessage
	| SimulationFinishedTeacherMessage
	| UserLogMessage
	| GatePositionUpdateMessage
	| GateStateUpdateMessage
	| CircuitUpdateMessage
	| PointsUpdateMessage
	| ErrorMessage
	| SimulationStatusMessage;

/**
 * Callback для обработки входящих сообщений
 */
export type MessageHandler = (message: WebSocketIncomingMessage) => void;

/**
 * Callback для обработки изменений статуса соединения
 */
export type StatusChangeHandler = (status: WebSocketStatus) => void;
