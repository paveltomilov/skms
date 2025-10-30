/**
 * Элементы схемы управления (controlCircuit).
 * Каждая переменная содержит полный объект элемента с id, name, resistance и malfunctions.
 * Структура аналогична powerCircuit.
 */

import { CircuitElement } from '../../types/scheme';
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
} from '../../constants';

// ======================== Общая часть (c.0, c.1, c.2) ========================

export const provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya: CircuitElement =
	{
		id: WIRE_POWER_TO_CONTROL_BREAKER_ID,
		name: 'Провод от силовой части схемы к автомату питания управления',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.0',
		endPoint: 'p.c.1',
		malfunctions: [
			{ id: 'c.0.1', name: 'Обрыв провода', active: false },
			{ id: 'c.0.2', name: 'Короткое замыкание на землю', active: false },
			{
				id: 'c.0.3',
				name: 'Короткое замыкание с соседним проводом',
				active: false,
			},
		],
	};

export const avtomatPitaniyaSkhemyUpravleniya: CircuitElement = {
	id: CONTROL_CIRCUIT_BREAKER_ID,
	name: 'Автомат питания цепей управления',
	resistance: 0,
	kind: 'breaker',
	startPoint: 'p.c.1',
	endPoint: 'p.c.2',
	malfunctions: [
		{
			id: 'c.1.1',
			name: 'Плохой контакт на клемме, нет фазы',
			active: false,
		},
		{ id: 'c.1.2', name: 'Ложно выбивает', active: false },
		{
			id: 'c.1.3',
			name: 'Собирается механически, но нет коммутации',
			active: false,
		},
	],
};

