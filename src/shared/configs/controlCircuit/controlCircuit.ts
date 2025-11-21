/**
 * Структура controlCircuit — массив с вложенными подмассивами (ветвлениями).
 * Аналогично powerCircuit: вложенный массив = параллельное ветвление.
 * Импортированные переменные — camelCase русские названия элементов.
 */

/**
 * Элементы схемы управления (controlCircuit).
 * Каждая переменная содержит полный объект элемента с id, name, resistance и malfunctions.
 * Структура аналогична powerCircuit.
 */
import { CircuitBranch } from '../../types/scheme';
import type { CircuitElement } from '@/shared/types/scheme';
import { INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID } from '../powerCircuit/constants';
import {
	WIRE_POWER_TO_CONTROL_BREAKER_ID,
	CONTROL_CIRCUIT_BREAKER_ID,
	WIRE_PHASE_AFTER_BREAKER_ID,
	JUMPER_BOX_TO_LIMIT_OPEN_ID,
	WIRE_BOX_TO_LIMIT_OPEN_ID,
	LIMIT_SWITCH_OPEN_ID,
	WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	WIRE_BEFORE_NDI_NOT_OPEN_ID,
	INSERT_NDI_NOT_OPEN_ID,
	WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID,
	WIRE_BEFORE_NDO_CMD_OPEN_PTK_ID,
	INSERT_NDO_CMD_OPEN_PTK_ID,
	WIRE_NDO_CMD_OPEN_PTK_TO_NEUTRAL_ID,
	WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID,
	BUTTON_KRUZA_P_OPEN_ID,
	WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	WIRE_BEFORE_INTERLOCK_OPEN_ID,
	INTERLOCK_OPEN_ID,
	WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID,
	COIL_OPEN_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
	LAMP_KRUZA_P_CLOSED_ID,
	WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID,
	JUMPER_BOX_TO_LIMIT_CLOSE_ID,
	WIRE_BOX_TO_LIMIT_CLOSE_ID,
	LIMIT_SWITCH_CLOSE_ID,
	WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	WIRE_BEFORE_NDI_NOT_CLOSED_ID,
	INSERT_NDI_NOT_CLOSED_ID,
	WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID,
	WIRE_BEFORE_NDO_CMD_CLOSE_PTK_ID,
	INSERT_NDO_CMD_CLOSE_PTK_ID,
	WIRE_NDO_CMD_CLOSE_PTK_TO_NEUTRAL_ID,
	WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
	BUTTON_KRUZA_P_CLOSE_ID,
	WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
	WIRE_BEFORE_INTERLOCK_CLOSE_ID,
	INTERLOCK_CLOSE_ID,
	WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID,
	COIL_CLOSE_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
	LAMP_KRUZA_P_OPEN_ID,
	WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	// Точки (информативные названия)
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
import { buildMalfunctions } from '../malfunctionTemplates';
import {
	getResistanceByKind,
	ELEMENT_KIND,
} from '../../utils/getResistanceByKind/getResistanceByKind';

// ======================== Общая часть (c.0, c.1, c.2) ========================

export const provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya: CircuitElement =
	{
		id: WIRE_POWER_TO_CONTROL_BREAKER_ID,
		name: 'Провод от силовой части схемы к автомату питания управления',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID,
		endPoint: CONTROL_POWER_FEED_POINT_ID,
		malfunctions: buildMalfunctions(
			WIRE_POWER_TO_CONTROL_BREAKER_ID,
			ELEMENT_KIND.WIRE,
		),
	};

export const avtomatPitaniyaSkhemyUpravleniya: CircuitElement = {
	id: CONTROL_CIRCUIT_BREAKER_ID,
	name: 'Автомат питания цепей управления',
	kind: ELEMENT_KIND.BREAKER,
	resistance: getResistanceByKind(ELEMENT_KIND.BREAKER),
	startPoint: CONTROL_POWER_FEED_POINT_ID,
	endPoint: CONTROL_BREAKER_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(CONTROL_CIRCUIT_BREAKER_ID, ELEMENT_KIND.BREAKER),
};

export const provodFazyPosleAvtomata: CircuitElement = {
	id: WIRE_PHASE_AFTER_BREAKER_ID,
	name: 'Провод фазы после автомата',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CONTROL_BREAKER_INPUT_POINT_ID,
	endPoint: CONTROL_BREAKER_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_PHASE_AFTER_BREAKER_ID, ELEMENT_KIND.WIRE),
};

