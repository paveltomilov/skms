/**
 * Шаблоны неисправностей для элементов схемы управления.
 * Каждый элемент имеет тип (kind) и набор шаблонов неисправностей.
 */

import { ElementKind } from '../../types/scheme';
import {
	BUTTON_KRUZA_P_CLOSE_ID,
	BUTTON_KRUZA_P_OPEN_ID,
	COIL_CLOSE_ID,
	COIL_OPEN_ID,
	CONTROL_CIRCUIT_BREAKER_ID,
	INSERT_NDI_CMD_CLOSE_PTK_ID,
	INSERT_NDI_CMD_OPEN_PTK_ID,
	INSERT_NDI_NOT_CLOSED_ID,
	INSERT_NDI_NOT_OPEN_ID,
	INTERLOCK_CONTACT_CLOSE_ID,
	INTERLOCK_CONTACT_OPEN_ID,
	LAMP_KRUZA_P_CLOSED_ID,
	LAMP_KRUZA_P_OPEN_ID,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID,
	WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID,
	WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
	WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID,
	WIRE_BEFORE_INTERLOCK_CLOSE_ID,
	WIRE_BEFORE_INTERLOCK_OPEN_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
	WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID,
	WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID,
	WIRE_BEFORE_NDI_NOT_CLOSED_ID,
	WIRE_BEFORE_NDI_NOT_OPEN_ID,
	WIRE_BOX_TO_LIMIT_CLOSE_ID,
	WIRE_BOX_TO_LIMIT_OPEN_ID,
	WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
	WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID,
	WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	WIRE_NDI_CMD_CLOSE_PTK_TO_NEUTRAL_ID,
	WIRE_NDI_CMD_OPEN_PTK_TO_NEUTRAL_ID,
	WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID,
	WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID,
	WIRE_PHASE_AFTER_BREAKER_ID,
	WIRE_POWER_TO_CONTROL_BREAKER_ID,
	WIRE_TERMINAL_TO_NDI_NOT_CLOSED_ID,
	WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID,
} from '@/shared/constants';

type MalfTpl = { suffix: string; name: string };

// ======================== Базовые шаблоны (константы) ========================
// Провода: детализированный КЗ «на землю»
export const MALF_TPL_WIRE_GROUND: MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв провода' },
	{ suffix: '.2', name: 'КЗ на землю' },
	{ suffix: '.3', name: 'КЗ с соседним проводом' },
];

// Провода: краткое обозначение КЗ
export const MALF_TPL_WIRE_SHORT: MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв провода' },
	{ suffix: '.2', name: 'КЗ' },
	{ suffix: '.3', name: 'КЗ с соседним проводом' },
];

// Провода: полная формулировка КЗ (без уточнения "на землю")
export const MALF_TPL_WIRE_FULL: MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв провода' },
	{ suffix: '.2', name: 'Короткое замыкание' },
	{ suffix: '.3', name: 'Короткое замыкание с соседним проводом' },
];

// Провода: полная формулировка с уточнением "на землю"
export const MALF_TPL_WIRE_GROUND_FULL: MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв провода' },
	{ suffix: '.2', name: 'Короткое замыкание на землю' },
	{ suffix: '.3', name: 'Короткое замыкание с соседним проводом' },
];

