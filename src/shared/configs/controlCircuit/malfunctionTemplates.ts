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

export const POINT_MALFUNCTION_TEMPLATES: Record<
	string,
	{ kind: ElementKind; templates: MalfTpl[] }
> = {
	// ======================== Общая часть ========================
	[WIRE_POWER_TO_CONTROL_BREAKER_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[CONTROL_CIRCUIT_BREAKER_ID]: {
		kind: 'breaker',
		templates: [
			{ suffix: '.1', name: 'Плохой контакт на клемме, нет фазы' },
			{ suffix: '.2', name: 'Ложно выбивает' },
			{
				suffix: '.3',
				name: 'Механическая проблема, нет коммутации',
			},
		],
	},
	[WIRE_PHASE_AFTER_BREAKER_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// ======================== Ветка ОТКРЫТЬ (c.3.0.*) ========================
	[WIRE_BOX_TO_LIMIT_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[LIMIT_SWITCH_OPEN_ID]: {
		kind: 'limitSwitch',
		templates: [
			{ suffix: '.1', name: 'Залипший контакт' },
			{ suffix: '.2', name: 'Нет контакта' },
			{ suffix: '.3', name: 'Не настроен' },
		],
	},
	[WIRE_LIMIT_OPEN_TO_TERMINAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Вставка NDI (сигнал не открыто)
	[WIRE_BEFORE_NDI_NOT_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[INSERT_NDI_NOT_OPEN_ID]: {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, цепь не замыкается' },
			{ suffix: '.2', name: 'Ложно сработала, цепь не размыкается' },
		],
	},
	[WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Вставка NDI (команда открыть с ПТК)
	[WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[INSERT_NDI_CMD_OPEN_PTK_ID]: {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
			{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
		],
	},
	[WIRE_NDI_CMD_OPEN_PTK_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Блокировка и катушка (открытие)

	// Блокировка и катушка (открытие) - c.3.0.4.1.1.*
	[WIRE_BEFORE_INTERLOCK_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[INTERLOCK_CONTACT_OPEN_ID]: {
		kind: 'blockingContact',
		templates: [
			{ suffix: '.1', name: 'Нет контакта' },
			{ suffix: '.2', name: 'Ложно замкнутый контакт' },
		],
	},
	[WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[COIL_OPEN_ID]: {
		kind: 'coil',
		templates: [
			{
				suffix: '.1',
				name: 'Неисправна катушка, пускатель не подтягивается',
			},
		],
	},

	// Кнопка КРУЗА-П (открыть) - c.3.0.4.1.2.*
	[WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[BUTTON_KRUZA_P_OPEN_ID]: {
		kind: 'button',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
			{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
		],
	},
	[WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Лампа в КРУЗА-П (закрыто)
	[WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[LAMP_KRUZA_P_CLOSED_ID]: {
		kind: 'lamp',
		templates: [{ suffix: '.1', name: 'Перегорела' }],
	},
	[WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// ======================== Ветка ЗАКРЫТЬ (c.3.1.*) ========================
	[WIRE_BOX_TO_LIMIT_CLOSE_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[LIMIT_SWITCH_CLOSE_ID]: {
		kind: 'limitSwitch',
		templates: [
			{ suffix: '.1', name: 'Залипший контакт' },
			{ suffix: '.2', name: 'Нет контакта' },
			{ suffix: '.3', name: 'Не настроен' },
		],
	},
	[WIRE_LIMIT_CLOSE_TO_TERMINAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[WIRE_TERMINAL_TO_NDI_NOT_CLOSED_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Вставка NDI (сигнал не закрыто)
	[WIRE_BEFORE_NDI_NOT_CLOSED_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[INSERT_NDI_NOT_CLOSED_ID]: {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, цепь не замыкается' },
			{ suffix: '.2', name: 'Ложно сработала, цепь не размыкается' },
		],
	},
	[WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Вставка NDI (команда закрыть с ПТК)
	[WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[INSERT_NDI_CMD_CLOSE_PTK_ID]: {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
			{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
		],
	},
	[WIRE_NDI_CMD_CLOSE_PTK_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Блокировка и катушка (закрытие)

	// Блокировка и катушка (закрытие) - c.3.1.4.1.1.*
	[WIRE_BEFORE_INTERLOCK_CLOSE_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[INTERLOCK_CONTACT_CLOSE_ID]: {
		kind: 'blockingContact',
		templates: [
			{ suffix: '.1', name: 'Нет контакта' },
			{ suffix: '.2', name: 'Ложно замкнутый контакт' },
		],
	},
	[WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[COIL_CLOSE_ID]: {
		kind: 'coil',
		templates: [
			{
				suffix: '.1',
				name: 'Неисправна катушка, пускатель не подтягивается',
			},
		],
	},

	// Кнопка КРУЗА-П (закрыть) - c.3.1.4.1.2.*
	[WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[BUTTON_KRUZA_P_CLOSE_ID]: {
		kind: 'button',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
			{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
		],
	},
	[WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Лампа в КРУЗА-П (открыто)
	[WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	[LAMP_KRUZA_P_OPEN_ID]: {
		kind: 'lamp',
		templates: [{ suffix: '.1', name: 'Перегорела' }],
	},
	[WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
};



