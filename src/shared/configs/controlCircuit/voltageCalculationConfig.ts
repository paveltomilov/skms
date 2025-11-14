/**
 * Конфигурация для расчета напряжения в точках схемы управления.
 *
 * Позволяет определять напряжение в каждой точке относительно нейтрали.
 * Каждая точка может рассчитываться:
 * - От предыдущей точки через элемент (последовательное соединение)
 * - От нейтрали через элемент (для элементов, подключенных к нейтрали)
 * - Как объединение нескольких путей (параллельное соединение, OR логика)
 */

import {
	CONTROL_POWER_FEED_POINT_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
	CONTROL_BREAKER_OUTPUT_POINT_ID,
	CONTROL_NEUTRAL_POINT_ID,
	OPEN_JUNCTION_BOX_POINT_ID,
	OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
	OPEN_TERMINAL_BLOCK_POINT_ID,
	OPEN_NDI_NOT_OPEN_INPUT_POINT_ID,
	OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID,
	OPEN_CMD_PTK_BRANCH_POINT_ID,
	OPEN_NDO_CMD_PTK_INPUT_POINT_ID,
	OPEN_BUTTON_INPUT_POINT_ID,
	OPEN_BUTTON_OUTPUT_POINT_ID,
	COMANDS_OPEN_POINT_ID,
	OPEN_INTERLOCK_INPUT_POINT_ID,
	OPEN_INTERLOCK_OUTPUT_POINT_ID,
	OPEN_COIL_INPUT_POINT_ID,
	CLOSED_LAMP_BRANCH_POINT_ID,
	CLOSED_LAMP_TO_NEUTRAL_POINT_ID,
	CLOSE_JUNCTION_BOX_POINT_ID,
	CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
	CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	CLOSE_TERMINAL_BLOCK_POINT_ID,
	CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID,
	CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID,
	CLOSE_CMD_PTK_BRANCH_POINT_ID,
	CLOSE_NDO_CMD_PTK_INPUT_POINT_ID,
	CLOSE_BUTTON_INPUT_POINT_ID,
	CLOSE_BUTTON_OUTPUT_POINT_ID,
	COMMANDS_CLOSE_POINT_ID,
	CLOSE_INTERLOCK_INPUT_POINT_ID,
	CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	CLOSE_COIL_INPUT_POINT_ID,
	OPEN_LAMP_BRANCH_POINT_ID,
	OPEN_LAMP_INPUT_POINT_ID,
} from './constants';

import {
	CONTROL_CIRCUIT_BREAKER_ID,
	WIRE_PHASE_AFTER_BREAKER_ID,
	JUMPER_BOX_TO_LIMIT_OPEN_ID,
	WIRE_BOX_TO_LIMIT_OPEN_ID,
	LIMIT_SWITCH_OPEN_ID,
	WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	WIRE_BEFORE_NDI_NOT_OPEN_ID,
	INSERT_NDI_NOT_OPEN_ID,
	WIRE_BEFORE_NDO_CMD_OPEN_PTK_ID,
	INSERT_NDO_CMD_OPEN_PTK_ID,
	WIRE_NDO_CMD_OPEN_PTK_TO_NEUTRAL_ID,
	WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID,
	BUTTON_KRUZA_P_OPEN_ID,
	WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	WIRE_BEFORE_INTERLOCK_OPEN_ID,
	INTERLOCK_OPEN_ID,
	WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
	LAMP_KRUZA_P_CLOSED_ID,
	JUMPER_BOX_TO_LIMIT_CLOSE_ID,
	WIRE_BOX_TO_LIMIT_CLOSE_ID,
	LIMIT_SWITCH_CLOSE_ID,
	WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	WIRE_BEFORE_NDI_NOT_CLOSED_ID,
	INSERT_NDI_NOT_CLOSED_ID,
	WIRE_BEFORE_NDO_CMD_CLOSE_PTK_ID,
	INSERT_NDO_CMD_CLOSE_PTK_ID,
	WIRE_NDO_CMD_CLOSE_PTK_TO_NEUTRAL_ID,
	WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
	BUTTON_KRUZA_P_CLOSE_ID,
	WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
	WIRE_BEFORE_INTERLOCK_CLOSE_ID,
	INTERLOCK_CLOSE_ID,
	WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
	LAMP_KRUZA_P_OPEN_ID,
} from './constants';