// Кнопки: командные контакты
export const MALF_TPL_BUTTON_CMD: MalfTpl[] = [
	{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
	{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
];

// Вставки NDI: сигнальные контакты
export const MALF_TPL_INSERT_SIGNAL: MalfTpl[] = [
	{ suffix: '.1', name: 'Нет контакта, цепь не замыкается' },
	{ suffix: '.2', name: 'Ложно сработала, цепь не размыкается' },
];

// Концевые выключатели
export const MALF_TPL_LIMIT_SWITCH: MalfTpl[] = [
	{ suffix: '.1', name: 'Залипший контакт' },
	{ suffix: '.2', name: 'Нет контакта' },
	{ suffix: '.3', name: 'Не настроен' },
];

// Блокировочные контакты (межблокировка)
export const MALF_TPL_BLOCKING_CONTACT: MalfTpl[] = [
	{ suffix: '.1', name: 'Нет контакта' },
	{ suffix: '.2', name: 'Ложно замкнутый контакт' },
];

// Автомат
export const MALF_TPL_BREAKER: MalfTpl[] = [
	{ suffix: '.1', name: 'Плохой контакт на клемме, нет фазы' },
	{ suffix: '.2', name: 'Ложно выбивает' },
	{ suffix: '.3', name: 'Механическая проблема, нет коммутации' },
];

// Катушка пускателя
export const MALF_TPL_COIL: MalfTpl[] = [
	{ suffix: '.1', name: 'Неисправна катушка, пускатель не подтягивается' },
];

// Лампа
export const MALF_TPL_LAMP: MalfTpl[] = [{ suffix: '.1', name: 'Перегорела' }];

// Генератор массива неисправностей на основе базового id и шаблонов
export function buildMalfunctions(
	baseId: string,
	templates: MalfTpl[],
	activeSuffixes?: string[], // Опционально: список суффиксов, которые должны быть активны
) {
	return templates.map(t => ({
		id: `${baseId}${t.suffix}`,
		name: t.name,
		active: activeSuffixes ? activeSuffixes.includes(t.suffix) : false,
	}));
}

export const POINT_MALFUNCTION_TEMPLATES: Record<
	string,
	{ kind: ElementKind; templates: MalfTpl[] }
> = {
	// ======================== Общая часть ========================
	[WIRE_POWER_TO_CONTROL_BREAKER_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[CONTROL_CIRCUIT_BREAKER_ID]: {
		kind: 'breaker',
		templates: MALF_TPL_BREAKER,
	},
	[WIRE_PHASE_AFTER_BREAKER_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},

	// ======================== Ветка ОТКРЫТЬ (c.3.0.*) ========================
	[WIRE_BOX_TO_LIMIT_OPEN_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[LIMIT_SWITCH_OPEN_ID]: {
		kind: 'limitSwitch',
		templates: MALF_TPL_LIMIT_SWITCH,
	},
	[WIRE_LIMIT_OPEN_TO_TERMINAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},

	// Вставка NDI (сигнал не открыто)
	[WIRE_BEFORE_NDI_NOT_OPEN_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[INSERT_NDI_NOT_OPEN_ID]: {
		kind: 'insert',
		templates: MALF_TPL_INSERT_SIGNAL,
	},
	[WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},

	// Вставка NDI (команда открыть с ПТК)
	[WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[INSERT_NDI_CMD_OPEN_PTK_ID]: {
		kind: 'insert',
		templates: MALF_TPL_BUTTON_CMD,
	},
	[WIRE_NDI_CMD_OPEN_PTK_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},

	// Блокировка и катушка (открытие)

	// Блокировка и катушка (открытие) - c.3.0.4.1.1.*
	[WIRE_BEFORE_INTERLOCK_OPEN_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[INTERLOCK_CONTACT_OPEN_ID]: {
		kind: 'blockingContact',
		templates: MALF_TPL_BLOCKING_CONTACT,
	},
	[WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[COIL_OPEN_ID]: {
		kind: 'coil',
		templates: MALF_TPL_COIL,
	},

	// Кнопка КРУЗА-П (открыть) - c.3.0.4.1.2.*
	[WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_SHORT,
	},
	[BUTTON_KRUZA_P_OPEN_ID]: {
		kind: 'button',
		templates: MALF_TPL_BUTTON_CMD,
	},
	[WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_SHORT,
	},

	// Лампа в КРУЗА-П (закрыто)
	[WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_SHORT,
	},
	[LAMP_KRUZA_P_CLOSED_ID]: {
		kind: 'lamp',
		templates: MALF_TPL_LAMP,
	},
	[WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_SHORT,
	},

	// ======================== Ветка ЗАКРЫТЬ (c.3.1.*) ========================
	[WIRE_BOX_TO_LIMIT_CLOSE_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[LIMIT_SWITCH_CLOSE_ID]: {
		kind: 'limitSwitch',
		templates: MALF_TPL_LIMIT_SWITCH,
	},
	[WIRE_LIMIT_CLOSE_TO_TERMINAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[WIRE_TERMINAL_TO_NDI_NOT_CLOSED_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},

	// Вставка NDI (сигнал не закрыто)
	[WIRE_BEFORE_NDI_NOT_CLOSED_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[INSERT_NDI_NOT_CLOSED_ID]: {
		kind: 'insert',
		templates: MALF_TPL_INSERT_SIGNAL,
	},
	[WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},

	// Вставка NDI (команда закрыть с ПТК)
	[WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[INSERT_NDI_CMD_CLOSE_PTK_ID]: {
		kind: 'insert',
		templates: MALF_TPL_BUTTON_CMD,
	},
	[WIRE_NDI_CMD_CLOSE_PTK_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},

	// Блокировка и катушка (закрытие)

	// Блокировка и катушка (закрытие) - c.3.1.4.1.1.*
	[WIRE_BEFORE_INTERLOCK_CLOSE_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[INTERLOCK_CONTACT_CLOSE_ID]: {
		kind: 'blockingContact',
		templates: MALF_TPL_BLOCKING_CONTACT,
	},
	[WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_GROUND,
	},
	[COIL_CLOSE_ID]: {
		kind: 'coil',
		templates: MALF_TPL_COIL,
	},

	// Кнопка КРУЗА-П (закрыть) - c.3.1.4.1.2.*
	[WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_SHORT,
	},
	[BUTTON_KRUZA_P_CLOSE_ID]: {
		kind: 'button',
		templates: MALF_TPL_BUTTON_CMD,
	},
	[WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_SHORT,
	},

	// Лампа в КРУЗА-П (открыто)
	[WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_SHORT,
	},
	[LAMP_KRUZA_P_OPEN_ID]: {
		kind: 'lamp',
		templates: MALF_TPL_LAMP,
	},
	[WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: MALF_TPL_WIRE_SHORT,
	},
};
