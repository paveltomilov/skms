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
	CONTROL_MAIN_BUS_POINT_ID,
	CONTROL_NEUTRAL_POINT_ID,
	// point constants
	CONTROL_POWER_FEED_POINT_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
	CONTROL_BREAKER_OUTPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
	CLOSED_LAMP_INPUT_POINT_ID,
	OPEN_COMMAND_MERGE_POINT_ID,
	OPEN_INTERLOCK_INPUT_POINT_ID,
	CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
	CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	OPEN_LAMP_INPUT_POINT_ID,
	CLOSE_COMMAND_MERGE_POINT_ID,
	CLOSE_INTERLOCK_INPUT_POINT_ID,
	CONTROL_POINT_C3_0_0,
	CONTROL_POINT_C3_0_3,
	CONTROL_POINT_C3_0_4,
	CONTROL_POINT_C3_0_4_0_0,
	CONTROL_POINT_C3_0_4_0_1,
	CONTROL_POINT_C3_0_4_1_0_0_0,
	CONTROL_POINT_C3_0_4_1_0_0_1,
	CONTROL_POINT_C3_0_4_1_0_1_1,
	CONTROL_POINT_C3_0_4_1_0_1_2,
	CONTROL_POINT_C3_0_4_1_0_1_3,
	CONTROL_POINT_C3_0_4_1_2_0,
	CONTROL_POINT_C3_0_4_1_2_1,
	CONTROL_POINT_C3_0_4_1_2_2,
	CONTROL_POINT_C3_0_4_2_0,
	CONTROL_POINT_C3_0_4_2_2,
	CONTROL_POINT_C3_1_0,
	CONTROL_POINT_C3_1_3,
	CONTROL_POINT_C3_1_4,
	CONTROL_POINT_C3_1_4_0_0,
	CONTROL_POINT_C3_1_4_0_1,
	CONTROL_POINT_C3_1_4_0_2,
	CONTROL_POINT_C3_1_4_1_0_0_0,
	CONTROL_POINT_C3_1_4_1_0_0_1,
	CONTROL_POINT_C3_1_4_1_0_0_2,
	CONTROL_POINT_C3_1_4_1_0_1_1,
	CONTROL_POINT_C3_1_4_1_0_1_2,
	CONTROL_POINT_C3_1_4_1_0_1_3,
	CONTROL_POINT_C3_1_4_1_2_0,
	CONTROL_POINT_C3_1_4_1_2_1,
	CONTROL_POINT_C3_1_4_1_2_2,
	CONTROL_POINT_C3_1_4_2_0,
	CONTROL_POINT_C3_1_4_2_2,
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
import {
	MALF_TPL_BUTTON_CMD,
	MALF_TPL_COIL,
	MALF_TPL_LAMP,
	MALF_TPL_WIRE_FULL,
	MALF_TPL_WIRE_GROUND_FULL,
	buildMalfunctions,
} from './malfunctionTemplates';

// ======================== Общая часть (c.0, c.1, c.2) ========================

export const provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya: CircuitElement =
	{
		id: WIRE_POWER_TO_CONTROL_BREAKER_ID,
		name: 'Провод от силовой части схемы к автомату питания управления',
		resistance: 0.1,
		kind: 'wire',
		startPoint: CONTROL_POWER_FEED_POINT_ID,
		endPoint: CONTROL_BREAKER_INPUT_POINT_ID,
		malfunctions: buildMalfunctions('c.0', MALF_TPL_WIRE_GROUND_FULL),
	};

export const avtomatPitaniyaSkhemyUpravleniya: CircuitElement = {
	id: CONTROL_CIRCUIT_BREAKER_ID,
	name: 'Автомат питания цепей управления',
	resistance: 0,
	kind: 'breaker',
	startPoint: CONTROL_BREAKER_INPUT_POINT_ID,
	endPoint: CONTROL_BREAKER_OUTPUT_POINT_ID,
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
	startPoint: CONTROL_BREAKER_OUTPUT_POINT_ID,
	endPoint: CONTROL_MAIN_BUS_POINT_ID,
	malfunctions: buildMalfunctions('c.2', MALF_TPL_WIRE_GROUND_FULL),
};

// ======================== Ветка ОТКРЫТЬ (c.3.0.*) ========================

// Провод от соединительной коробки до концевого выключателя открыто
export const provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto: CircuitElement =
	{
		id: WIRE_BOX_TO_LIMIT_OPEN_ID,
		name: 'Провод от соединительной коробки до концевого выключателя открыто',
		resistance: 0.1,
		kind: 'wire',
		startPoint: CONTROL_POINT_C3_0_0,
		endPoint: OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
		malfunctions: buildMalfunctions('c.3.0.0', MALF_TPL_WIRE_GROUND_FULL),
	};

