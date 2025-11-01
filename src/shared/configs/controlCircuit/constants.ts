/**
 * Идентификаторы элементов и точек схемы управления.
 *
 * Константы элементов именуются описательно (что это за элемент и где находится).
 * Технические точки без осмысленных названий генерируются через функцию getPointId().
 *
 * Структура ID:
 *  - `c.*`  — элементы схемы управления (control circuit elements)
 *  - `p.c.*` — точки схемы управления (points)
 */

/**
 * Генератор ID для технических точек подключения.
 * Используется для точек, которые не имеют осмысленного названия.
 * @example getPointId('c', '3', '0', '4', '1', '0', '1', '2') → 'p.c.3.0.4.1.0.1.2'
 */
export const getPointId = (...segments: string[]): string =>
	`p.c.${segments.join('.')}`;

// ======================== ЭЛЕМЕНТЫ СХЕМЫ УПРАВЛЕНИЯ ========================

// --- Общая часть (питание) ---
export const WIRE_POWER_TO_CONTROL_BREAKER_ID = 'c.0'; // Провод от силовой части к автомату управления
export const CONTROL_CIRCUIT_BREAKER_ID = 'c.1'; // Автомат питания цепи управления
export const WIRE_PHASE_AFTER_BREAKER_ID = 'c.2'; // Провод после автомата (фаза)

// --- Ветка «ОТКРЫТЬ» (3.0) ---
export const WIRE_BOX_TO_LIMIT_OPEN_ID = 'c.3.0.0';
export const LIMIT_SWITCH_OPEN_ID = 'c.3.0.1';
export const WIRE_LIMIT_OPEN_TO_TERMINAL_ID = 'c.3.0.2';
export const WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID = 'c.3.0.3';
export const WIRE_BEFORE_NDI_NOT_OPEN_ID = 'c.3.0.4.0.0';
export const INSERT_NDI_NOT_OPEN_ID = 'c.3.0.4.0.1';
export const WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID = 'c.3.0.4.0.2';
export const WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID = 'c.3.0.4.1.0.0.0';
export const INSERT_NDI_CMD_OPEN_PTK_ID = 'c.3.0.4.1.0.0.1';
export const WIRE_NDI_CMD_OPEN_PTK_TO_NEUTRAL_ID = 'c.3.0.4.1.0.0.2';
export const WIRE_BEFORE_INTERLOCK_OPEN_ID = 'c.3.0.4.1.1.0';
export const INTERLOCK_CONTACT_OPEN_ID = 'c.3.0.4.1.1.1';
export const WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID = 'c.3.0.4.1.1.2';
export const COIL_OPEN_ID = 'c.3.0.4.1.1.4';
export const WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID = 'c.3.0.4.1.2.0';
export const BUTTON_KRUZA_P_OPEN_ID = 'c.3.0.4.1.2.1';
export const WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID = 'c.3.0.4.1.2.2';
export const WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID = 'c.3.0.4.2.0';
export const LAMP_KRUZA_P_CLOSED_ID = 'c.3.0.4.2.1';
export const WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID = 'c.3.0.4.2.2';

