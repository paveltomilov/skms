/**
 * Идентификаторы элементов и точек силовой схемы.
 *
 * Константы элементов именуются описательно (что это за элемент и где находится).
 * Технические точки без осмысленных названий генерируются через функцию getPointId().
 *
 * Структура ID:
 *  - `p.*`  — элементы силовой схемы (power circuit elements)
 *  - `p.p.*` — точки силовой схемы (points)
 */

/**
 * Генератор ID для технических точек подключения.
 * Используется для точек, которые не имеют осмысленного названия.
 * @example getPointId('0', '0', '0') → 'p.p.0.0.0'
 */
export const getPointId = (...segments: string[]): string =>
	`p.p.${segments.join('.')}`;

// ======================== ЭЛЕМЕНТЫ СИЛОВОЙ СХЕМЫ ========================

// --- Фаза A (0.0) ---
export const WIRE_PHASE_A_TO_INPUT_BREAKER_ID = 'p.0.0'; // Провод фазы A до вводного автомата
export const INPUT_BREAKER_CONTACT_PHASE_A_ID = 'p.0.1'; // Контакт вводного автомата фаза A
export const WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_A_ID = 'p.0.2'; // Провод от автомата фаза A до клемника перед пускателями
export const WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_A_ID = 'p.0.3.0.0'; // Провод от клемника до пускателя открыто фаза A
export const WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_A_ID = 'p.0.3.1.0'; // Провод от клемника до пускателя закрыто фаза A
export const STARTER_CONTACT_OPEN_PHASE_A_ID = 'p.0.3.0.1'; // Контакт пускателя открыто фаза A
export const STARTER_CONTACT_CLOSE_PHASE_A_ID = 'p.0.3.1.1'; // Контакт пускателя закрыто фаза A
export const WIRE_FROM_STARTER_OPEN_PHASE_A_ID = 'p.0.3.0.2'; // Провод от пускателя открыто фаза A
export const WIRE_FROM_STARTER_CLOSE_PHASE_C_ID = 'p.0.3.1.2'; // Провод от пускателя закрыто фаза C
export const WIRE_AFTER_STARTERS_PHASE_A_ID = 'p.0.4'; // Провод после пускателей фаза A
export const WIRE_TO_JUNCTION_BOX_PHASE_A_ID = 'p.0.5'; // Провод до соединительной коробки фаза A
export const WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_A_ID = 'p.0.6'; // Провод от соединительной коробки до двигателя фаза A
export const MOTOR_WINDING_PHASE_A_ID = 'p.0.7'; // Обмотка двигателя фаза A

// --- Фаза B (0.1) ---
export const WIRE_PHASE_B_TO_INPUT_BREAKER_ID = 'p.1.0'; // Провод фазы B до вводного автомата
export const INPUT_BREAKER_CONTACT_PHASE_B_ID = 'p.1.1'; // Контакт вводного автомата фаза B
export const WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_B_ID = 'p.1.2'; // Провод от автомата фаза B до клемника перед пускателями
export const WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_B_ID = 'p.1.3.0.0'; // Провод от клемника до пускателя открыто фаза B
export const WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_B_ID = 'p.1.3.1.0'; // Провод от клемника до пускателя закрыто фаза B
export const STARTER_CONTACT_OPEN_PHASE_B_ID = 'p.1.3.0.1'; // Контакт пускателя открыто фаза B
export const STARTER_CONTACT_CLOSE_PHASE_B_ID = 'p.1.3.1.1'; // Контакт пускателя закрыто фаза B
export const WIRE_FROM_STARTER_OPEN_PHASE_B_ID = 'p.1.3.0.2'; // Провод от пускателя открыто фаза B
export const WIRE_FROM_STARTER_CLOSE_PHASE_B_ID = 'p.1.3.1.2'; // Провод от пускателя закрыто фаза B
export const WIRE_AFTER_STARTERS_PHASE_B_ID = 'p.1.4'; // Провод после пускателей фаза B
export const WIRE_TO_JUNCTION_BOX_PHASE_B_ID = 'p.1.5'; // Провод до соединительной коробки фаза B
export const WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_B_ID = 'p.1.6'; // Провод от соединительной коробки до двигателя фаза B
export const MOTOR_WINDING_PHASE_B_ID = 'p.1.7'; // Обмотка двигателя фаза B

// --- Фаза C (0.2) ---
export const WIRE_PHASE_C_TO_INPUT_BREAKER_ID = 'p.2.0'; // Провод фазы C до вводного автомата
export const INPUT_BREAKER_CONTACT_PHASE_C_ID = 'p.2.1'; // Контакт вводного автомата фаза C
export const WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_C_ID = 'p.2.2'; // Провод от автомата фаза C до клемника перед пускателями
export const WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_C_ID = 'p.2.3.0.0'; // Провод от клемника до пускателя открыто фаза C
export const WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_C_ID = 'p.2.3.1.0'; // Провод от клемника до пускателя закрыто фаза C
export const STARTER_CONTACT_OPEN_PHASE_C_ID = 'p.2.3.0.1'; // Контакт пускателя открыто фаза C
export const STARTER_CONTACT_CLOSE_PHASE_C_ID = 'p.2.3.1.1'; // Контакт пускателя закрыто фаза C
export const WIRE_FROM_STARTER_OPEN_PHASE_C_ID = 'p.2.3.0.2'; // Провод от пускателя открыто фаза C
export const WIRE_FROM_STARTER_CLOSE_PHASE_A_ID = 'p.2.3.1.2'; // Провод от пускателя закрыто фаза A
export const WIRE_AFTER_STARTERS_PHASE_C_ID = 'p.2.4'; // Провод после пускателей фаза C
export const WIRE_TO_JUNCTION_BOX_PHASE_C_ID = 'p.2.5'; // Провод до соединительной коробки фаза C
export const WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_C_ID = 'p.2.6'; // Провод от соединительной коробки до двигателя фаза C
export const MOTOR_WINDING_PHASE_C_ID = 'p.2.7'; // Обмотка двигателя фаза C

