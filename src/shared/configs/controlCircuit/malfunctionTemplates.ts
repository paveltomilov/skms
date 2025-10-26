/**
 * Шаблоны неисправностей для элементов схемы управления.
 * Каждый элемент имеет тип (kind) и набор шаблонов неисправностей.
 */

import { ElementKind } from '../../types/scheme';

type MalfTpl = { suffix: string; name: string };

export const POINT_MALFUNCTION_TEMPLATES: Record<
	string,
	{ kind: ElementKind; templates: MalfTpl[] }
> = {
	// ======================== Общая часть ========================
	'c.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.1': {
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
	'c.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// ======================== Ветка ОТКРЫТЬ (c.3.1.*) ========================
	'c.3.1.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.1.1': {
		kind: 'limitSwitch',
		templates: [
			{ suffix: '.1', name: 'Залипший контакт' },
			{ suffix: '.2', name: 'Нет контакта' },
			{ suffix: '.3', name: 'Не настроен' },
		],
	},
	'c.3.1.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.1.3': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Вставка NDI (сигнал не открыто)
	'c.3.1.4.0.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.1.4.0.1': {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, цепь не замыкается' },
			{ suffix: '.2', name: 'Ложно сработала, цепь не размыкается' },
		],
	},
	'c.3.1.4.0.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Вставка NDI (команда открыть с ПТК)
	'c.3.1.4.1.0.0.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.1.4.1.0.0.1': {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
			{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
		],
	},
	'c.3.1.4.1.0.0.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Блокировка и катушка (открытие)

	// Блокировка и катушка (открытие) - c.3.1.4.1.1.*
	'c.3.1.4.1.1.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.1.4.1.1.1': {
		kind: 'blockingContact',
		templates: [
			{ suffix: '.1', name: 'Нет контакта' },
			{ suffix: '.2', name: 'Ложно замкнутый контакт' },
		],
	},
	'c.3.1.4.1.1.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.1.4.1.1.4': {
		kind: 'coil',
		templates: [
			{
				suffix: '.1',
				name: 'Неисправна катушка, пускатель не подтягивается',
			},
		],
	},

	// Кнопка КРУЗА-П (открыть) - c.3.1.4.1.2.*
	'c.3.1.4.1.2.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.1.4.1.2.1': {
		kind: 'button',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
			{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
		],
	},
	'c.3.1.4.1.2.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Лампа в КРУЗА-П (закрыто)
	'c.3.1.4.2.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.1.4.2.1': {
		kind: 'lamp',
		templates: [{ suffix: '.1', name: 'Перегорела' }],
	},
	'c.3.1.4.2.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// ======================== Ветка ЗАКРЫТЬ (c.3.2.*) ========================
	'c.3.2.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.2.1': {
		kind: 'limitSwitch',
		templates: [
			{ suffix: '.1', name: 'Залипший контакт' },
			{ suffix: '.2', name: 'Нет контакта' },
			{ suffix: '.3', name: 'Не настроен' },
		],
	},
	'c.3.2.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.2.3': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Вставка NDI (сигнал не закрыто)
	'c.3.2.4.0.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.2.4.0.1': {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, цепь не замыкается' },
			{ suffix: '.2', name: 'Ложно сработала, цепь не размыкается' },
		],
	},
	'c.3.2.4.0.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Вставка NDI (команда закрыть с ПТК)
	'c.3.2.4.1.0.0.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.2.4.1.0.0.1': {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
			{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
		],
	},
	'c.3.2.4.1.0.0.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Блокировка и катушка (закрытие)

	// Блокировка и катушка (закрытие) - c.3.2.4.1.1.*
	'c.3.2.4.1.1.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.2.4.1.1.1': {
		kind: 'blockingContact',
		templates: [
			{ suffix: '.1', name: 'Нет контакта' },
			{ suffix: '.2', name: 'Ложно замкнутый контакт' },
		],
	},
	'c.3.2.4.1.1.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ на землю' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.2.4.1.1.4': {
		kind: 'coil',
		templates: [
			{
				suffix: '.1',
				name: 'Неисправна катушка, пускатель не подтягивается',
			},
		],
	},

	// Кнопка КРУЗА-П (закрыть) - c.3.2.4.1.2.*
	'c.3.2.4.1.2.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.2.4.1.2.1': {
		kind: 'button',
		templates: [
			{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
			{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
		],
	},
	'c.3.2.4.1.2.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},

	// Лампа в КРУЗА-П (открыто)
	'c.3.2.4.2.0': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
	'c.3.2.4.2.1': {
		kind: 'lamp',
		templates: [{ suffix: '.1', name: 'Перегорела' }],
	},
	'c.3.2.4.2.2': {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'Обрыв провода' },
			{ suffix: '.2', name: 'КЗ' },
			{ suffix: '.3', name: 'КЗ с соседним проводом' },
		],
	},
};