// ======================== Ветка ОТКРЫТЬ (c.3.0.*) ========================
// Перемычка из соединительной коробки на ветку открыть до концевого выключателя открыто
export const jumperOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto: CircuitElement =
	{
		id: JUMPER_BOX_TO_LIMIT_OPEN_ID,
		name: 'Провод от соединительной коробки до концевого выключателя открыто',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: CONTROL_BREAKER_OUTPUT_POINT_ID,
		endPoint: JUMPER_BOX_TO_LIMIT_OPEN_ID,
		malfunctions: buildMalfunctions(JUMPER_BOX_TO_LIMIT_OPEN_ID, ELEMENT_KIND.WIRE),
	};
// Провод из соединительной коробки на ветку открыть до концевого выключателя открыто
export const provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto: CircuitElement =
	{
		id: WIRE_BOX_TO_LIMIT_OPEN_ID,
		name: 'Провод от соединительной коробки до концевого выключателя открыто',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: OPEN_JUNCTION_BOX_POINT_ID,
		endPoint: OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
		malfunctions: buildMalfunctions(WIRE_BOX_TO_LIMIT_OPEN_ID, ELEMENT_KIND.WIRE),
	};

export const kontsevojVyklyuchatelOtkryto: CircuitElement = {
	id: LIMIT_SWITCH_OPEN_ID,
	name: 'Концевой выключатель открыто',
	kind: ELEMENT_KIND.LIMIT_SWITCH,
	resistance: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH),
	startPoint: OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
	endPoint: OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(LIMIT_SWITCH_OPEN_ID, ELEMENT_KIND.LIMIT_SWITCH),
};

// Провод от концевого выключателя до клеммника
export const provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZAP: CircuitElement =
	{
		id: WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
		name: 'Провод от концевого выключателя открыто до клеммника',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
		endPoint: OPEN_TERMINAL_BLOCK_POINT_ID,
		malfunctions: buildMalfunctions(WIRE_LIMIT_OPEN_TO_TERMINAL_ID, ELEMENT_KIND.WIRE),
	};

// Провод от клеммника до вставки NDI (сигнал не открыто)
export const provodOtKlemmikaDoVstavkiNDI_signalNeOtkryto: CircuitElement = {
	id: WIRE_BEFORE_NDI_NOT_OPEN_ID,
	name: 'Провод от клеммника до вставки NDO (сигнал не открыто)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_TERMINAL_BLOCK_POINT_ID,
	endPoint: OPEN_NDI_NOT_OPEN_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_NDI_NOT_OPEN_ID, ELEMENT_KIND.WIRE),
};

// Вставка NDI (сигнал не открыто)
export const vstavkaNDI_signalNeOtkryto: CircuitElement = {
	id: INSERT_NDI_NOT_OPEN_ID,
	name: 'Вставка NDI (сигнал не открыто)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_NDI_NOT_OPEN_INPUT_POINT_ID,
	endPoint: OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(INSERT_NDI_NOT_OPEN_ID, ELEMENT_KIND.WIRE),
};

export const provodOtVstavkiNDI_signalNeOtkrytoDoNejtrali: CircuitElement = {
	id: WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID,
	name: 'Провод от вставки NDI (сигнал не открыто) до нейтрали',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID, ELEMENT_KIND.WIRE),
};

// Провода и элементы для команды с ПТК (c.3.0.4.1.0.0.*)
export const provodPeredVstavkojNDO_komandaOtkrytSPTK: CircuitElement = {
	id: WIRE_BEFORE_NDO_CMD_OPEN_PTK_ID,
	name: 'Провод перед вставкой NDO (команда открыть с ПТК)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_TERMINAL_BLOCK_POINT_ID,
	endPoint: OPEN_CMD_PTK_BRANCH_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_NDO_CMD_OPEN_PTK_ID, ELEMENT_KIND.WIRE),
};

export const vstavkaNDO_komandaOtkrytSPTK: CircuitElement = {
	id: INSERT_NDO_CMD_OPEN_PTK_ID,
	name: 'Вставка NDO (команда открыть с ПТК)',
	kind: ELEMENT_KIND.BLOCKING_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.BLOCKING_CONTACT),
	startPoint: OPEN_CMD_PTK_BRANCH_POINT_ID,
	endPoint: OPEN_NDO_CMD_PTK_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(
		INSERT_NDO_CMD_OPEN_PTK_ID,
		ELEMENT_KIND.BLOCKING_CONTACT,
	),
};