// --- Ветка «ЗАКРЫТЬ» (3.1) ---
export const WIRE_BOX_TO_LIMIT_CLOSE_ID = 'c.3.1.0';
export const LIMIT_SWITCH_CLOSE_ID = 'c.3.1.1';
export const WIRE_LIMIT_CLOSE_TO_TERMINAL_ID = 'c.3.1.2';
export const WIRE_TERMINAL_TO_NDI_NOT_CLOSED_ID = 'c.3.1.3';
export const WIRE_BEFORE_NDI_NOT_CLOSED_ID = 'c.3.1.4.0.0';
export const INSERT_NDI_NOT_CLOSED_ID = 'c.3.1.4.0.1';
export const WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID = 'c.3.1.4.0.2';
export const WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID = 'c.3.1.4.1.0.0.0';
export const INSERT_NDI_CMD_CLOSE_PTK_ID = 'c.3.1.4.1.0.0.1';
export const WIRE_NDI_CMD_CLOSE_PTK_TO_NEUTRAL_ID = 'c.3.1.4.1.0.0.2';
export const WIRE_BEFORE_INTERLOCK_CLOSE_ID = 'c.3.1.4.1.1.0';
export const INTERLOCK_CONTACT_CLOSE_ID = 'c.3.1.4.1.1.1';
export const WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID = 'c.3.1.4.1.1.2';
export const COIL_CLOSE_ID = 'c.3.1.4.1.1.4';
export const WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID = 'c.3.1.4.1.2.0';
export const BUTTON_KRUZA_P_CLOSE_ID = 'c.3.1.4.1.2.1';
export const WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID = 'c.3.1.4.1.2.2';
export const WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID = 'c.3.1.4.2.0';
export const LAMP_KRUZA_P_OPEN_ID = 'c.3.1.4.2.1';
export const WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID = 'c.3.1.4.2.2';

// ======================== ТОЧКИ СХЕМЫ УПРАВЛЕНИЯ ========================

// --- Основные осмысленные точки ---
export const CONTROL_POWER_FEED_POINT_ID = 'p.c.0';
export const CONTROL_BREAKER_INPUT_POINT_ID = 'p.c.1';
export const CONTROL_BREAKER_OUTPUT_POINT_ID = 'p.c.2';
export const CONTROL_MAIN_BUS_POINT_ID = 'p.c.3';
export const CONTROL_NEUTRAL_POINT_ID = 'p.c.n';

// --- Точки ветки «ОТКРЫТЬ» ---
export const OPEN_LIMIT_SWITCH_INPUT_POINT_ID = 'p.c.3.0.1';
export const OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID = 'p.c.3.0.2';
export const CLOSED_LAMP_INPUT_POINT_ID = 'p.c.3.0.4.2.1';
export const OPEN_COMMAND_MERGE_POINT_ID = 'p.c.3.0.4.1.0.0.2';
export const OPEN_INTERLOCK_INPUT_POINT_ID = 'p.c.3.0.4.1.0.1.0';

// --- Точки ветки «ЗАКРЫТЬ» ---
export const CLOSE_LIMIT_SWITCH_INPUT_POINT_ID = 'p.c.3.1.1';
export const CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID = 'p.c.3.1.2';
export const OPEN_LAMP_INPUT_POINT_ID = 'p.c.3.1.4.2.1';
export const CLOSE_COMMAND_MERGE_POINT_ID = 'p.c.3.1.4.1.0.0.2';
export const CLOSE_INTERLOCK_INPUT_POINT_ID = 'p.c.3.1.4.1.0.1.0';