export const kontsevojVyklyuchatelOtkryto: CircuitElement = {
	id: LIMIT_SWITCH_OPEN_ID,
	name: 'Концевой выключатель открыто',
	resistance: 0,
	kind: 'limitSwitch',
	startPoint: OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
	endPoint: OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
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
		startPoint: OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
		endPoint: CONTROL_POINT_C3_0_3,
		malfunctions: buildMalfunctions('c.3.0.2', MALF_TPL_WIRE_GROUND_FULL),
	};

// Провод от клеммника до вставки NDI (сигнал не открыто)
export const provodOtKlemmikaDoVstavkiNDI_signalNeOtkryto: CircuitElement = {
	id: WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID,
	name: 'Провод от клеммника до вставки NDI (сигнал не открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_0_3,
	endPoint: CONTROL_POINT_C3_0_4,
	malfunctions: buildMalfunctions('c.3.0.3', MALF_TPL_WIRE_GROUND_FULL),
};

// Вставка NDI (сигнал не открыто)
export const vstavkaNDI_signalNeOtkryto: CircuitElement = {
	id: WIRE_BEFORE_NDI_NOT_OPEN_ID,
	name: 'Провод перед вставкой NDI (сигнал не открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_0_4,
	endPoint: CONTROL_POINT_C3_0_4_0_0,
	malfunctions: buildMalfunctions('c.3.0.4.0.0', MALF_TPL_WIRE_GROUND_FULL),
};

export const vstavkaNDI_signalNeOtkryto_element: CircuitElement = {
	id: INSERT_NDI_NOT_OPEN_ID,
	name: 'Вставка NDI (сигнал «не открыто»)',
	resistance: 0,
	kind: 'insert',
	startPoint: CONTROL_POINT_C3_0_4_0_0,
	endPoint: CONTROL_POINT_C3_0_4_0_1,
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
	startPoint: CONTROL_POINT_C3_0_4_0_1,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions('c.3.0.4.0.2', MALF_TPL_WIRE_GROUND_FULL),
};

// Провода и элементы для команды с ПТК (c.3.0.4.1.0.0.*)
export const provodPeredVstavkojNDI_komandaOtkrytSPTK: CircuitElement = {
	id: WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID,
	name: 'Провод перед вставкой NDI (команда открыть с ПТК)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_0_4_1_0_0_0,
	endPoint: CONTROL_POINT_C3_0_4_1_0_0_1,
	malfunctions: buildMalfunctions(
		'c.3.0.4.1.0.0.0',
		MALF_TPL_WIRE_GROUND_FULL,
	),
};

export const vstavkaNDI_komandaOtkrytSPTK: CircuitElement = {
	id: INSERT_NDI_CMD_OPEN_PTK_ID,
	name: 'Вставка NDI (команда открыть с ПТК)',
	resistance: 0,
	kind: 'insert',
	startPoint: CONTROL_POINT_C3_0_4_1_0_0_1,
	endPoint: OPEN_COMMAND_MERGE_POINT_ID,
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
	startPoint: OPEN_COMMAND_MERGE_POINT_ID,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(
		'c.3.0.4.1.0.0.2',
		MALF_TPL_WIRE_GROUND_FULL,
	),
};

// Блокировка и катушка (c.3.0.4.1.0.1.*)
export const provodPeredBlokirovkojOtkrytie: CircuitElement = {
	id: WIRE_BEFORE_INTERLOCK_OPEN_ID,
	name: 'Провод перед блокировкой (открытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: OPEN_INTERLOCK_INPUT_POINT_ID,
	endPoint: CONTROL_POINT_C3_0_4_1_0_1_1,
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
	startPoint: CONTROL_POINT_C3_0_4_1_0_1_1,
	endPoint: CONTROL_POINT_C3_0_4_1_0_1_2,
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
	startPoint: CONTROL_POINT_C3_0_4_1_0_1_2,
	endPoint: CONTROL_POINT_C3_0_4_1_0_1_3,
	malfunctions: buildMalfunctions('c.3.0.4.1.1.2', MALF_TPL_WIRE_GROUND_FULL),
};

export const katushkaPuskatelyaOtkryt: CircuitElement = {
	id: COIL_OPEN_ID,
	name: 'Катушка пускателя открыть',
	resistance: 6400,
	kind: 'coil',
	startPoint: CONTROL_POINT_C3_0_4_1_0_1_3,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions('c.3.0.4.1.1.4', MALF_TPL_COIL),
};