export const provodOtVstavkiNDO_komandaOtkrytSPTKDoNejtrali: CircuitElement = {
	id: WIRE_NDO_CMD_OPEN_PTK_TO_NEUTRAL_ID,
	name: 'Провод от вставки NDO (команда открыть с ПТК) до точки команд открыть',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_NDO_CMD_PTK_INPUT_POINT_ID,
	endPoint: COMANDS_OPEN_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_NDO_CMD_OPEN_PTK_TO_NEUTRAL_ID,
		ELEMENT_KIND.WIRE,
	),
};

// Блокировка и катушка (c.3.0.4.1.0.1.*)
export const provodPeredBlokirovkojOtkrytie: CircuitElement = {
	id: WIRE_BEFORE_INTERLOCK_OPEN_ID,
	name: 'Провод перед блокировкой (открытие)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: COMANDS_OPEN_POINT_ID,
	endPoint: OPEN_INTERLOCK_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_INTERLOCK_OPEN_ID, ELEMENT_KIND.WIRE),
};

export const blokirovkaVklyucheniaPuskatelyaNaOtkrytie: CircuitElement = {
	id: INTERLOCK_OPEN_ID,
	name: 'Блокировка включения пускателя на открытие',
	kind: ELEMENT_KIND.BLOCKING_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.BLOCKING_CONTACT),
	startPoint: OPEN_INTERLOCK_INPUT_POINT_ID,
	endPoint: OPEN_INTERLOCK_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(INTERLOCK_OPEN_ID, ELEMENT_KIND.BLOCKING_CONTACT),
};

export const provodOtBlokirovkiDoKatushkiOtkrytie: CircuitElement = {
	id: WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID,
	name: 'Провод от блокировки до катушки (открытие)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_INTERLOCK_OUTPUT_POINT_ID,
	endPoint: OPEN_COIL_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const katushkaPuskatelyaOtkryt: CircuitElement = {
	id: COIL_OPEN_ID,
	name: 'Катушка пускателя открыть',
	kind: ELEMENT_KIND.COIL,
	resistance: getResistanceByKind(ELEMENT_KIND.COIL),
	startPoint: OPEN_COIL_INPUT_POINT_ID,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(COIL_OPEN_ID, ELEMENT_KIND.COIL),
};

// Кнопка КРУЗА-П (c.3.0.4.1.0.1.*)
export const provodPeredKnopkojKRUZAP_komandaOtkryt: CircuitElement = {
	id: WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID,
	name: 'Провод перед кнопкой КРУЗА-П (открыть)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_TERMINAL_BLOCK_POINT_ID,
	endPoint: OPEN_BUTTON_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID, ELEMENT_KIND.WIRE),
};

export const knopkaKRUZAP_komandaOtkryt: CircuitElement = {
	id: BUTTON_KRUZA_P_OPEN_ID,
	name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
	kind: ELEMENT_KIND.BLOCKING_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.BLOCKING_CONTACT),
	startPoint: OPEN_BUTTON_INPUT_POINT_ID,
	endPoint: OPEN_BUTTON_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(BUTTON_KRUZA_P_OPEN_ID, ELEMENT_KIND.BLOCKING_CONTACT),
};

export const provodOtKnopkiKRUZAP_komandaOtkrytDoNejtrali: CircuitElement = {
	id: WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	name: 'Провод от кнопки КРУЗА-П (открыть) до нейтрали',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_BUTTON_OUTPUT_POINT_ID,
	endPoint: COMANDS_OPEN_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
		ELEMENT_KIND.WIRE,
	),
};

// Лампа в КРУЗА-П (закрыто) - c.3.0.4.2.*
export const provodPeredLampojVKRUZAP_zakryto: CircuitElement = {
	id: WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
	name: 'Провод перед лампой в КРУЗА-П (закрыто)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_TERMINAL_BLOCK_POINT_ID,
	endPoint: CLOSED_LAMP_BRANCH_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID, ELEMENT_KIND.WIRE),
};

export const lampaVKRUZAP_zakryto: CircuitElement = {
	id: LAMP_KRUZA_P_CLOSED_ID,
	name: 'Лампа в КРУЗА-П закрыто',
	kind: ELEMENT_KIND.LAMP,
	resistance: getResistanceByKind(ELEMENT_KIND.LAMP),
	startPoint: CLOSED_LAMP_BRANCH_POINT_ID,
	endPoint: CLOSED_LAMP_TO_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(LAMP_KRUZA_P_CLOSED_ID, ELEMENT_KIND.LAMP),
};

