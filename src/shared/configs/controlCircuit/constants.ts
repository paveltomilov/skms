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
export const JUMPER_BOX_TO_LIMIT_OPEN_ID = 'c.3.0.0';
export const WIRE_BOX_TO_LIMIT_OPEN_ID = 'c.3.0.1';
export const LIMIT_SWITCH_OPEN_ID = 'c.3.0.2';
export const WIRE_LIMIT_OPEN_TO_TERMINAL_ID = 'c.3.0.3';

export const WIRE_BEFORE_NDI_NOT_OPEN_ID = 'c.3.0.4.0.0';
export const INSERT_NDI_NOT_OPEN_ID = 'c.3.0.4.0.1';
export const WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID = 'c.3.0.4.0.2';

export const WIRE_BEFORE_NDO_CMD_OPEN_PTK_ID = 'c.3.0.4.1.0.0.0';
export const INSERT_NDO_CMD_OPEN_PTK_ID = 'c.3.0.4.1.0.0.1';
export const WIRE_NDO_CMD_OPEN_PTK_TO_NEUTRAL_ID = 'c.3.0.4.1.0.0.2';

export const WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID = 'c.3.0.4.1.0.1.0';
export const BUTTON_KRUZA_P_OPEN_ID = 'c.3.0.4.1.0.1.1';
export const WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID = 'c.3.0.4.1.0.1.2';

export const WIRE_BEFORE_INTERLOCK_OPEN_ID = 'c.3.0.4.1.1';
export const INTERLOCK_OPEN_ID = 'c.3.0.4.1.2';
export const WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID = 'c.3.0.4.1.3';
export const COIL_OPEN_ID = 'c.3.0.4.1.4';

export const WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID = 'c.3.0.4.2.0';
export const LAMP_KRUZA_P_CLOSED_ID = 'c.3.0.4.2.1';
export const WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID = 'c.3.0.4.2.2';

// --- Ветка «ЗАКРЫТЬ» (3.1) ---
export const JUMPER_BOX_TO_LIMIT_CLOSE_ID = 'c.3.1.0';
export const WIRE_BOX_TO_LIMIT_CLOSE_ID = 'c.3.1.1';
export const LIMIT_SWITCH_CLOSE_ID = 'c.3.1.2';
export const WIRE_LIMIT_CLOSE_TO_TERMINAL_ID = 'c.3.1.3';

export const WIRE_BEFORE_NDI_NOT_CLOSED_ID = 'c.3.1.4.0.0';
export const INSERT_NDI_NOT_CLOSED_ID = 'c.3.1.4.0.1';
export const WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID = 'c.3.1.4.0.2';

export const WIRE_BEFORE_NDO_CMD_CLOSE_PTK_ID = 'c.3.1.4.1.0.0.0';
export const INSERT_NDO_CMD_CLOSE_PTK_ID = 'c.3.1.4.1.0.0.1';
export const WIRE_NDO_CMD_CLOSE_PTK_TO_NEUTRAL_ID = 'c.3.1.4.1.0.0.2';

export const WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID = 'c.3.1.4.1.0.1.0';
export const BUTTON_KRUZA_P_CLOSE_ID = 'c.3.1.4.1.0.1.1';
export const WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID = 'c.3.1.4.1.0.1.2';

export const WIRE_BEFORE_INTERLOCK_CLOSE_ID = 'c.3.1.4.1.1';
export const INTERLOCK_CLOSE_ID = 'c.3.1.4.1.2';
export const WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID = 'c.3.1.4.1.3';
export const COIL_CLOSE_ID = 'c.3.1.4.1.4';

export const WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID = 'c.3.1.4.2.0';
export const LAMP_KRUZA_P_OPEN_ID = 'c.3.1.4.2.1';
export const WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID = 'c.3.1.4.2.2';

// Алиасы для совместимости с другими модулями

// ======================== ТОЧКИ СХЕМЫ УПРАВЛЕНИЯ ========================

// --- Основные осмысленные точки ---
export const CONTROL_POWER_FEED_POINT_ID = 'p.c.0';
export const CONTROL_BREAKER_INPUT_POINT_ID = 'p.c.1';
export const CONTROL_BREAKER_OUTPUT_POINT_ID = 'p.c.2';
export const CONTROL_MAIN_BUS_POINT_ID = 'p.c.3';
export const CONTROL_NEUTRAL_POINT_ID = 'p.c.n';