// Кнопка КРУЗА-П (c.3.0.4.1.0.1.*)
export const provodPeredKnopkojKRUZAP_komandaOtkryt: CircuitElement = {
	id: WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID,
	name: 'Провод перед кнопкой КРУЗА-П (открыть)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_0_4_1_2_0,
	endPoint: CONTROL_POINT_C3_0_4_1_2_1,
	malfunctions: buildMalfunctions('c.3.0.4.1.2.0', MALF_TPL_WIRE_FULL),
};

export const knopkaKRUZAP_komandaOtkryt: CircuitElement = {
	id: BUTTON_KRUZA_P_OPEN_ID,
	name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
	resistance: 0,
	kind: 'button',
	startPoint: CONTROL_POINT_C3_0_4_1_2_1,
	endPoint: CONTROL_POINT_C3_0_4_1_2_2,
	malfunctions: buildMalfunctions('c.3.0.4.1.2.1', MALF_TPL_BUTTON_CMD),
};

export const provodOtKnopkiKRUZAP_komandaOtkrytDoNejtrali: CircuitElement = {
	id: WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	name: 'Провод от кнопки КРУЗА-П (открыть) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_0_4_1_2_2,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions('c.3.0.4.1.2.2', MALF_TPL_WIRE_FULL),
};

// Лампа в КРУЗА-П (закрыто) - c.3.0.4.2.*
export const provodPeredLampojVKRUZAP_zakryto: CircuitElement = {
	id: WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
	name: 'Провод перед лампой в КРУЗА-П (закрыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_0_4_2_0,
	endPoint: CLOSED_LAMP_INPUT_POINT_ID,
	malfunctions: buildMalfunctions('c.3.0.4.2.0', MALF_TPL_WIRE_FULL),
};

export const lampaVKRUZAP_zakryto: CircuitElement = {
	id: LAMP_KRUZA_P_CLOSED_ID,
	name: 'Лампа в КРУЗА-П закрыто',
	resistance: 4800,
	kind: 'lamp',
	startPoint: CLOSED_LAMP_INPUT_POINT_ID,
	endPoint: CONTROL_POINT_C3_0_4_2_2,
	malfunctions: buildMalfunctions('c.3.0.4.2.1', MALF_TPL_LAMP),
};

export const provodOtLampyVKRUZAP_zakrytoDoNejtrali: CircuitElement = {
	id: WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID,
	name: 'Провод от лампы в КРУЗА-П (закрыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_0_4_2_2,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions('c.3.0.4.2.2', MALF_TPL_WIRE_FULL),
};

// ======================== Ветка ЗАКРЫТЬ (c.3.1.*) ========================

// Аналогичная структура для ветки закрыть
export const provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto: CircuitElement =
	{
		id: WIRE_BOX_TO_LIMIT_CLOSE_ID,
		name: 'Провод от соединительной коробки до концевого выключателя закрыто',
		resistance: 0.1,
		kind: 'wire',
		startPoint: CONTROL_POINT_C3_1_0,
		endPoint: CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
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
	startPoint: CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
	endPoint: CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
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
		startPoint: CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
		endPoint: CONTROL_POINT_C3_1_3,
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
	startPoint: CONTROL_POINT_C3_1_3,
	endPoint: CONTROL_POINT_C3_1_4,
	malfunctions: buildMalfunctions('c.3.1.3', MALF_TPL_WIRE_GROUND_FULL),
};

export const provodPeredVstavkojNDI_signalNeZakryto: CircuitElement = {
	id: WIRE_BEFORE_NDI_NOT_CLOSED_ID,
	name: 'Провод перед вставкой NDI (сигнал не закрыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_1_4_0_0,
	endPoint: CONTROL_POINT_C3_1_4_0_1,
	malfunctions: buildMalfunctions('c.3.1.4.0.0', MALF_TPL_WIRE_GROUND_FULL),
};

export const vstavkaNDI_signalNeZakryto: CircuitElement = {
	id: INSERT_NDI_NOT_CLOSED_ID,
	name: 'Вставка NDI (сигнал «не закрыто»)',
	resistance: 0,
	kind: 'insert',
	startPoint: CONTROL_POINT_C3_1_4_0_1,
	endPoint: CONTROL_POINT_C3_1_4_0_2,
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
	startPoint: CONTROL_POINT_C3_1_4_0_2,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions('c.3.1.4.0.2', MALF_TPL_WIRE_GROUND_FULL),
};

export const provodPeredVstavkojNDI_komandaZakrytSPTK: CircuitElement = {
	id: WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID,
	name: 'Провод перед вставкой NDI (команда закрыть с ПТК)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_1_4_1_0_0_0,
	endPoint: CONTROL_POINT_C3_1_4_1_0_0_1,
	malfunctions: buildMalfunctions(
		'c.3.1.4.1.0.0.0',
		MALF_TPL_WIRE_GROUND_FULL,
	),
};