export const provodOtLampyVKRUZAP_zakrytoDoNejtrali: CircuitElement = {
	id: WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID,
	name: 'Провод от лампы в КРУЗА-П (закрыто) до нейтрали',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSED_LAMP_TO_NEUTRAL_POINT_ID,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID,
		ELEMENT_KIND.WIRE,
	),
};

// ======================== Ветка ЗАКРЫТЬ (c.3.1.*) ========================
export const jumperOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto: CircuitElement =
	{
		id: JUMPER_BOX_TO_LIMIT_CLOSE_ID,
		name: 'Провод от соединительной коробки до концевого выключателя закрыто',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: CONTROL_BREAKER_OUTPUT_POINT_ID,
		endPoint: CLOSE_JUNCTION_BOX_POINT_ID,
		malfunctions: buildMalfunctions(JUMPER_BOX_TO_LIMIT_CLOSE_ID, ELEMENT_KIND.WIRE),
	};
// Аналогичная структура для ветки закрыть
export const provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto: CircuitElement =
	{
		id: WIRE_BOX_TO_LIMIT_CLOSE_ID,
		name: 'Провод от соединительной коробки до концевого выключателя закрыто',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: CLOSE_JUNCTION_BOX_POINT_ID,
		endPoint: CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
		malfunctions: buildMalfunctions(WIRE_BOX_TO_LIMIT_CLOSE_ID, ELEMENT_KIND.WIRE),
	};

export const kontsevojVyklyuchatelZakryto: CircuitElement = {
	id: LIMIT_SWITCH_CLOSE_ID,
	name: 'Концевой выключатель закрыто',
	kind: ELEMENT_KIND.LIMIT_SWITCH,
	resistance: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH),
	startPoint: CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
	endPoint: CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(LIMIT_SWITCH_CLOSE_ID, ELEMENT_KIND.LIMIT_SWITCH),
};

export const provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP: CircuitElement =
	{
		id: WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
		name: 'Провод от концевого выключателя закрыто до клеммника',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
		endPoint: CLOSE_TERMINAL_BLOCK_POINT_ID,
		malfunctions: buildMalfunctions(
			WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
			ELEMENT_KIND.WIRE,
		),
	};

export const provodOtKlemmikaDoVstavkiNDI_signalNeZakryto: CircuitElement = {
	id: WIRE_BEFORE_NDI_NOT_CLOSED_ID,
	name: 'Провод от клеммника до вставки NDI (сигнал не закрыто)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_TERMINAL_BLOCK_POINT_ID,
	endPoint: CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_NDI_NOT_CLOSED_ID, ELEMENT_KIND.WIRE),
};

export const vstavkaNDI_signalNeZakryto: CircuitElement = {
	id: INSERT_NDI_NOT_CLOSED_ID,
	name: 'Вставка NDI (сигнал «не закрыто»)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID,
	endPoint: CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(INSERT_NDI_NOT_CLOSED_ID, ELEMENT_KIND.WIRE),
};

export const provodOtVstavkiNDI_signalNeZakrytoDoNejtrali: CircuitElement = {
	id: WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID,
	name: 'Провод от вставки NDI (сигнал не закрыто) до нейтрали',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID, ELEMENT_KIND.WIRE),
};

export const provodPeredVstavkojNDO_komandaZakrytSPTK: CircuitElement = {
	id: WIRE_BEFORE_NDO_CMD_CLOSE_PTK_ID,
	name: 'Провод перед вставкой NDO (команда закрыть с ПТК)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_TERMINAL_BLOCK_POINT_ID,
	endPoint: CLOSE_CMD_PTK_BRANCH_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_NDO_CMD_CLOSE_PTK_ID, ELEMENT_KIND.WIRE),
};

export const vstavkaNDO_komandaZakrytSPTK: CircuitElement = {
	id: INSERT_NDO_CMD_CLOSE_PTK_ID,
	name: 'Вставка NDO (команда закрыть с ПТК)',
	kind: ELEMENT_KIND.BLOCKING_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.BLOCKING_CONTACT),
	startPoint: CLOSE_CMD_PTK_BRANCH_POINT_ID,
	endPoint: CLOSE_NDO_CMD_PTK_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(
		INSERT_NDO_CMD_CLOSE_PTK_ID,
		ELEMENT_KIND.BLOCKING_CONTACT,
	),
};