export const provodFazyPosleAvtomata: CircuitElement = {
	id: WIRE_PHASE_AFTER_BREAKER_ID,
	name: 'Провод фазы после автомата',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.2',
	endPoint: 'p.c.3',
	malfunctions: [
		{ id: 'c.2.1', name: 'Обрыв провода', active: false },
		{ id: 'c.2.2', name: 'Короткое замыкание на землю', active: false },
		{
			id: 'c.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

// ======================== Ветка ОТКРЫТЬ (c.3.0.*) ========================

// Провод от соединительной коробки до концевого выключателя открыто
export const provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto: CircuitElement =
	{
		id: WIRE_BOX_TO_LIMIT_OPEN_ID,
		name: 'Провод от соединительной коробки до концевого выключателя открыто',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.3.0.0',
		endPoint: 'p.c.3.0.1',
		malfunctions: [
			{ id: 'c.3.0.0.1', name: 'Обрыв провода', active: false },
			{
				id: 'c.3.0.0.2',
				name: 'Короткое замыкание на землю',
				active: false,
			},
			{
				id: 'c.3.0.0.3',
				name: 'Короткое замыкание с соседним проводом',
				active: false,
			},
		],
	};

export const kontsevojVyklyuchatelOtkryto: CircuitElement = {
	id: LIMIT_SWITCH_OPEN_ID,
	name: 'Концевой выключатель открыто',
	resistance: 0,
	kind: 'limitSwitch',
	startPoint: 'p.c.3.0.1',
	endPoint: 'p.c.3.0.2',
	malfunctions: [
		{ id: 'c.3.0.1.1', name: 'Залипший контакт', active: false },
		{ id: 'c.3.0.1.2', name: 'Нет контакта', active: false },
		{ id: 'c.3.0.1.3', name: 'Не настроен', active: false },
	],
};

// Провод от концевого выключателя до клеммника
export const provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZAP2: CircuitElement =
	{
		id: WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
		name: 'Провод от концевого выключателя открыто до клеммника',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.3.0.2',
		endPoint: 'p.c.3.0.3',
		malfunctions: [
			{ id: 'c.3.0.2.1', name: 'Обрыв провода', active: false },
			{
				id: 'c.3.0.2.2',
				name: 'Короткое замыкание на землю',
				active: false,
			},
			{
				id: 'c.3.0.2.3',
				name: 'Короткое замыкание с соседним проводом',
				active: false,
			},
		],
	};

// Провод от клеммника до вставки NDI (сигнал не открыто)
export const provodOtKlemmikaDoVstavkiNDI_signalNeOtkryto: CircuitElement = {
	id: WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID,
	name: 'Провод от клеммника до вставки NDI (сигнал не открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.3',
	endPoint: 'p.c.3.0.4',
	malfunctions: [
		{ id: 'c.3.0.3.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.0.3.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.0.3.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

// Вставка NDI (сигнал не открыто)
export const vstavkaNDI_signalNeOtkryto: CircuitElement = {
	id: WIRE_BEFORE_NDI_NOT_OPEN_ID,
	name: 'Провод перед вставкой NDI (сигнал не открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4',
	endPoint: 'p.c.3.0.4.0.0',
	malfunctions: [
		{ id: 'c.3.0.4.0.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.0.4.0.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.0.4.0.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const vstavkaNDI_signalNeOtkryto_element: CircuitElement = {
	id: INSERT_NDI_NOT_OPEN_ID,
	name: 'Вставка NDI (сигнал «не открыто»)',
	resistance: 0,
	kind: 'insert',
	startPoint: 'p.c.3.0.4.0.0',
	endPoint: 'p.c.3.0.4.0.1',
	malfunctions: [
		{
			id: 'c.3.0.4.0.1.1',
			name: 'Нет контакта, цепь не замыкается',
			active: false,
		},
		{
			id: 'c.3.0.4.0.1.2',
			name: 'Ложно сработала, цепь не размыкается',
			active: false,
		},
	],
};

export const provodOtVstavkiNDI_signalNeOtkrytoDoNejtrali: CircuitElement = {
	id: WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID,
	name: 'Провод от вставки NDI (сигнал не открыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.0.1',
	endPoint: 'p.c.n',
	malfunctions: [
		{ id: 'c.3.0.4.0.2.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.0.4.0.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.0.4.0.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

// Провода и элементы для команды с ПТК (c.3.0.4.1.0.0.*)
export const provodPeredVstavkojNDI_komandaOtkrytSPTK: CircuitElement = {
	id: WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID,
	name: 'Провод перед вставкой NDI (команда открыть с ПТК)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.0.0.0',
	endPoint: 'p.c.3.0.4.1.0.0.1',
	malfunctions: [
		{ id: 'c.3.0.4.1.0.0.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.0.4.1.0.0.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.0.4.1.0.0.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const vstavkaNDI_komandaOtkrytSPTK: CircuitElement = {
	id: INSERT_NDI_CMD_OPEN_PTK_ID,
	name: 'Вставка NDI (команда открыть с ПТК)',
	resistance: 0,
	kind: 'insert',
	startPoint: 'p.c.3.0.4.1.0.0.1',
	endPoint: 'p.c.3.0.4.1.0.0.2',
	malfunctions: [
		{
			id: 'c.3.0.4.1.0.0.1.1',
			name: 'Нет контакта, команда не уходит',
			active: false,
		},
		{
			id: 'c.3.0.4.1.0.0.1.2',
			name: 'Ложно сработала, команда постоянно висит',
			active: false,
		},
	],
};

export const provodOtVstavkiNDI_komandaOtkrytSPTKDoNejtrali: CircuitElement = {
	id: WIRE_NDI_CMD_OPEN_PTK_TO_NEUTRAL_ID,
	name: 'Провод от вставки NDI (команда открыть с ПТК) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.0.0.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.0.4.1.0.0.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.0.4.1.0.0.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.0.4.1.0.0.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

// Блокировка и катушка (c.3.0.4.1.0.1.*)
export const provodPeredBlokirovkojOtkrytie: CircuitElement = {
	id: WIRE_BEFORE_INTERLOCK_OPEN_ID,
	name: 'Провод перед блокировкой (открытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.0.1.0',
	endPoint: 'p.c.3.0.4.1.0.1.1',
	malfunctions: [
		{ id: 'c.3.0.4.1.1.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.0.4.1.1.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.0.4.1.1.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const blokirovkaVklyucheniaPuskatelyaNaOtkrytie: CircuitElement = {
	id: INTERLOCK_CONTACT_OPEN_ID,
	name: 'Блокировка включения пускателя на открытие',
	resistance: 0,
	kind: 'blockingContact',
	startPoint: 'p.c.3.0.4.1.0.1.1',
	endPoint: 'p.c.3.0.4.1.0.1.2',
	malfunctions: [
		{ id: 'c.3.0.4.1.1.1.1', name: 'Нет контакта', active: false },
		{
			id: 'c.3.0.4.1.1.1.2',
			name: 'Ложно замкнутый контакт',
			active: false,
		},
	],
};

export const provodOtBlokirovkiDoKatushkiOtkrytie: CircuitElement = {
	id: WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID,
	name: 'Провод от блокировки до катушки (открытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.0.1.2',
	endPoint: 'p.c.3.0.4.1.0.1.3',
	malfunctions: [
		{ id: 'c.3.0.4.1.1.2.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.0.4.1.1.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.0.4.1.1.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const katushkaPuskatelyaOtkryt: CircuitElement = {
	id: COIL_OPEN_ID,
	name: 'Катушка пускателя открыть',
	resistance: 6400,
	kind: 'coil',
	startPoint: 'p.c.3.0.4.1.0.1.3',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.0.4.1.1.4.1',
			name: 'Неисправна катушка, пускатель не подтягивается',
			active: false,
		},
	],
};

// Кнопка КРУЗА-П (c.3.0.4.1.0.1.*)
export const provodPeredKnopkojKRUZAP_komandaOtkryt: CircuitElement = {
	id: WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID,
	name: 'Провод перед кнопкой КРУЗА-П (открыть)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.2.0',
	endPoint: 'p.c.3.0.4.1.2.1',
	malfunctions: [
		{ id: 'c.3.0.4.1.2.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.0.4.1.2.0.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.0.4.1.2.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const knopkaKRUZAP_komandaOtkryt: CircuitElement = {
	id: BUTTON_KRUZA_P_OPEN_ID,
	name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
	resistance: 0,
	kind: 'button',
	startPoint: 'p.c.3.0.4.1.2.1',
	endPoint: 'p.c.3.0.4.1.2.2',
	malfunctions: [
		{
			id: 'c.3.0.4.1.2.1.1',
			name: 'Нет контакта, команда не уходит',
			active: false,
		},
		{
			id: 'c.3.0.4.1.2.1.2',
			name: 'Ложно сработала, команда постоянно висит',
			active: false,
		},
	],
};

export const provodOtKnopkiKRUZAP_komandaOtkrytDoNejtrali: CircuitElement = {
	id: WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	name: 'Провод от кнопки КРУЗА-П (открыть) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.2.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.0.4.1.2.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.0.4.1.2.2.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.0.4.1.2.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

// Лампа в КРУЗА-П (закрыто) - c.3.0.4.2.*
export const provodPeredLampojVKRUZAP_zakryto: CircuitElement = {
	id: WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
	name: 'Провод перед лампой в КРУЗА-П (закрыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.2.0',
	endPoint: 'p.c.3.0.4.2.1',
	malfunctions: [
		{ id: 'c.3.0.4.2.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.0.4.2.0.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.0.4.2.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const lampaVKRUZAP_zakryto: CircuitElement = {
	id: LAMP_KRUZA_P_CLOSED_ID,
	name: 'Лампа в КРУЗА-П закрыто',
	resistance: 4800,
	kind: 'lamp',
	startPoint: 'p.c.3.0.4.2.1',
	endPoint: 'p.c.3.0.4.2.2',
	malfunctions: [{ id: 'c.3.0.4.2.1.1', name: 'Перегорела', active: false }],
};

export const provodOtLampyVKRUZAP_zakrytoDoNejtrali: CircuitElement = {
	id: WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID,
	name: 'Провод от лампы в КРУЗА-П (закрыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.2.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.0.4.2.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.0.4.2.2.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.0.4.2.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

// ======================== Ветка ЗАКРЫТЬ (c.3.1.*) ========================

// Аналогичная структура для ветки закрыть
export const provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto: CircuitElement =
	{
		id: WIRE_BOX_TO_LIMIT_CLOSE_ID,
		name: 'Провод от соединительной коробки до концевого выключателя закрыто',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.3.1.0',
		endPoint: 'p.c.3.1.1',
		malfunctions: [
			{ id: 'c.3.1.0.1', name: 'Обрыв провода', active: false },
			{
				id: 'c.3.1.0.2',
				name: 'Короткое замыкание на землю',
				active: false,
			},
			{
				id: 'c.3.1.0.3',
				name: 'Короткое замыкание с соседним проводом',
				active: false,
			},
		],
	};

export const kontsevojVyklyuchatelZakryto: CircuitElement = {
	id: LIMIT_SWITCH_CLOSE_ID,
	name: 'Концевой выключатель закрыто',
	resistance: 0,
	kind: 'limitSwitch',
	startPoint: 'p.c.3.1.1',
	endPoint: 'p.c.3.1.2',
	malfunctions: [
		{ id: 'c.3.1.1.1', name: 'Залипший контакт', active: false },
		{ id: 'c.3.1.1.2', name: 'Нет контакта', active: false },
		{ id: 'c.3.1.1.3', name: 'Не настроен', active: false },
	],
};

export const provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP2: CircuitElement =
	{
		id: WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
		name: 'Провод от концевого выключателя закрыто до клеммника',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.3.1.2',
		endPoint: 'p.c.3.1.3',
		malfunctions: [
			{ id: 'c.3.1.2.1', name: 'Обрыв провода', active: false },
			{
				id: 'c.3.1.2.2',
				name: 'Короткое замыкание на землю',
				active: false,
			},
			{
				id: 'c.3.1.2.3',
				name: 'Короткое замыкание с соседним проводом',
				active: false,
			},
		],
	};

export const provodOtKlemmikaDoVstavkiNDI_signalNeZakryto: CircuitElement = {
	id: WIRE_TERMINAL_TO_NDI_NOT_CLOSED_ID,
	name: 'Провод от клеммника до вставки NDI (сигнал не закрыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.3',
	endPoint: 'p.c.3.1.4',
	malfunctions: [
		{ id: 'c.3.1.3.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.1.3.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.1.3.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const provodPeredVstavkojNDI_signalNeZakryto: CircuitElement = {
	id: WIRE_BEFORE_NDI_NOT_CLOSED_ID,
	name: 'Провод перед вставкой NDI (сигнал не закрыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.0.0',
	endPoint: 'p.c.3.1.4.0.1',
	malfunctions: [
		{ id: 'c.3.1.4.0.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.1.4.0.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.1.4.0.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const vstavkaNDI_signalNeZakryto: CircuitElement = {
	id: INSERT_NDI_NOT_CLOSED_ID,
	name: 'Вставка NDI (сигнал «не закрыто»)',
	resistance: 0,
	kind: 'insert',
	startPoint: 'p.c.3.1.4.0.1',
	endPoint: 'p.c.3.1.4.0.2',
	malfunctions: [
		{
			id: 'c.3.1.4.0.1.1',
			name: 'Нет контакта, цепь не замыкается',
			active: false,
		},
		{
			id: 'c.3.1.4.0.1.2',
			name: 'Ложно сработала, цепь не размыкается',
			active: false,
		},
	],
};

export const provodOtVstavkiNDI_signalNeZakrytoDoNejtrali: CircuitElement = {
	id: WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID,
	name: 'Провод от вставки NDI (сигнал не закрыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.0.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{ id: 'c.3.1.4.0.2.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.1.4.0.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.1.4.0.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const provodPeredVstavkojNDI_komandaZakrytSPTK: CircuitElement = {
	id: WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID,
	name: 'Провод перед вставкой NDI (команда закрыть с ПТК)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.0.0.0',
	endPoint: 'p.c.3.1.4.1.0.0.1',
	malfunctions: [
		{
			id: 'c.3.1.4.1.0.0.0.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.1.4.1.0.0.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.1.4.1.0.0.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const vstavkaNDI_komandaZakrytSPTK: CircuitElement = {
	id: INSERT_NDI_CMD_CLOSE_PTK_ID,
	name: 'Вставка NDI (команда закрыть с ПТК)',
	resistance: 0,
	kind: 'insert',
	startPoint: 'p.c.3.1.4.1.0.0.1',
	endPoint: 'p.c.3.1.4.1.0.0.2',
	malfunctions: [
		{
			id: 'c.3.1.4.1.0.0.1.1',
			name: 'Нет контакта, команда не уходит',
			active: false,
		},
		{
			id: 'c.3.1.4.1.0.0.1.2',
			name: 'Ложно сработала, команда постоянно висит',
			active: false,
		},
	],
};

export const provodOtVstavkiNDI_komandaZakrytSPTKDoNejtrali: CircuitElement = {
	id: WIRE_NDI_CMD_CLOSE_PTK_TO_NEUTRAL_ID,
	name: 'Провод от вставки NDI (команда закрыть с ПТК) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.0.0.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.1.4.1.0.0.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.1.4.1.0.0.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.1.4.1.0.0.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const provodPeredBlokirovkojZakrytie: CircuitElement = {
	id: WIRE_BEFORE_INTERLOCK_CLOSE_ID,
	name: 'Провод перед блокировкой (закрытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.0.1.0',
	endPoint: 'p.c.3.1.4.1.0.1.1',
	malfunctions: [
		{ id: 'c.3.1.4.1.1.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.1.4.1.1.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.1.4.1.1.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const blokirovkaVklyucheniaPuskatelyaNaZakrytie: CircuitElement = {
	id: INTERLOCK_CONTACT_CLOSE_ID,
	name: 'Блокировка включения пускателя на закрыть',
	resistance: 0,
	kind: 'blockingContact',
	startPoint: 'p.c.3.1.4.1.0.1.1',
	endPoint: 'p.c.3.1.4.1.0.1.2',
	malfunctions: [
		{ id: 'c.3.1.4.1.1.1.1', name: 'Нет контакта', active: false },
		{
			id: 'c.3.1.4.1.1.1.2',
			name: 'Ложно замкнутый контакт',
			active: false,
		},
	],
};

export const provodOtBlokirovkiDoKatushkiZakrytie: CircuitElement = {
	id: WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID,
	name: 'Провод от блокировки до катушки (закрытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.0.1.2',
	endPoint: 'p.c.3.1.4.1.0.1.3',
	malfunctions: [
		{ id: 'c.3.1.4.1.1.2.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.1.4.1.1.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.1.4.1.1.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const katushkaPuskatelyaZakryt: CircuitElement = {
	id: COIL_CLOSE_ID,
	name: 'Катушка пускателя закрыть',
	resistance: 6400,
	kind: 'coil',
	startPoint: 'p.c.3.1.4.1.0.1.3',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.1.4.1.1.4.1',
			name: 'Неисправна катушка, пускатель не подтягивается',
			active: false,
		},
	],
};

export const provodPeredKnopkojKRUZAP_komandaZakryt: CircuitElement = {
	id: WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
	name: 'Провод перед кнопкой КРУЗА-П (закрыть)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.2.0',
	endPoint: 'p.c.3.1.4.1.2.1',
	malfunctions: [
		{ id: 'c.3.1.4.1.2.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.1.4.1.2.0.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.1.4.1.2.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const knopkaKRUZAP_komandaZakryt: CircuitElement = {
	id: BUTTON_KRUZA_P_CLOSE_ID,
	name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
	resistance: 0,
	kind: 'button',
	startPoint: 'p.c.3.1.4.1.2.1',
	endPoint: 'p.c.3.1.4.1.2.2',
	malfunctions: [
		{
			id: 'c.3.1.4.1.2.1.1',
			name: 'Нет контакта, команда не уходит',
			active: false,
		},
		{
			id: 'c.3.1.4.1.2.1.2',
			name: 'Ложно сработала, команда постоянно висит',
			active: false,
		},
	],
};

export const provodOtKnopkiKRUZAP_komandaZakrytDoNejtrali: CircuitElement = {
	id: WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
	name: 'Провод от кнопки КРУЗА-П (закрыть) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.2.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.1.4.1.2.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.1.4.1.2.2.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.1.4.1.2.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const provodPeredLampojVKRUZAP_otkryto: CircuitElement = {
	id: WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
	name: 'Провод перед лампой в КРУЗА-П (открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.2.0',
	endPoint: 'p.c.3.1.4.2.1',
	malfunctions: [
		{ id: 'c.3.1.4.2.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.1.4.2.0.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.1.4.2.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const lampaVKRUZAP_otkryto: CircuitElement = {
	id: LAMP_KRUZA_P_OPEN_ID,
	name: 'Лампа в КРУЗА-П открыто',
	resistance: 4800,
	kind: 'lamp',
	startPoint: 'p.c.3.1.4.2.1',
	endPoint: 'p.c.3.1.4.2.2',
	malfunctions: [{ id: 'c.3.1.4.2.1.1', name: 'Перегорела', active: false }],
};

export const provodOtLampyVKRUZAP_otkrytoDoNejtrali: CircuitElement = {
	id: WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	name: 'Провод от лампы в КРУЗА-П (открыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.2.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.1.4.2.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.1.4.2.2.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.1.4.2.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

