/**
 * Элементы схемы управления (controlCircuit).
 * Каждая переменная содержит полный объект элемента с id, name, resistance и malfunctions.
 * Структура аналогична powerCircuit.
 */

import { CircuitElement } from '../../types/scheme';

// Определяем константы локально, чтобы избежать циклической зависимости
const LIMIT_SWITCH_OPEN_ID = 'c.3.1.1';
const LIMIT_SWITCH_CLOSE_ID = 'c.3.2.1';
const CONTROL_CIRCUIT_BREAKER_ID = 'c.1';

// ======================== Общая часть (c.0, c.1, c.2) ========================

export const provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya: CircuitElement =
	{
		id: 'c.0',
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
	id: 'c.2',
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

// ======================== Ветка ОТКРЫТЬ (c.3.1.*) ========================

// Провод от соединительной коробки до концевого выключателя открыто
export const provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto: CircuitElement =
	{
		id: 'c.3.1.0',
		name: 'Провод от соединительной коробки до концевого выключателя открыто',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.3.0.0',
		endPoint: 'p.c.3.0.1',
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

export const kontsevojVyklyuchatelOtkryto: CircuitElement = {
	id: LIMIT_SWITCH_OPEN_ID,
	name: 'Концевой выключатель открыто',
	resistance: 0,
	kind: 'limitSwitch',
	startPoint: 'p.c.3.0.1',
	endPoint: 'p.c.3.0.2',
	malfunctions: [
		{ id: 'c.3.1.1.1', name: 'Залипший контакт', active: false },
		{ id: 'c.3.1.1.2', name: 'Нет контакта', active: false },
		{ id: 'c.3.1.1.3', name: 'Не настроен', active: false },
	],
};

// Провод от концевого выключателя до клеммника
export const provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZAP2: CircuitElement =
	{
		id: 'c.3.1.2',
		name: 'Провод от концевого выключателя открыто до клеммника',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.3.0.2',
		endPoint: 'p.c.3.0.3',
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

// Провод от клеммника до вставки NDI (сигнал не открыто)
export const provodOtKlemmikaDoVstavkiNDI_signalNeOtkryto: CircuitElement = {
	id: 'c.3.1.3',
	name: 'Провод от клеммника до вставки NDI (сигнал не открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.3',
	endPoint: 'p.c.3.0.4',
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

// Вставка NDI (сигнал не открыто)
export const vstavkaNDI_signalNeOtkryto: CircuitElement = {
	id: 'c.3.1.4.0.0',
	name: 'Провод перед вставкой NDI (сигнал не открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4',
	endPoint: 'p.c.3.0.4.0.0',
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

export const vstavkaNDI_signalNeOtkryto_element: CircuitElement = {
	id: 'c.3.1.4.0.1',
	name: 'Вставка NDI (сигнал «не открыто»)',
	resistance: 0,
	kind: 'insert',
	startPoint: 'p.c.3.0.4.0.0',
	endPoint: 'p.c.3.0.4.0.1',
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

export const provodOtVstavkiNDI_signalNeOtkrytoDoNejtrali: CircuitElement = {
	id: 'c.3.1.4.0.2',
	name: 'Провод от вставки NDI (сигнал не открыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.0.1',
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

// Провода и элементы для команды с ПТК (c.3.1.4.1.0.0.*)
export const provodPeredVstavkojNDI_komandaOtkrytSPTK: CircuitElement = {
	id: 'c.3.1.4.1.0.0.0',
	name: 'Провод перед вставкой NDI (команда открыть с ПТК)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.0.0.0',
	endPoint: 'p.c.3.0.4.1.0.0.1',
	malfunctions: [
		{ id: 'c.3.1.4.1.0.0.0.1', name: 'Обрыв провода', active: false },
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

export const vstavkaNDI_komandaOtkrytSPTK: CircuitElement = {
	id: 'c.3.1.4.1.0.0.1',
	name: 'Вставка NDI (команда открыть с ПТК)',
	resistance: 0,
	kind: 'insert',
	startPoint: 'p.c.3.0.4.1.0.0.1',
	endPoint: 'p.c.3.0.4.1.0.0.2',
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

export const provodOtVstavkiNDI_komandaOtkrytSPTKDoNejtrali: CircuitElement = {
	id: 'c.3.1.4.1.0.0.2',
	name: 'Провод от вставки NDI (команда открыть с ПТК) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.0.0.2',
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

// Блокировка и катушка (c.3.1.4.1.0.1.*)
export const provodPeredBlokirovkojOtkrytie: CircuitElement = {
	id: 'c.3.1.4.1.1.0',
	name: 'Провод перед блокировкой (открытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.0.1.0',
	endPoint: 'p.c.3.0.4.1.0.1.1',
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

export const blokirovkaVklyucheniaPuskatelyaNaOtkrytie: CircuitElement = {
	id: 'c.3.1.4.1.1.1',
	name: 'Блокировка включения пускателя на открытие',
	resistance: 0,
	kind: 'blockingContact',
	startPoint: 'p.c.3.0.4.1.0.1.1',
	endPoint: 'p.c.3.0.4.1.0.1.2',
	malfunctions: [
		{ id: 'c.3.1.4.1.1.1.1', name: 'Нет контакта', active: false },
		{
			id: 'c.3.1.4.1.1.1.2',
			name: 'Ложно замкнутый контакт',
			active: false,
		},
	],
};

export const provodOtBlokirovkiDoKatushkiOtkrytie: CircuitElement = {
	id: 'c.3.1.4.1.1.2',
	name: 'Провод от блокировки до катушки (открытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.0.1.2',
	endPoint: 'p.c.3.0.4.1.0.1.3',
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

export const katushkaPuskatelyaOtkryt: CircuitElement = {
	id: 'c.3.1.4.1.1.4',
	name: 'Катушка пускателя открыть',
	resistance: 6400,
	kind: 'coil',
	startPoint: 'p.c.3.0.4.1.0.1.3',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.1.4.1.1.4.1',
			name: 'Неисправна катушка, пускатель не подтягивается',
			active: false,
		},
	],
};

// Кнопка КРУЗА-П (c.3.1.4.1.0.1.*)
export const provodPeredKnopkojKRUZAP_komandaOtkryt: CircuitElement = {
	id: 'c.3.1.4.1.2.0',
	name: 'Провод перед кнопкой КРУЗА-П (открыть)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.2.0',
	endPoint: 'p.c.3.0.4.1.2.1',
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

export const knopkaKRUZAP_komandaOtkryt: CircuitElement = {
	id: 'c.3.1.4.1.2.1',
	name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
	resistance: 0,
	kind: 'button',
	startPoint: 'p.c.3.0.4.1.2.1',
	endPoint: 'p.c.3.0.4.1.2.2',
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

export const provodOtKnopkiKRUZAP_komandaOtkrytDoNejtrali: CircuitElement = {
	id: 'c.3.1.4.1.2.2',
	name: 'Провод от кнопки КРУЗА-П (открыть) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.1.2.2',
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

// Лампа в КРУЗА-П (закрыто) - c.3.1.4.2.*
export const provodPeredLampojVKRUZAP_zakryto: CircuitElement = {
	id: 'c.3.1.4.2.0',
	name: 'Провод перед лампой в КРУЗА-П (закрыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.2.0',
	endPoint: 'p.c.3.0.4.2.1',
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

export const lampaVKRUZAP_zakryto: CircuitElement = {
	id: 'c.3.1.4.2.1',
	name: 'Лампа в КРУЗА-П закрыто',
	resistance: 4800,
	kind: 'lamp',
	startPoint: 'p.c.3.0.4.2.1',
	endPoint: 'p.c.3.0.4.2.2',
	malfunctions: [{ id: 'c.3.1.4.2.1.1', name: 'Перегорела', active: false }],
};

export const provodOtLampyVKRUZAP_zakrytoDoNejtrali: CircuitElement = {
	id: 'c.3.1.4.2.2',
	name: 'Провод от лампы в КРУЗА-П (закрыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.0.4.2.2',
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

// ======================== Ветка ЗАКРЫТЬ (c.3.2.*) ========================

// Аналогичная структура для ветки закрыть
export const provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto: CircuitElement =
	{
		id: 'c.3.2.0',
		name: 'Провод от соединительной коробки до концевого выключателя закрыто',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.3.1.0',
		endPoint: 'p.c.3.1.1',
		malfunctions: [
			{ id: 'c.3.2.0.1', name: 'Обрыв провода', active: false },
			{
				id: 'c.3.2.0.2',
				name: 'Короткое замыкание на землю',
				active: false,
			},
			{
				id: 'c.3.2.0.3',
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
		{ id: 'c.3.2.1.1', name: 'Залипший контакт', active: false },
		{ id: 'c.3.2.1.2', name: 'Нет контакта', active: false },
		{ id: 'c.3.2.1.3', name: 'Не настроен', active: false },
	],
};

export const provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP2: CircuitElement =
	{
		id: 'c.3.2.2',
		name: 'Провод от концевого выключателя закрыто до клеммника',
		resistance: 0.1,
		kind: 'wire',
		startPoint: 'p.c.3.1.2',
		endPoint: 'p.c.3.1.3',
		malfunctions: [
			{ id: 'c.3.2.2.1', name: 'Обрыв провода', active: false },
			{
				id: 'c.3.2.2.2',
				name: 'Короткое замыкание на землю',
				active: false,
			},
			{
				id: 'c.3.2.2.3',
				name: 'Короткое замыкание с соседним проводом',
				active: false,
			},
		],
	};

export const provodOtKlemmikaDoVstavkiNDI_signalNeZakryto: CircuitElement = {
	id: 'c.3.2.3',
	name: 'Провод от клеммника до вставки NDI (сигнал не закрыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.3',
	endPoint: 'p.c.3.1.4',
	malfunctions: [
		{ id: 'c.3.2.3.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.2.3.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.2.3.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const provodPeredVstavkojNDI_signalNeZakryto: CircuitElement = {
	id: 'c.3.2.4.0.0',
	name: 'Провод перед вставкой NDI (сигнал не закрыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.0.0',
	endPoint: 'p.c.3.1.4.0.1',
	malfunctions: [
		{ id: 'c.3.2.4.0.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.2.4.0.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.2.4.0.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const vstavkaNDI_signalNeZakryto: CircuitElement = {
	id: 'c.3.2.4.0.1',
	name: 'Вставка NDI (сигнал «не закрыто»)',
	resistance: 0,
	kind: 'insert',
	startPoint: 'p.c.3.1.4.0.1',
	endPoint: 'p.c.3.1.4.0.2',
	malfunctions: [
		{
			id: 'c.3.2.4.0.1.1',
			name: 'Нет контакта, цепь не замыкается',
			active: false,
		},
		{
			id: 'c.3.2.4.0.1.2',
			name: 'Ложно сработала, цепь не размыкается',
			active: false,
		},
	],
};

export const provodOtVstavkiNDI_signalNeZakrytoDoNejtrali: CircuitElement = {
	id: 'c.3.2.4.0.2',
	name: 'Провод от вставки NDI (сигнал не закрыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.0.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{ id: 'c.3.2.4.0.2.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.2.4.0.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.2.4.0.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const provodPeredVstavkojNDI_komandaZakrytSPTK: CircuitElement = {
	id: 'c.3.2.4.1.0.0.0',
	name: 'Провод перед вставкой NDI (команда закрыть с ПТК)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.0.0.0',
	endPoint: 'p.c.3.1.4.1.0.0.1',
	malfunctions: [
		{
			id: 'c.3.2.4.1.0.0.0.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.2.4.1.0.0.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.2.4.1.0.0.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const vstavkaNDI_komandaZakrytSPTK: CircuitElement = {
	id: 'c.3.2.4.1.0.0.1',
	name: 'Вставка NDI (команда закрыть с ПТК)',
	resistance: 0,
	kind: 'insert',
	startPoint: 'p.c.3.1.4.1.0.0.1',
	endPoint: 'p.c.3.1.4.1.0.0.2',
	malfunctions: [
		{
			id: 'c.3.2.4.1.0.0.1.1',
			name: 'Нет контакта, команда не уходит',
			active: false,
		},
		{
			id: 'c.3.2.4.1.0.0.1.2',
			name: 'Ложно сработала, команда постоянно висит',
			active: false,
		},
	],
};

export const provodOtVstavkiNDI_komandaZakrytSPTKDoNejtrali: CircuitElement = {
	id: 'c.3.2.4.1.0.0.2',
	name: 'Провод от вставки NDI (команда закрыть с ПТК) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.0.0.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.2.4.1.0.0.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.2.4.1.0.0.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.2.4.1.0.0.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const provodPeredBlokirovkojZakrytie: CircuitElement = {
	id: 'c.3.2.4.1.1.0',
	name: 'Провод перед блокировкой (закрытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.0.1.0',
	endPoint: 'p.c.3.1.4.1.0.1.1',
	malfunctions: [
		{ id: 'c.3.2.4.1.1.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.2.4.1.1.0.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.2.4.1.1.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const blokirovkaVklyucheniaPuskatelyaNaZakrytie: CircuitElement = {
	id: 'c.3.2.4.1.1.1',
	name: 'Блокировка включения пускателя на закрыть',
	resistance: 0,
	kind: 'blockingContact',
	startPoint: 'p.c.3.1.4.1.0.1.1',
	endPoint: 'p.c.3.1.4.1.0.1.2',
	malfunctions: [
		{ id: 'c.3.2.4.1.1.1.1', name: 'Нет контакта', active: false },
		{
			id: 'c.3.2.4.1.1.1.2',
			name: 'Ложно замкнутый контакт',
			active: false,
		},
	],
};

export const provodOtBlokirovkiDoKatushkiZakrytie: CircuitElement = {
	id: 'c.3.2.4.1.1.2',
	name: 'Провод от блокировки до катушки (закрытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.0.1.2',
	endPoint: 'p.c.3.1.4.1.0.1.3',
	malfunctions: [
		{ id: 'c.3.2.4.1.1.2.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.2.4.1.1.2.2',
			name: 'Короткое замыкание на землю',
			active: false,
		},
		{
			id: 'c.3.2.4.1.1.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const katushkaPuskatelyaZakryt: CircuitElement = {
	id: 'c.3.2.4.1.1.4',
	name: 'Катушка пускателя закрыть',
	resistance: 6400,
	kind: 'coil',
	startPoint: 'p.c.3.1.4.1.0.1.3',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.2.4.1.1.4.1',
			name: 'Неисправна катушка, пускатель не подтягивается',
			active: false,
		},
	],
};

export const provodPeredKnopkojKRUZAP_komandaZakryt: CircuitElement = {
	id: 'c.3.2.4.1.2.0',
	name: 'Провод перед кнопкой КРУЗА-П (закрыть)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.2.0',
	endPoint: 'p.c.3.1.4.1.2.1',
	malfunctions: [
		{ id: 'c.3.2.4.1.2.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.2.4.1.2.0.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.2.4.1.2.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const knopkaKRUZAP_komandaZakryt: CircuitElement = {
	id: 'c.3.2.4.1.2.1',
	name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
	resistance: 0,
	kind: 'button',
	startPoint: 'p.c.3.1.4.1.2.1',
	endPoint: 'p.c.3.1.4.1.2.2',
	malfunctions: [
		{
			id: 'c.3.2.4.1.2.1.1',
			name: 'Нет контакта, команда не уходит',
			active: false,
		},
		{
			id: 'c.3.2.4.1.2.1.2',
			name: 'Ложно сработала, команда постоянно висит',
			active: false,
		},
	],
};

export const provodOtKnopkiKRUZAP_komandaZakrytDoNejtrali: CircuitElement = {
	id: 'c.3.2.4.1.2.2',
	name: 'Провод от кнопки КРУЗА-П (закрыть) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.1.2.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.2.4.1.2.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.2.4.1.2.2.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.2.4.1.2.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const provodPeredLampojVKRUZAP_otkryto: CircuitElement = {
	id: 'c.3.2.4.2.0',
	name: 'Провод перед лампой в КРУЗА-П (открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.2.0',
	endPoint: 'p.c.3.1.4.2.1',
	malfunctions: [
		{ id: 'c.3.2.4.2.0.1', name: 'Обрыв провода', active: false },
		{
			id: 'c.3.2.4.2.0.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.2.4.2.0.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};

export const lampaVKRUZAP_otkryto: CircuitElement = {
	id: 'c.3.2.4.2.1',
	name: 'Лампа в КРУЗА-П открыто',
	resistance: 4800,
	kind: 'lamp',
	startPoint: 'p.c.3.1.4.2.1',
	endPoint: 'p.c.3.1.4.2.2',
	malfunctions: [{ id: 'c.3.2.4.2.1.1', name: 'Перегорела', active: false }],
};

export const provodOtLampyVKRUZAP_otkrytoDoNejtrali: CircuitElement = {
	id: 'c.3.2.4.2.2',
	name: 'Провод от лампы в КРУЗА-П (открыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: 'p.c.3.1.4.2.2',
	endPoint: 'p.c.n',
	malfunctions: [
		{
			id: 'c.3.2.4.2.2.1',
			name: 'Обрыв провода',
			active: false,
		},
		{
			id: 'c.3.2.4.2.2.2',
			name: 'Короткое замыкание',
			active: false,
		},
		{
			id: 'c.3.2.4.2.2.3',
			name: 'Короткое замыкание с соседним проводом',
			active: false,
		},
	],
};