// --- Дополнительные технические точки ветки «ОТКРЫТЬ» ---
export const OPEN_JUNCTION_BOX_POINT_ID = 'p.c.3.0.0'; // Соединительная коробка (ветка открыть)
export const OPEN_TERMINAL_BLOCK_POINT_ID = 'p.c.3.0.3'; // Клеммник (ветка открыть)
export const OPEN_NDI_SPLIT_POINT_ID = 'p.c.3.0.4'; // Разветвление к NDI (ветка открыть)
export const OPEN_NDI_NOT_OPEN_INPUT_POINT_ID = 'p.c.3.0.4.0.0'; // Вход NDI "не открыто"
export const OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID = 'p.c.3.0.4.0.1'; // Выход NDI "не открыто"
export const OPEN_CMD_PTK_BRANCH_POINT_ID = 'p.c.3.0.4.1.0.0.0'; // Разветвление команды ПТК (открыть)
export const OPEN_NDI_CMD_PTK_INPUT_POINT_ID = 'p.c.3.0.4.1.0.0.1'; // Вход NDI команды ПТК (открыть)
export const OPEN_INTERLOCK_OUTPUT_POINT_ID = 'p.c.3.0.4.1.0.1.1'; // Выход блокировочного контакта (открыть)
export const OPEN_COIL_INPUT_POINT_ID = 'p.c.3.0.4.1.0.1.2'; // Вход катушки (открыть)
export const OPEN_COIL_SPLIT_POINT_ID = 'p.c.3.0.4.1.0.1.3'; // Разветвление от катушки (открыть)
export const OPEN_BUTTON_INPUT_POINT_ID = 'p.c.3.0.4.1.2.0'; // Вход кнопки (открыть)
export const OPEN_BUTTON_OUTPUT_POINT_ID = 'p.c.3.0.4.1.2.1'; // Выход кнопки (открыть)
export const OPEN_BUTTON_TO_NEUTRAL_POINT_ID = 'p.c.3.0.4.1.2.2'; // От кнопки к нейтрали (открыть)
export const CLOSED_LAMP_BRANCH_POINT_ID = 'p.c.3.0.4.2.0'; // Разветвление к лампе "закрыто"
export const CLOSED_LAMP_TO_NEUTRAL_POINT_ID = 'p.c.3.0.4.2.2'; // От лампы "закрыто" к нейтрали

// --- Дополнительные технические точки ветки «ЗАКРЫТЬ» ---
export const CLOSE_JUNCTION_BOX_POINT_ID = 'p.c.3.1.0'; // Соединительная коробка (ветка закрыть)
export const CLOSE_TERMINAL_BLOCK_POINT_ID = 'p.c.3.1.3'; // Клеммник (ветка закрыть)
export const CLOSE_NDI_SPLIT_POINT_ID = 'p.c.3.1.4'; // Разветвление к NDI (ветка закрыть)
export const CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID = 'p.c.3.1.4.0.0'; // Вход NDI "не закрыто"
export const CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID = 'p.c.3.1.4.0.1'; // Выход NDI "не закрыто"
export const CLOSE_NDI_NOT_CLOSED_TO_NEUTRAL_POINT_ID = 'p.c.3.1.4.0.2'; // От NDI "не закрыто" к нейтрали
export const CLOSE_CMD_PTK_BRANCH_POINT_ID = 'p.c.3.1.4.1.0.0.0'; // Разветвление команды ПТК (закрыть)
export const CLOSE_NDI_CMD_PTK_INPUT_POINT_ID = 'p.c.3.1.4.1.0.0.1'; // Вход NDI команды ПТК (закрыть)
export const CLOSE_NDI_CMD_PTK_TO_NEUTRAL_POINT_ID = 'p.c.3.1.4.1.0.0.2'; // От NDI команды ПТК к нейтрали (закрыть)
export const CLOSE_INTERLOCK_OUTPUT_POINT_ID = 'p.c.3.1.4.1.0.1.1'; // Выход блокировочного контакта (закрыть)
export const CLOSE_COIL_INPUT_POINT_ID = 'p.c.3.1.4.1.0.1.2'; // Вход катушки (закрыть)
export const CLOSE_COIL_SPLIT_POINT_ID = 'p.c.3.1.4.1.0.1.3'; // Разветвление от катушки (закрыть)
export const CLOSE_BUTTON_INPUT_POINT_ID = 'p.c.3.1.4.1.2.0'; // Вход кнопки (закрыть)
export const CLOSE_BUTTON_OUTPUT_POINT_ID = 'p.c.3.1.4.1.2.1'; // Выход кнопки (закрыть)
export const CLOSE_BUTTON_TO_NEUTRAL_POINT_ID = 'p.c.3.1.4.1.2.2'; // От кнопки к нейтрали (закрыть)
export const OPEN_LAMP_BRANCH_POINT_ID = 'p.c.3.1.4.2.0'; // Разветвление к лампе "открыто"
export const OPEN_LAMP_TO_NEUTRAL_POINT_ID = 'p.c.3.1.4.2.2'; // От лампы "открыто" к нейтрали