/**
 * Тип расчета напряжения для точки
 */
export type VoltageCalculationType =
	| {
			type: 'from_previous';
			elementId: string;
			previousPointId: string;
	  }
	| {
			type: 'from_neutral';
			elementId: string;
	  }
	| {
			type: 'merge';
			calculations: VoltageCalculationType[];
	  }
	| {
			type: 'constant';
			value: boolean;
	  };

/**
 * Конфигурация расчета напряжения для всех точек схемы
 */
export const VOLTAGE_CALCULATION_CONFIG: Record<
	string,
	VoltageCalculationType
> = {
	// Нейтраль всегда 0V
	[CONTROL_NEUTRAL_POINT_ID]: {
		type: 'constant',
		value: false,
	},

	// Общая часть
	[CONTROL_BREAKER_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: CONTROL_CIRCUIT_BREAKER_ID,
		previousPointId: CONTROL_POWER_FEED_POINT_ID,
	},

	[CONTROL_BREAKER_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_PHASE_AFTER_BREAKER_ID,
		previousPointId: CONTROL_BREAKER_INPUT_POINT_ID,
	},

	// Ветка ОТКРЫТЬ
	[OPEN_JUNCTION_BOX_POINT_ID]: {
		type: 'from_previous',
		elementId: JUMPER_BOX_TO_LIMIT_OPEN_ID,
		previousPointId: CONTROL_BREAKER_OUTPUT_POINT_ID,
	},

	[OPEN_LIMIT_SWITCH_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BOX_TO_LIMIT_OPEN_ID,
		previousPointId: OPEN_JUNCTION_BOX_POINT_ID,
	},

	[OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: LIMIT_SWITCH_OPEN_ID,
		previousPointId: OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
	},

	[OPEN_TERMINAL_BLOCK_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
		previousPointId: OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
	},

	// NDI "не открыто" ветка
	[OPEN_NDI_NOT_OPEN_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_NDI_NOT_OPEN_ID,
		previousPointId: OPEN_TERMINAL_BLOCK_POINT_ID,
	},

	[OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: INSERT_NDI_NOT_OPEN_ID,
		previousPointId: OPEN_NDI_NOT_OPEN_INPUT_POINT_ID,
	},

	// Команда открыть с ПТК
	[OPEN_CMD_PTK_BRANCH_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_NDO_CMD_OPEN_PTK_ID,
		previousPointId: OPEN_TERMINAL_BLOCK_POINT_ID,
	},

	[OPEN_NDO_CMD_PTK_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: INSERT_NDO_CMD_OPEN_PTK_ID,
		previousPointId: OPEN_CMD_PTK_BRANCH_POINT_ID,
	},

	// Кнопка КРУЗА-П открыть
	[OPEN_BUTTON_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID,
		previousPointId: OPEN_TERMINAL_BLOCK_POINT_ID,
	},

	[OPEN_BUTTON_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: BUTTON_KRUZA_P_OPEN_ID,
		previousPointId: OPEN_BUTTON_INPUT_POINT_ID,
	},

	// Точка команд открыть (объединение путей от ПТК и кнопки)
	// Эта точка получает напряжение от двух параллельных путей:
	// 1. От вставки NDO команды ПТК через провод
	// 2. От кнопки КРУЗА-П через провод
	[COMANDS_OPEN_POINT_ID]: {
		type: 'merge',
		calculations: [
			{
				type: 'from_previous',
				elementId: WIRE_NDO_CMD_OPEN_PTK_TO_NEUTRAL_ID,
				previousPointId: OPEN_NDO_CMD_PTK_INPUT_POINT_ID,
			},
			{
				type: 'from_previous',
				elementId: WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
				previousPointId: OPEN_BUTTON_OUTPUT_POINT_ID,
			},
		],
	},

	[OPEN_INTERLOCK_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_INTERLOCK_OPEN_ID,
		previousPointId: COMANDS_OPEN_POINT_ID,
	},

	[OPEN_INTERLOCK_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: INTERLOCK_OPEN_ID,
		previousPointId: OPEN_INTERLOCK_INPUT_POINT_ID,
	},

	[OPEN_COIL_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID,
		previousPointId: OPEN_INTERLOCK_OUTPUT_POINT_ID,
	},

	// Катушка открыть - подключена к нейтрали
	// Напряжение на входе катушки рассчитывается относительно нейтрали
	// (через элемент COIL_OPEN_ID, который подключен к нейтрали)

	// Лампа закрыто
	[CLOSED_LAMP_BRANCH_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
		previousPointId: OPEN_TERMINAL_BLOCK_POINT_ID,
	},

	[CLOSED_LAMP_TO_NEUTRAL_POINT_ID]: {
		type: 'from_previous',
		elementId: LAMP_KRUZA_P_CLOSED_ID,
		previousPointId: CLOSED_LAMP_BRANCH_POINT_ID,
	},

	// Ветка ЗАКРЫТЬ
	[CLOSE_JUNCTION_BOX_POINT_ID]: {
		type: 'from_previous',
		elementId: JUMPER_BOX_TO_LIMIT_CLOSE_ID,
		previousPointId: CONTROL_BREAKER_OUTPUT_POINT_ID,
	},

	[CLOSE_LIMIT_SWITCH_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BOX_TO_LIMIT_CLOSE_ID,
		previousPointId: CLOSE_JUNCTION_BOX_POINT_ID,
	},

	[CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: LIMIT_SWITCH_CLOSE_ID,
		previousPointId: CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
	},

	[CLOSE_TERMINAL_BLOCK_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
		previousPointId: CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	},

	// NDI "не закрыто" ветка
	[CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_NDI_NOT_CLOSED_ID,
		previousPointId: CLOSE_TERMINAL_BLOCK_POINT_ID,
	},

	[CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: INSERT_NDI_NOT_CLOSED_ID,
		previousPointId: CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID,
	},

	// Команда закрыть с ПТК
	[CLOSE_CMD_PTK_BRANCH_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_NDO_CMD_CLOSE_PTK_ID,
		previousPointId: CLOSE_TERMINAL_BLOCK_POINT_ID,
	},

	[CLOSE_NDO_CMD_PTK_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: INSERT_NDO_CMD_CLOSE_PTK_ID,
		previousPointId: CLOSE_CMD_PTK_BRANCH_POINT_ID,
	},

	// Кнопка КРУЗА-П закрыть
	[CLOSE_BUTTON_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
		previousPointId: CLOSE_TERMINAL_BLOCK_POINT_ID,
	},

	[CLOSE_BUTTON_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: BUTTON_KRUZA_P_CLOSE_ID,
		previousPointId: CLOSE_BUTTON_INPUT_POINT_ID,
	},

	// Точка команд закрыть (объединение путей от ПТК и кнопки)
	// Эта точка получает напряжение от двух параллельных путей:
	// 1. От вставки NDO команды ПТК через провод
	// 2. От кнопки КРУЗА-П через провод
	[COMMANDS_CLOSE_POINT_ID]: {
		type: 'merge',
		calculations: [
			{
				type: 'from_previous',
				elementId: WIRE_NDO_CMD_CLOSE_PTK_TO_NEUTRAL_ID,
				previousPointId: CLOSE_NDO_CMD_PTK_INPUT_POINT_ID,
			},
			{
				type: 'from_previous',
				elementId: WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
				previousPointId: CLOSE_BUTTON_OUTPUT_POINT_ID,
			},
		],
	},

	[CLOSE_INTERLOCK_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_INTERLOCK_CLOSE_ID,
		previousPointId: COMMANDS_CLOSE_POINT_ID,
	},

	[CLOSE_INTERLOCK_OUTPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: INTERLOCK_CLOSE_ID,
		previousPointId: CLOSE_INTERLOCK_INPUT_POINT_ID,
	},

	[CLOSE_COIL_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID,
		previousPointId: CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	},

	// Лампа открыто
	[OPEN_LAMP_BRANCH_POINT_ID]: {
		type: 'from_previous',
		elementId: WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
		previousPointId: CLOSE_TERMINAL_BLOCK_POINT_ID,
	},

	[OPEN_LAMP_INPUT_POINT_ID]: {
		type: 'from_previous',
		elementId: LAMP_KRUZA_P_OPEN_ID,
		previousPointId: OPEN_LAMP_BRANCH_POINT_ID,
	},
};
