/**
 * Централизованные идентификаторы элементов и точек схемы управления.
 * Имена заданы в формате UPPER_SNAKE_CASE с суффиксом _ID для удобства.
 *
 * Структура ID:
 *  - Префикс `c.`  — элементы схемы управления (control circuit)
 *  - Префикс `p.`  — точки подключения / измерения (points)
 *  - Следующие числа обозначают иерархию ветвей:
 *      - `3.0` — ветка «ОТКРЫТЬ»
 *      - `3.1` — ветка «ЗАКРЫТЬ»
 *      - `4.*` — элементы внутри ветки (вставки, кнопки, лампы, катушки и т.д.)
 *  - Пример:
 *      `c.3.0.4.1.1.4` — катушка пускателя ветки «ОТКРЫТЬ»
 *      `p.c.3.1.4.2.1` — точка лампы «ОТКРЫТО» ветки «ЗАКРЫТЬ»
 */

// Общая часть (питание схемы управления)
export const WIRE_POWER_TO_CONTROL_BREAKER_ID = 'c.0'; // Провод от источника питания к автомату управления
export const CONTROL_CIRCUIT_BREAKER_ID = 'c.1'; // Автомат питания цепи управления
export const WIRE_PHASE_AFTER_BREAKER_ID = 'c.2'; // Провод после автомата управления (фаза)

// Ветка «ОТКРЫТЬ» (c.3.0.*)
export const WIRE_BOX_TO_LIMIT_OPEN_ID = 'c.3.0.0'; // Провод от клеммной коробки к концевику «Открыто»
export const LIMIT_SWITCH_OPEN_ID = 'c.3.0.1'; // Концевой выключатель «Открыто»
export const WIRE_LIMIT_OPEN_TO_TERMINAL_ID = 'c.3.0.2'; // Провод от концевика «Открыто» к клемме
export const WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID = 'c.3.0.3'; // Провод от клеммы к вставке NDI «Не открыто»
// Вставка NDI «Не открыто» — фактический элемент в ветке 3.0
export const NDI_NOT_OPEN_INSERT_ID = 'c.3.0.4.0.1';
// Команды «ОТКРЫТЬ» — соответствуют реальным элементам из controlCircuit.elements
export const OPEN_COMMAND_FROM_PTK_INSERT_ID = 'c.3.0.4.1.0.0.1'; // Команда «Открыть» с ПТК (INSERT_NDI_CMD_OPEN_PTK_ID)
export const OPEN_COMMAND_FROM_KRUZAP_INSERT_ID = 'c.3.0.4.1.2.1'; // Кнопка «Открыть» на КрузАП (BUTTON_KRUZA_P_OPEN_ID)
export const OPEN_STARTER_INTERLOCK_CONTACT_ID = 'c.3.0.4.1.1.1'; // Блок-контакт пускателя «Открыть» (INTERLOCK_CONTACT_OPEN_ID)
export const OPEN_STARTER_COIL_ID = 'c.3.0.4.1.1.4'; // Катушка пускателя «Открыть» (COIL_OPEN_ID)
export const KRUZAP_CLOSED_STATUS_LAMP_ID = 'c.3.0.4.2.1'; // Лампа «Закрыто» на КрузАП (LAMP_KRUZA_P_CLOSED_ID)
export const WIRE_BEFORE_NDI_NOT_OPEN_ID = 'c.3.0.4.0.0'; // Провод до вставки NDI «Не открыто»
export const INSERT_NDI_NOT_OPEN_ID = 'c.3.0.4.0.1'; // Вставка NDI «Не открыто»
export const WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID = 'c.3.0.4.0.2'; // Провод от NDI «Не открыто» к нейтрали
export const WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID = 'c.3.0.4.1.0.0.0'; // Провод перед вставкой команды «Открыть» (ПТК)
export const INSERT_NDI_CMD_OPEN_PTK_ID = 'c.3.0.4.1.0.0.1'; // Вставка команды «Открыть» (ПТК)
export const WIRE_NDI_CMD_OPEN_PTK_TO_NEUTRAL_ID = 'c.3.0.4.1.0.0.2'; // Провод от вставки команды «Открыть» к нейтрали
export const WIRE_BEFORE_INTERLOCK_OPEN_ID = 'c.3.0.4.1.1.0'; // Провод перед блок-контактом «Открыть»
export const INTERLOCK_CONTACT_OPEN_ID = 'c.3.0.4.1.1.1'; // Блок-контакт «Открыть»
export const WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID = 'c.3.0.4.1.1.2'; // Провод после блок-контакта к катушке
export const COIL_OPEN_ID = 'c.3.0.4.1.1.4'; // Катушка пускателя «Открыть»
export const WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID = 'c.3.0.4.1.2.0'; // Провод перед кнопкой «Открыть» КрузАП
export const BUTTON_KRUZA_P_OPEN_ID = 'c.3.0.4.1.2.1'; // Кнопка «Открыть» КрузАП
export const WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID = 'c.3.0.4.1.2.2'; // Провод от кнопки «Открыть» к нейтрали
export const WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID = 'c.3.0.4.2.0'; // Провод перед лампой «Закрыто»
export const LAMP_KRUZA_P_CLOSED_ID = 'c.3.0.4.2.1'; // Лампа «Закрыто» на панели КрузАП
export const WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID = 'c.3.0.4.2.2'; // Провод от лампы «Закрыто» к нейтрали