// ======================== ТОЧКИ СИЛОВОЙ СХЕМЫ ========================

// --- Основные точки питания ---
export const PHASE_A_POINT_ID = 'p.p.a'; // Фаза A
export const PHASE_B_POINT_ID = 'p.p.b'; // Фаза B
export const PHASE_C_POINT_ID = 'p.p.c'; // Фаза C

// --- Точки фазы A (0.0) ---
export const INPUT_BREAKER_INPUT_POINT_PHASE_A_ID = 'p.p.0.0'; // Входящий контакт вводного автомата фаза A
export const INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID = 'p.p.0.1'; // Выходящий контакт вводного автомата фаза A
export const TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID = 'p.p.0.2'; // Точка перед пускателями фаза A
export const POINT_BEFORE_STARTER_OPEN_PHASE_A_ID = 'p.p.0.3.0.0'; // Точка перед пускателем открыто фаза A
export const POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID = 'p.p.0.3.1.0'; // Точка перед пускателем закрыто фаза A
export const POINT_AFTER_STARTER_OPEN_PHASE_A_ID = 'p.p.0.3.0.1'; // Точка после пускателя открыто фаза A
export const POINT_AFTER_STARTER_CLOSE_PHASE_A_ID = 'p.p.0.3.1.1'; // Точка после пускателя закрыто фаза A
export const MERGE_POINT_AFTER_STARTERS_PHASE_A_ID = 'p.p.0.3'; // Точка соединения ветвей после пускателей фаза A
export const JUNCTION_BOX_INPUT_POINT_PHASE_A_ID = 'p.p.0.4'; // Контакт подходящий в соединительной коробке фаза A
export const JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID = 'p.p.0.5'; // Контакт отходящий в соединительной коробке фаза A
export const MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID = 'p.p.0.6'; // Контакт обмотки двигателя фаза A

// --- Точки фазы B (0.1) ---
export const INPUT_BREAKER_INPUT_POINT_PHASE_B_ID = 'p.p.1.0'; // Входящий контакт вводного автомата фаза B
export const INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID = 'p.p.1.1'; // Выходящий контакт вводного автомата фаза B
export const TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID = 'p.p.1.2'; // Точка перед пускателями фаза B
export const POINT_BEFORE_STARTER_OPEN_PHASE_B_ID = 'p.p.1.3.0.0'; // Точка перед пускателем открыто фаза B
export const POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID = 'p.p.1.3.1.0'; // Точка перед пускателем закрыто фаза B
export const POINT_AFTER_STARTER_OPEN_PHASE_B_ID = 'p.p.1.3.0.1'; // Точка после пускателя открыто фаза B
export const POINT_AFTER_STARTER_CLOSE_PHASE_B_ID = 'p.p.1.3.1.1'; // Точка после пускателя закрыто фаза B
export const MERGE_POINT_AFTER_STARTERS_PHASE_B_ID = 'p.p.1.3'; // Точка соединения ветвей после пускателей фаза B
export const JUNCTION_BOX_INPUT_POINT_PHASE_B_ID = 'p.p.1.4'; // Контакт подходящий в соединительной коробке фаза B
export const JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID = 'p.p.1.5'; // Контакт отходящий в соединительной коробке фаза B
export const MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID = 'p.p.1.6'; // Контакт обмотки двигателя фаза B

// --- Точки фазы C (0.2) ---
export const INPUT_BREAKER_INPUT_POINT_PHASE_C_ID = 'p.p.2.0'; // Входящий контакт вводного автомата фаза C
export const INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID = 'p.p.2.1'; // Выходящий контакт вводного автомата фаза C
export const TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID = 'p.p.2.2'; // Точка перед пускателями фаза C
export const POINT_BEFORE_STARTER_OPEN_PHASE_C_ID = 'p.p.2.3.0.0'; // Точка перед пускателем открыто фаза C
export const POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID = 'p.p.2.3.1.0'; // Точка перед пускателем закрыто фаза C
export const POINT_AFTER_STARTER_OPEN_PHASE_C_ID = 'p.p.2.3.0.1'; // Точка после пускателя открыто фаза C
export const POINT_AFTER_STARTER_CLOSE_PHASE_C_ID = 'p.p.2.3.1.1'; // Точка после пускателя закрыто фаза C
export const MERGE_POINT_AFTER_STARTERS_PHASE_C_ID = 'p.p.2.3'; // Точка соединения ветвей после пускателей фаза C
export const JUNCTION_BOX_INPUT_POINT_PHASE_C_ID = 'p.p.2.4'; // Контакт подходящий в соединительной коробке фаза C
export const JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID = 'p.p.2.5'; // Контакт отходящий в соединительной коробке фаза C
export const MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID = 'p.p.2.6'; // Контакт обмотки двигателя фаза C

// --- Нейтраль силовой цепи ---
export const POWER_CIRCUIT_NEUTRAL_ID = 'p.p.n'; // Нейтраль силовой цепи

// --- Массивы ID для удобства ---
/**
 * Массив ID контактов вводного автомата для всех трех фаз.
 * Используется для проверки состояния вводного автомата.
 */
export const INPUT_CIRCUIT_BREAKER_ID = [
	INPUT_BREAKER_CONTACT_PHASE_A_ID,
	INPUT_BREAKER_CONTACT_PHASE_B_ID,
	INPUT_BREAKER_CONTACT_PHASE_C_ID,
] as const;