export const vstavkaNDI_komandaZakrytSPTK: CircuitElement = {
	id: INSERT_NDI_CMD_CLOSE_PTK_ID,
	name: 'Вставка NDI (команда закрыть с ПТК)',
	resistance: 0,
	kind: 'insert',
	startPoint: CONTROL_POINT_C3_1_4_1_0_0_1,
	endPoint: CONTROL_POINT_C3_1_4_1_0_0_2,
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
	startPoint: CLOSE_COMMAND_MERGE_POINT_ID,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(
		'c.3.1.4.1.0.0.2',
		MALF_TPL_WIRE_GROUND_FULL,
	),
};

export const provodPeredBlokirovkojZakrytie: CircuitElement = {
	id: WIRE_BEFORE_INTERLOCK_CLOSE_ID,
	name: 'Провод перед блокировкой (закрытие)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CLOSE_INTERLOCK_INPUT_POINT_ID,
	endPoint: CONTROL_POINT_C3_1_4_1_0_1_1,
	malfunctions: buildMalfunctions('c.3.1.4.1.1.0', MALF_TPL_WIRE_GROUND_FULL),
};

export const blokirovkaVklyucheniaPuskatelyaNaZakrytie: CircuitElement = {
	id: INTERLOCK_CONTACT_CLOSE_ID,
	name: 'Блокировка включения пускателя на закрыть',
	resistance: 0,
	kind: 'blockingContact',
	startPoint: CONTROL_POINT_C3_1_4_1_0_1_1,
	endPoint: CONTROL_POINT_C3_1_4_1_0_1_2,
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
	startPoint: CONTROL_POINT_C3_1_4_1_0_1_2,
	endPoint: CONTROL_POINT_C3_1_4_1_0_1_3,
	malfunctions: buildMalfunctions('c.3.1.4.1.1.2', MALF_TPL_WIRE_GROUND_FULL),
};

export const katushkaPuskatelyaZakryt: CircuitElement = {
	id: COIL_CLOSE_ID,
	name: 'Катушка пускателя закрыть',
	resistance: 6400,
	kind: 'coil',
	startPoint: CONTROL_POINT_C3_1_4_1_0_1_3,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions('c.3.1.4.1.1.4', MALF_TPL_COIL),
};

export const provodPeredKnopkojKRUZAP_komandaZakryt: CircuitElement = {
	id: WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
	name: 'Провод перед кнопкой КРУЗА-П (закрыть)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_1_4_1_2_0,
	endPoint: CONTROL_POINT_C3_1_4_1_2_1,
	malfunctions: buildMalfunctions('c.3.1.4.1.2.0', MALF_TPL_WIRE_FULL),
};

export const knopkaKRUZAP_komandaZakryt: CircuitElement = {
	id: BUTTON_KRUZA_P_CLOSE_ID,
	name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
	resistance: 0,
	kind: 'button',
	startPoint: CONTROL_POINT_C3_1_4_1_2_1,
	endPoint: CONTROL_POINT_C3_1_4_1_2_2,
	malfunctions: buildMalfunctions('c.3.1.4.1.2.1', MALF_TPL_BUTTON_CMD),
};

export const provodOtKnopkiKRUZAP_komandaZakrytDoNejtrali: CircuitElement = {
	id: WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
	name: 'Провод от кнопки КРУЗА-П (закрыть) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_1_4_1_2_2,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions('c.3.1.4.1.2.2', MALF_TPL_WIRE_FULL),
};

export const provodPeredLampojVKRUZAP_otkryto: CircuitElement = {
	id: WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
	name: 'Провод перед лампой в КРУЗА-П (открыто)',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_1_4_2_0,
	endPoint: OPEN_LAMP_INPUT_POINT_ID,
	malfunctions: buildMalfunctions('c.3.1.4.2.0', MALF_TPL_WIRE_FULL),
};

export const lampaVKRUZAP_otkryto: CircuitElement = {
	id: LAMP_KRUZA_P_OPEN_ID,
	name: 'Лампа в КРУЗА-П открыто',
	resistance: 4800,
	kind: 'lamp',
	startPoint: OPEN_LAMP_INPUT_POINT_ID,
	endPoint: CONTROL_POINT_C3_1_4_2_2,
	malfunctions: buildMalfunctions('c.3.1.4.2.1', MALF_TPL_LAMP),
};

export const provodOtLampyVKRUZAP_otkrytoDoNejtrali: CircuitElement = {
	id: WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	name: 'Провод от лампы в КРУЗА-П (открыто) до нейтрали',
	resistance: 0.1,
	kind: 'wire',
	startPoint: CONTROL_POINT_C3_1_4_2_2,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions('c.3.1.4.2.2', MALF_TPL_WIRE_FULL),
};