export const provodOtVstavkiNDO_komandaZakrytSPTKDoNejtrali: CircuitElement = {
	id: WIRE_NDO_CMD_CLOSE_PTK_TO_NEUTRAL_ID,
	name: 'Провод от вставки NDO (команда закрыть с ПТК) до нейтрали',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_NDO_CMD_PTK_INPUT_POINT_ID,
	endPoint: COMMANDS_CLOSE_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_NDO_CMD_CLOSE_PTK_TO_NEUTRAL_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const provodPeredBlokirovkojZakrytie: CircuitElement = {
	id: WIRE_BEFORE_INTERLOCK_CLOSE_ID,
	name: 'Провод перед блокировкой (закрытие)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: COMMANDS_CLOSE_POINT_ID,
	endPoint: CLOSE_INTERLOCK_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_INTERLOCK_CLOSE_ID, ELEMENT_KIND.WIRE),
};

export const blokirovkaVklyucheniaPuskatelyaNaZakrytie: CircuitElement = {
	id: INTERLOCK_CLOSE_ID,
	name: 'Блокировка включения пускателя на закрыть',
	kind: ELEMENT_KIND.BLOCKING_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.BLOCKING_CONTACT),
	startPoint: CLOSE_INTERLOCK_INPUT_POINT_ID,
	endPoint: CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(INTERLOCK_CLOSE_ID, ELEMENT_KIND.BLOCKING_CONTACT),
};

export const provodOtBlokirovkiDoKatushkiZakrytie: CircuitElement = {
	id: WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID,
	name: 'Провод от блокировки до катушки (закрытие)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	endPoint: CLOSE_COIL_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const katushkaPuskatelyaZakryt: CircuitElement = {
	id: COIL_CLOSE_ID,
	name: 'Катушка пускателя закрыть',
	kind: ELEMENT_KIND.COIL,
	resistance: getResistanceByKind(ELEMENT_KIND.COIL),
	startPoint: CLOSE_COIL_INPUT_POINT_ID,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(COIL_CLOSE_ID, ELEMENT_KIND.COIL),
};

export const provodPeredKnopkojKRUZAP_komandaZakryt: CircuitElement = {
	id: WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
	name: 'Провод перед кнопкой КРУЗА-П (закрыть)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_TERMINAL_BLOCK_POINT_ID,
	endPoint: CLOSE_BUTTON_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const knopkaKRUZAP_komandaZakryt: CircuitElement = {
	id: BUTTON_KRUZA_P_CLOSE_ID,
	name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
	kind: ELEMENT_KIND.BLOCKING_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.BLOCKING_CONTACT),
	startPoint: CLOSE_BUTTON_INPUT_POINT_ID,
	endPoint: CLOSE_BUTTON_OUTPUT_POINT_ID,
	malfunctions: buildMalfunctions(BUTTON_KRUZA_P_CLOSE_ID, ELEMENT_KIND.BLOCKING_CONTACT),
};