// Ветка «ЗАКРЫТЬ» (c.3.1.*)
export const WIRE_BOX_TO_LIMIT_CLOSE_ID = 'c.3.1.0'; // Провод от клеммной коробки к концевику «Закрыто»
export const LIMIT_SWITCH_CLOSE_ID = 'c.3.1.1'; // Концевой выключатель «Закрыто»
export const WIRE_LIMIT_CLOSE_TO_TERMINAL_ID = 'c.3.1.2'; // Провод от концевика «Закрыто» к клемме
export const WIRE_TERMINAL_TO_NDI_NOT_CLOSED_ID = 'c.3.1.3'; // Провод от клеммы к вставке NDI «Не закрыто»
// Вставка NDI «Не закрыто» — фактический элемент в ветке 3.1
export const NDI_NOT_CLOSED_INSERT_ID = 'c.3.1.4.0.1';
// Команды «ЗАКРЫТЬ» — соответствуют реальным элементам из controlCircuit.elements
export const CLOSE_COMMAND_FROM_PTK_INSERT_ID = 'c.3.1.4.1.0.0.1'; // Команда «Закрыть» с ПТК (INSERT_NDI_CMD_CLOSE_PTK_ID)
export const CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID = 'c.3.1.4.1.2.1'; // Кнопка «Закрыть» на КрузАП (BUTTON_KRUZA_P_CLOSE_ID)
export const CLOSE_STARTER_INTERLOCK_CONTACT_ID = 'c.3.1.4.1.1.1'; // Блок-контакт пускателя «Закрыть»
export const CLOSE_STARTER_COIL_ID = 'c.3.1.4.1.1.4'; // Катушка пускателя «Закрыть»
export const KRUZAP_OPEN_STATUS_LAMP_ID = 'c.3.1.4.2.1'; // Лампа «Открыто» на КрузАП
export const WIRE_BEFORE_NDI_NOT_CLOSED_ID = 'c.3.1.4.0.0'; // Провод до вставки NDI «Не закрыто»
export const INSERT_NDI_NOT_CLOSED_ID = 'c.3.1.4.0.1'; // Вставка NDI «Не закрыто»
export const WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID = 'c.3.1.4.0.2'; // Провод от NDI «Не закрыто» к нейтрали
export const WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID = 'c.3.1.4.1.0.0.0'; // Провод перед вставкой команды «Закрыть» (ПТК)
export const INSERT_NDI_CMD_CLOSE_PTK_ID = 'c.3.1.4.1.0.0.1'; // Вставка команды «Закрыть» (ПТК)
export const WIRE_NDI_CMD_CLOSE_PTK_TO_NEUTRAL_ID = 'c.3.1.4.1.0.0.2'; // Провод от вставки команды «Закрыть» к нейтрали
export const WIRE_BEFORE_INTERLOCK_CLOSE_ID = 'c.3.1.4.1.1.0'; // Провод перед блок-контактом «Закрыть»
export const INTERLOCK_CONTACT_CLOSE_ID = 'c.3.1.4.1.1.1'; // Блок-контакт «Закрыть»
export const WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID = 'c.3.1.4.1.1.2'; // Провод после блок-контакта к катушке
export const COIL_CLOSE_ID = 'c.3.1.4.1.1.4'; // Катушка пускателя «Закрыть»
export const WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID = 'c.3.1.4.1.2.0'; // Провод перед кнопкой «Закрыть» КрузАП
export const BUTTON_KRUZA_P_CLOSE_ID = 'c.3.1.4.1.2.1'; // Кнопка «Закрыть» КрузАП
export const WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID = 'c.3.1.4.1.2.2'; // Провод от кнопки «Закрыть» к нейтрали
export const WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID = 'c.3.1.4.2.0'; // Провод перед лампой «Открыто»
export const LAMP_KRUZA_P_OPEN_ID = 'c.3.1.4.2.1'; // Лампа «Открыто» на панели КрузАП
export const WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID = 'c.3.1.4.2.2'; // Провод от лампы «Открыто» к нейтрали

// Точки цепи управления (p.c.*)
export const CONTROL_POWER_FEED_POINT_ID = 'p.c.0'; // Точка питания цепи управления
export const CONTROL_BREAKER_INPUT_POINT_ID = 'p.c.1'; // Вход автомата управления
export const CONTROL_BREAKER_OUTPUT_POINT_ID = 'p.c.2'; // Выход автомата управления
export const OPEN_LIMIT_SWITCH_INPUT_POINT_ID = 'p.c.3.0.1'; // Вход концевика «Открыто»
export const OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID = 'p.c.3.0.2'; // Выход концевика «Открыто»
// Точки ветки «ОТКРЫТЬ» выровнены по структуре 4.1.*
export const OPEN_COMMAND_MERGE_POINT_ID = 'p.c.3.0.4.1.0.0.2'; // Точка объединения команды «Открыть»
export const OPEN_INTERLOCK_INPUT_POINT_ID = 'p.c.3.0.4.1.0.1.0'; // Вход блок-контакта «Открыть»
export const CLOSE_LIMIT_SWITCH_INPUT_POINT_ID = 'p.c.3.1.1'; // Вход концевика «Закрыто»
export const CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID = 'p.c.3.1.2'; // Выход концевика «Закрыто»
// Точки ветки «ЗАКРЫТЬ» выровнены по структуре 4.1.*
export const CLOSE_COMMAND_MERGE_POINT_ID = 'p.c.3.1.4.1.0.0.2'; // Точка объединения команды «Закрыть»
export const CLOSE_INTERLOCK_INPUT_POINT_ID = 'p.c.3.1.4.1.0.1.0'; // Вход блок-контакта «Закрыть»