// --- Точки ветки «ОТКРЫТЬ» ---
export const OPEN_JUNCTION_BOX_POINT_ID = 'p.c.3.0.0'; // Соединительная коробка (ветка открыть)
export const OPEN_LIMIT_SWITCH_INPUT_POINT_ID = 'p.c.3.0.1';
export const OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID = 'p.c.3.0.2';
export const OPEN_TERMINAL_BLOCK_POINT_ID = 'p.c.3.0.3'; // Клеммник (ветка открыть)

// --- Точки команд ветки «ОТКРЫТЬ» ---
export const OPEN_NDI_NOT_OPEN_INPUT_POINT_ID = 'p.c.3.0.4.0.0'; // Вход NDO "не открыто"
export const OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID = 'p.c.3.0.4.0.1'; // Выход NDO "не открыто"

export const OPEN_CMD_PTK_BRANCH_POINT_ID = 'p.c.3.0.4.1.0.0.0'; // Разветвление команды ПТК (открыть)
export const OPEN_NDO_CMD_PTK_INPUT_POINT_ID = 'p.c.3.0.4.1.0.0.1'; // Вход NDO команды ПТК (открыть)

export const OPEN_BUTTON_INPUT_POINT_ID = 'p.c.3.0.4.1.0.1.0'; // Вход кнопки (открыть)
export const OPEN_BUTTON_OUTPUT_POINT_ID = 'p.c.3.0.4.1.0.1.1'; // Выход кнопки (открыть)

export const COMANDS_OPEN_POINT_ID = 'p.c.3.0.4.1.0'; // Точка команд открыть выход (открыть)

export const OPEN_INTERLOCK_INPUT_POINT_ID = 'p.c.3.0.4.1.1'; // Вдох блокировочного контакта (открыть)
export const OPEN_INTERLOCK_OUTPUT_POINT_ID = 'p.c.3.0.4.1.2'; // Выход блокировочного контакта (открыть)
export const OPEN_COIL_INPUT_POINT_ID = 'p.c.3.0.4.1.3'; // Вход катушки (открыть)

export const CLOSED_LAMP_BRANCH_POINT_ID = 'p.c.3.0.4.2.0'; // Разветвление к лампе "закрыто"
export const CLOSED_LAMP_TO_NEUTRAL_POINT_ID = 'p.c.3.0.4.2.1'; // От лампы "закрыто" к нейтрали

// --- Точки ветки «ЗАКРЫТЬ» ---
export const CLOSE_JUNCTION_BOX_POINT_ID = 'p.c.3.1.0'; // Соединительная коробка (ветка закрыть)
export const CLOSE_LIMIT_SWITCH_INPUT_POINT_ID = 'p.c.3.1.1';
export const CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID = 'p.c.3.1.2';
export const CLOSE_TERMINAL_BLOCK_POINT_ID = 'p.c.3.1.3'; // Клеммник (ветка закрыть)

// --- Точки команд ветки «ЗАКРЫТЬ» ---

export const CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID = 'p.c.3.1.4.0.0'; // Вход NDO "не закрыто"
export const CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID = 'p.c.3.1.4.0.1'; // Выход NDO "не закрыто"

export const CLOSE_CMD_PTK_BRANCH_POINT_ID = 'p.c.3.1.4.1.0.0.0'; // Разветвление команды ПТК (закрыть)
export const CLOSE_NDO_CMD_PTK_INPUT_POINT_ID = 'p.c.3.1.4.1.0.0.1'; // Вход NDO команды ПТК (закрыть)

export const CLOSE_BUTTON_INPUT_POINT_ID = 'p.c.3.1.4.1.0.1.0'; // Вход кнопки (закрыть)
export const CLOSE_BUTTON_OUTPUT_POINT_ID = 'p.c.3.1.4.1.0.1.1'; // Выход кнопки (закрыть)

export const COMMANDS_CLOSE_POINT_ID = 'p.c.3.1.4.1.0'; // Точка команд закрыть выход (закрыть)

export const CLOSE_INTERLOCK_INPUT_POINT_ID = 'p.c.3.1.4.1.1'; // Вход блокировочного контакта (закрыть)
export const CLOSE_INTERLOCK_OUTPUT_POINT_ID = 'p.c.3.1.4.1.2'; // Выход блокировочного контакта (закрыть)
export const CLOSE_COIL_INPUT_POINT_ID = 'p.c.3.1.4.1.3'; // Вход катушки (закрыть)

export const OPEN_LAMP_BRANCH_POINT_ID = 'p.c.3.1.4.2.0'; // Разветвление к лампе "открыто"
export const OPEN_LAMP_INPUT_POINT_ID = 'p.c.3.1.4.2.1'; // Вход лампы "открыто"

export const CONTROL_CIRCUIT_NEUTRAL_ID = 'p.c.n'; // нейтраль цепи управления