export const provodOtKnopkiKRUZAP_komandaZakrytDoNejtrali: CircuitElement = {
	id: WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
	name: 'Провод от кнопки КРУЗА-П (закрыть) до нейтрали',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_BUTTON_OUTPUT_POINT_ID,
	endPoint: COMMANDS_CLOSE_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const provodPeredLampojVKRUZAP_otkryto: CircuitElement = {
	id: WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
	name: 'Провод перед лампой в КРУЗА-П (открыто)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: CLOSE_TERMINAL_BLOCK_POINT_ID,
	endPoint: OPEN_LAMP_BRANCH_POINT_ID,
	malfunctions: buildMalfunctions(WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID, ELEMENT_KIND.WIRE),
};

export const lampaVKRUZAP_otkryto: CircuitElement = {
	id: LAMP_KRUZA_P_OPEN_ID,
	name: 'Лампа в КРУЗА-П открыто',
	kind: ELEMENT_KIND.LAMP,
	resistance: getResistanceByKind(ELEMENT_KIND.LAMP),
	startPoint: OPEN_LAMP_BRANCH_POINT_ID,
	endPoint: OPEN_LAMP_INPUT_POINT_ID,
	malfunctions: buildMalfunctions(LAMP_KRUZA_P_OPEN_ID, ELEMENT_KIND.LAMP),
};

export const provodOtLampyVKRUZAP_otkrytoDoNejtrali: CircuitElement = {
	id: WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	name: 'Провод от лампы в КРУЗА-П (открыто) до нейтрали',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: OPEN_LAMP_INPUT_POINT_ID,
	endPoint: CONTROL_NEUTRAL_POINT_ID,
	malfunctions: buildMalfunctions(
		WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID,
		ELEMENT_KIND.WIRE,
	),
};

/**
 * Структура controlCircuit — массив с вложенными подмассивами (ветвлениями).
 * Аналогично powerCircuit: вложенный массив = параллельное ветвление.
 * Импортированные переменные — camelCase русские названия элементов.
 */
export const controlCircuit: CircuitBranch[] = [
	// Общая часть
	provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya,
	avtomatPitaniyaSkhemyUpravleniya,
	provodFazyPosleAvtomata,
	[
		// Параллельное ветвление: ветка ОТКРЫТЬ и ветка ЗАКРЫТЬ
		[
			// Ветка ОТКРЫТЬ (c.3.0.*)
			jumperOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto,
			provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto,
			kontsevojVyklyuchatelOtkryto,
			provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZAP,
			[
				// Параллельные подветки от клеммника КРУЗА-П (ветка открыть)
				// 1) Вставка NDO «не открыто»: провод -> вставка -> нейтраль
				[
					provodOtKlemmikaDoVstavkiNDI_signalNeOtkryto,
					vstavkaNDI_signalNeOtkryto,
					provodOtVstavkiNDI_signalNeOtkrytoDoNejtrali,
				],
				// 2) Команда открыть с ПТК: вставка -> блокировка -> катушка -> (провод к нейтрали)
				[
					[
						[
							provodPeredVstavkojNDO_komandaOtkrytSPTK,
							vstavkaNDO_komandaOtkrytSPTK,
							provodOtVstavkiNDO_komandaOtkrytSPTKDoNejtrali,
						],
						[
							provodPeredKnopkojKRUZAP_komandaOtkryt,
							knopkaKRUZAP_komandaOtkryt,
							provodOtKnopkiKRUZAP_komandaOtkrytDoNejtrali,
						],
					],
					provodPeredBlokirovkojOtkrytie,
					blokirovkaVklyucheniaPuskatelyaNaOtkrytie,
					katushkaPuskatelyaOtkryt,
					provodOtVstavkiNDO_komandaOtkrytSPTKDoNejtrali,
				],
				// 4) Лампа «закрыто»: лампа -> нейтраль
				[lampaVKRUZAP_zakryto, provodOtLampyVKRUZAP_zakrytoDoNejtrali],
			],
		],
		[
			// Ветка ЗАКРЫТЬ (c.3.1.*)
			jumperOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
			provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
			kontsevojVyklyuchatelZakryto,
			provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZAP,
			[
				// Параллельные подветки от клеммника КРУЗА-П (ветка закрыть)
				// 1) Вставка NDO «не закрыто»: провод -> вставка -> нейтраль
				[
					provodOtKlemmikaDoVstavkiNDI_signalNeZakryto,
					vstavkaNDI_signalNeZakryto,
					provodOtVstavkiNDI_signalNeZakrytoDoNejtrali,
				],
				// 2) Команда закрыть с ПТК: вставка -> блокировка -> катушка -> (провод к нейтрали)
				[
					[
						[
							provodPeredVstavkojNDO_komandaZakrytSPTK,
							vstavkaNDO_komandaZakrytSPTK,
							provodOtVstavkiNDO_komandaZakrytSPTKDoNejtrali,
						],
						[
							provodPeredKnopkojKRUZAP_komandaZakryt,
							knopkaKRUZAP_komandaZakryt,
							provodOtKnopkiKRUZAP_komandaZakrytDoNejtrali,
						],
					],
					provodPeredBlokirovkojZakrytie,
					blokirovkaVklyucheniaPuskatelyaNaZakrytie,
					katushkaPuskatelyaZakryt,
					provodOtVstavkiNDO_komandaZakrytSPTKDoNejtrali,
				],
				// 3) Лампа «открыто»: лампа -> нейтраль
				[lampaVKRUZAP_otkryto, provodOtLampyVKRUZAP_otkrytoDoNejtrali],
			],
		],
	],
];
