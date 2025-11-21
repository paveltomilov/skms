/**
 * Структура powerCircuit — массив с вложенными подмассивами (ветвлениями).
 * Аналогично controlCircuit: вложенный массив = параллельное ветвление.
 * Импортированные переменные — camelCase русские названия элементов.
 */

/**
 * Элементы силовой схемы (powerCircuit).
 * Каждая переменная содержит полный объект элемента с id, name, resistance и malfunctions.
 * Структура аналогична controlCircuit.
 */
import { CircuitBranch } from '../../types/scheme';
import type { CircuitElement } from '@/shared/types/scheme';
import {
	WIRE_PHASE_A_TO_INPUT_BREAKER_ID,
	INPUT_BREAKER_CONTACT_PHASE_A_ID,
	WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_A_ID,
	WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_A_ID,
	WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_A_ID,
	STARTER_CONTACT_OPEN_PHASE_A_ID,
	STARTER_CONTACT_CLOSE_PHASE_A_ID,
	WIRE_FROM_STARTER_OPEN_PHASE_A_ID,
	WIRE_FROM_STARTER_CLOSE_PHASE_C_ID,
	WIRE_AFTER_STARTERS_PHASE_A_ID,
	WIRE_TO_JUNCTION_BOX_PHASE_A_ID,
	WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_A_ID,
	MOTOR_WINDING_PHASE_A_ID,
	WIRE_PHASE_B_TO_INPUT_BREAKER_ID,
	INPUT_BREAKER_CONTACT_PHASE_B_ID,
	WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_B_ID,
	WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_B_ID,
	WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_B_ID,
	STARTER_CONTACT_OPEN_PHASE_B_ID,
	STARTER_CONTACT_CLOSE_PHASE_B_ID,
	WIRE_FROM_STARTER_OPEN_PHASE_B_ID,
	WIRE_FROM_STARTER_CLOSE_PHASE_B_ID,
	WIRE_AFTER_STARTERS_PHASE_B_ID,
	WIRE_TO_JUNCTION_BOX_PHASE_B_ID,
	WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_B_ID,
	MOTOR_WINDING_PHASE_B_ID,
	WIRE_PHASE_C_TO_INPUT_BREAKER_ID,
	INPUT_BREAKER_CONTACT_PHASE_C_ID,
	WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_C_ID,
	WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_C_ID,
	WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_C_ID,
	STARTER_CONTACT_OPEN_PHASE_C_ID,
	STARTER_CONTACT_CLOSE_PHASE_C_ID,
	WIRE_FROM_STARTER_OPEN_PHASE_C_ID,
	WIRE_FROM_STARTER_CLOSE_PHASE_A_ID,
	WIRE_AFTER_STARTERS_PHASE_C_ID,
	WIRE_TO_JUNCTION_BOX_PHASE_C_ID,
	WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_C_ID,
	MOTOR_WINDING_PHASE_C_ID,
	// Точки
	PHASE_A_POINT_ID,
	PHASE_B_POINT_ID,
	PHASE_C_POINT_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_A_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	MERGE_POINT_AFTER_STARTERS_PHASE_A_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_A_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_B_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_B_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_C_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,
	MERGE_POINT_AFTER_STARTERS_PHASE_C_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_C_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID,
	POWER_CIRCUIT_NEUTRAL_ID,
} from './constants';
import { buildMalfunctions } from '../malfunctionTemplates';
import {
	getResistanceByKind,
	ELEMENT_KIND,
} from '../../utils/getResistanceByKind/getResistanceByKind';

// ======================== Фаза A (p.0.0.*) ========================

export const provodFazyADoVvodnogoAvtomata: CircuitElement = {
	id: WIRE_PHASE_A_TO_INPUT_BREAKER_ID,
	name: 'Провод фазы A до вводного автомата',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: PHASE_A_POINT_ID,
	endPoint: INPUT_BREAKER_INPUT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(WIRE_PHASE_A_TO_INPUT_BREAKER_ID, ELEMENT_KIND.WIRE),
};

export const kontaktVvodnogoAvtomataFazaA: CircuitElement = {
	id: INPUT_BREAKER_CONTACT_PHASE_A_ID,
	name: 'Контакт вводного автомата фаза A',
	kind: ELEMENT_KIND.BREAKER,
	resistance: getResistanceByKind(ELEMENT_KIND.BREAKER),
	startPoint: INPUT_BREAKER_INPUT_POINT_PHASE_A_ID,
	endPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		INPUT_BREAKER_CONTACT_PHASE_A_ID,
		ELEMENT_KIND.BREAKER,
	),
};

export const provodOtAvtomataFazaADoKlemmikaPeredPuskatelyami: CircuitElement =
	{
		id: WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_A_ID,
		name: 'Провод от автомата фаза A до клемника перед пускателями',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID,
		endPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
		malfunctions: buildMalfunctions(
			WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_A_ID,
			ELEMENT_KIND.WIRE,
		),
	};

export const provodOtKlemmikaDoPuskatelyaOtkrytoFazaA: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_A_ID,
	name: 'Провод от клемника до пускателя открыто фаза A',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
	endPoint: POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_A_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const kontaktPuskatelyaOtkrytoFazaA: CircuitElement = {
	id: STARTER_CONTACT_OPEN_PHASE_A_ID,
	name: 'Контакт пускателя открыто фаза A',
	kind: ELEMENT_KIND.STARTER_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.STARTER_CONTACT),
	startPoint: POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	endPoint: POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_OPEN_PHASE_A_ID,
		ELEMENT_KIND.STARTER_CONTACT,
	),
};

export const provodOtPuskatelyaOtkrytoFazaA: CircuitElement = {
	id: WIRE_FROM_STARTER_OPEN_PHASE_A_ID,
	name: 'Провод от пускателя открыто фаза A',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_A_ID,
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_OPEN_PHASE_A_ID, ELEMENT_KIND.WIRE),
};

export const provodOtKlemmikaDoPuskatelyaZakrytoFazaA: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_A_ID,
	name: 'Провод от клемника до пускателя закрыто фаза A',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
	endPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_A_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const kontaktPuskatelyaZakrytoFazaA: CircuitElement = {
	id: STARTER_CONTACT_CLOSE_PHASE_A_ID,
	name: 'Контакт пускателя закрыто фаза A',
	kind: ELEMENT_KIND.STARTER_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.STARTER_CONTACT),
	startPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	endPoint: POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_CLOSE_PHASE_A_ID,
		ELEMENT_KIND.STARTER_CONTACT,
	),
};

// Провод от контакта пускателя закрыто фазы A идет к точке после пускателей фазы C (реверс)
export const provodOtKontaktaPuskatelyaZakrytoFazaADoFazyC: CircuitElement = {
	id: WIRE_FROM_STARTER_CLOSE_PHASE_A_ID,
	name: 'Провод от контакта пускателя закрыто фаза A (для реверса, к фазе C)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_C_ID, // Идет к фазе C для реверса
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_CLOSE_PHASE_A_ID, ELEMENT_KIND.WIRE),
};

export const provodPoslePuskateleyFazaA: CircuitElement = {
	id: WIRE_AFTER_STARTERS_PHASE_A_ID,
	name: 'Провод после пускателей фаза A',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: MERGE_POINT_AFTER_STARTERS_PHASE_A_ID,
	endPoint: JUNCTION_BOX_INPUT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(WIRE_AFTER_STARTERS_PHASE_A_ID, ELEMENT_KIND.WIRE),
};

export const provodDoSoyedinitelnojKorobkiFazaA: CircuitElement = {
	id: WIRE_TO_JUNCTION_BOX_PHASE_A_ID,
	name: 'Провод до соединительной коробки фаза A',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: JUNCTION_BOX_INPUT_POINT_PHASE_A_ID,
	endPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(WIRE_TO_JUNCTION_BOX_PHASE_A_ID, ELEMENT_KIND.WIRE),
};

export const provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaA: CircuitElement = {
	id: WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_A_ID,
	name: 'Провод от соединительной коробки до двигателя фаза A',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID,
	endPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_A_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const obmotkaDvigatelyaFazaA: CircuitElement = {
	id: MOTOR_WINDING_PHASE_A_ID,
	name: 'Обмотка двигателя фаза A',
	kind: ELEMENT_KIND.MOTOR_WINDING,
	resistance: getResistanceByKind(ELEMENT_KIND.MOTOR_WINDING),
	startPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID,
	endPoint: POWER_CIRCUIT_NEUTRAL_ID, // Нейтраль
	malfunctions: buildMalfunctions(MOTOR_WINDING_PHASE_A_ID, ELEMENT_KIND.MOTOR_WINDING),
};

// ======================== Фаза B (p.0.1.*) ========================

export const provodFazyBDoVvodnogoAvtomata: CircuitElement = {
	id: WIRE_PHASE_B_TO_INPUT_BREAKER_ID,
	name: 'Провод фазы B до вводного автомата',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: PHASE_B_POINT_ID,
	endPoint: INPUT_BREAKER_INPUT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_PHASE_B_TO_INPUT_BREAKER_ID, ELEMENT_KIND.WIRE),
};

export const kontaktVvodnogoAvtomataFazaB: CircuitElement = {
	id: INPUT_BREAKER_CONTACT_PHASE_B_ID,
	name: 'Контакт вводного автомата фаза B',
	kind: ELEMENT_KIND.BREAKER,
	resistance: getResistanceByKind(ELEMENT_KIND.BREAKER),
	startPoint: INPUT_BREAKER_INPUT_POINT_PHASE_B_ID,
	endPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		INPUT_BREAKER_CONTACT_PHASE_B_ID,
		ELEMENT_KIND.BREAKER,
	),
};

export const provodOtAvtomataFazaBDoKlemmikaPeredPuskatelyami: CircuitElement =
	{
		id: WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_B_ID,
		name: 'Провод от автомата фаза B до клемника перед пускателями',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID,
		endPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
		malfunctions: buildMalfunctions(
			WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_B_ID,
			ELEMENT_KIND.WIRE,
		),
	};

export const provodOtKlemmikaDoPuskatelyaOtkrytoFazaB: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_B_ID,
	name: 'Провод от клемника до пускателя открыто фаза B',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
	endPoint: POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_B_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const kontaktPuskatelyaOtkrytoFazaB: CircuitElement = {
	id: STARTER_CONTACT_OPEN_PHASE_B_ID,
	name: 'Контакт пускателя открыто фаза B',
	kind: ELEMENT_KIND.STARTER_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.STARTER_CONTACT),
	startPoint: POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	endPoint: POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_OPEN_PHASE_B_ID,
		ELEMENT_KIND.STARTER_CONTACT,
	),
};

export const provodOtPuskatelyaOtkrytoFazaB: CircuitElement = {
	id: WIRE_FROM_STARTER_OPEN_PHASE_B_ID,
	name: 'Провод от пускателя открыто фаза B',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_OPEN_PHASE_B_ID, ELEMENT_KIND.WIRE),
};

export const provodOtKlemmikaDoPuskatelyaZakrytoFazaB: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_B_ID,
	name: 'Провод от клемника до пускателя закрыто фаза B',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
	endPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_B_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const kontaktPuskatelyaZakrytoFazaB: CircuitElement = {
	id: STARTER_CONTACT_CLOSE_PHASE_B_ID,
	name: 'Контакт пускателя закрыто фаза B',
	kind: ELEMENT_KIND.STARTER_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.STARTER_CONTACT),
	startPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	endPoint: POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_CLOSE_PHASE_B_ID,
		ELEMENT_KIND.STARTER_CONTACT,
	),
};

export const provodOtPuskatelyaZakrytoFazaB: CircuitElement = {
	id: WIRE_FROM_STARTER_CLOSE_PHASE_B_ID,
	name: 'Провод от пускателя закрыто фаза B',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_CLOSE_PHASE_B_ID, ELEMENT_KIND.WIRE),
};

export const provodPoslePuskateleyFazaB: CircuitElement = {
	id: WIRE_AFTER_STARTERS_PHASE_B_ID,
	name: 'Провод после пускателей фаза B',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	endPoint: JUNCTION_BOX_INPUT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_AFTER_STARTERS_PHASE_B_ID, ELEMENT_KIND.WIRE),
};

export const provodDoSoyedinitelnojKorobkiFazaB: CircuitElement = {
	id: WIRE_TO_JUNCTION_BOX_PHASE_B_ID,
	name: 'Провод до соединительной коробки фаза B',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: JUNCTION_BOX_INPUT_POINT_PHASE_B_ID,
	endPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_TO_JUNCTION_BOX_PHASE_B_ID, ELEMENT_KIND.WIRE),
};

export const provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaB: CircuitElement = {
	id: WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_B_ID,
	name: 'Провод от соединительной коробки до двигателя фаза B',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID,
	endPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_B_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const obmotkaDvigatelyaFazaB: CircuitElement = {
	id: MOTOR_WINDING_PHASE_B_ID,
	name: 'Обмотка двигателя фаза B',
	kind: ELEMENT_KIND.MOTOR_WINDING,
	resistance: getResistanceByKind(ELEMENT_KIND.MOTOR_WINDING),
	startPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID,
	endPoint: POWER_CIRCUIT_NEUTRAL_ID, // Нейтраль
	malfunctions: buildMalfunctions(MOTOR_WINDING_PHASE_B_ID, ELEMENT_KIND.MOTOR_WINDING),
};

// ======================== Фаза C (p.0.2.*) ========================

export const provodFazyCDoVvodnogoAvtomata: CircuitElement = {
	id: WIRE_PHASE_C_TO_INPUT_BREAKER_ID,
	name: 'Провод фазы C до вводного автомата',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: PHASE_C_POINT_ID,
	endPoint: INPUT_BREAKER_INPUT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(WIRE_PHASE_C_TO_INPUT_BREAKER_ID, ELEMENT_KIND.WIRE),
};

export const kontaktVvodnogoAvtomataFazaC: CircuitElement = {
	id: INPUT_BREAKER_CONTACT_PHASE_C_ID,
	name: 'Контакт вводного автомата фаза C',
	kind: ELEMENT_KIND.BREAKER,
	resistance: getResistanceByKind(ELEMENT_KIND.BREAKER),
	startPoint: INPUT_BREAKER_INPUT_POINT_PHASE_C_ID,
	endPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		INPUT_BREAKER_CONTACT_PHASE_C_ID,
		ELEMENT_KIND.BREAKER,
	),
};

export const provodOtAvtomataFazaCDoKlemmikaPeredPuskatelyami: CircuitElement =
	{
		id: WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_C_ID,
		name: 'Провод от автомата фаза C до клемника перед пускателями',
		kind: ELEMENT_KIND.WIRE,
		resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
		startPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID,
		endPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
		malfunctions: buildMalfunctions(
			WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_C_ID,
			ELEMENT_KIND.WIRE,
		),
	};

export const provodOtKlemmikaDoPuskatelyaOtkrytoFazaC: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_C_ID,
	name: 'Провод от клемника до пускателя открыто фаза C',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
	endPoint: POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_C_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const kontaktPuskatelyaOtkrytoFazaC: CircuitElement = {
	id: STARTER_CONTACT_OPEN_PHASE_C_ID,
	name: 'Контакт пускателя открыто фаза C',
	kind: ELEMENT_KIND.STARTER_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.STARTER_CONTACT),
	startPoint: POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	endPoint: POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_OPEN_PHASE_C_ID,
		ELEMENT_KIND.STARTER_CONTACT,
	),
};

export const provodOtPuskatelyaOtkrytoFazaC: CircuitElement = {
	id: WIRE_FROM_STARTER_OPEN_PHASE_C_ID,
	name: 'Провод от пускателя открыто фаза C',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_C_ID,
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_OPEN_PHASE_C_ID, ELEMENT_KIND.WIRE),
};

export const provodOtKlemmikaDoPuskatelyaZakrytoFazaC: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_C_ID,
	name: 'Провод от клемника до пускателя закрыто фаза C',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
	endPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_C_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const kontaktPuskatelyaZakrytoFazaC: CircuitElement = {
	id: STARTER_CONTACT_CLOSE_PHASE_C_ID,
	name: 'Контакт пускателя закрыто фаза C',
	kind: ELEMENT_KIND.STARTER_CONTACT,
	resistance: getResistanceByKind(ELEMENT_KIND.STARTER_CONTACT),
	startPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	endPoint: POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_CLOSE_PHASE_C_ID,
		ELEMENT_KIND.STARTER_CONTACT,
	),
};

// Провод от контакта пускателя закрыто фазы C идет к точке после пускателей фазы A (реверс)
export const provodOtKontaktaPuskatelyaZakrytoFazaCDoFazyA: CircuitElement = {
	id: WIRE_FROM_STARTER_CLOSE_PHASE_C_ID,
	name: 'Провод от контакта пускателя закрыто фаза C (для реверса, к фазе A)',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_A_ID, // Идет к фазе A для реверса
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_CLOSE_PHASE_C_ID, ELEMENT_KIND.WIRE),
};

export const provodPoslePuskateleyFazaC: CircuitElement = {
	id: WIRE_AFTER_STARTERS_PHASE_C_ID,
	name: 'Провод после пускателей фаза C',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: MERGE_POINT_AFTER_STARTERS_PHASE_C_ID,
	endPoint: JUNCTION_BOX_INPUT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(WIRE_AFTER_STARTERS_PHASE_C_ID, ELEMENT_KIND.WIRE),
};

export const provodDoSoyedinitelnojKorobkiFazaC: CircuitElement = {
	id: WIRE_TO_JUNCTION_BOX_PHASE_C_ID,
	name: 'Провод до соединительной коробки фаза C',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: JUNCTION_BOX_INPUT_POINT_PHASE_C_ID,
	endPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(WIRE_TO_JUNCTION_BOX_PHASE_C_ID, ELEMENT_KIND.WIRE),
};

export const provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaC: CircuitElement = {
	id: WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_C_ID,
	name: 'Провод от соединительной коробки до двигателя фаза C',
	kind: ELEMENT_KIND.WIRE,
	resistance: getResistanceByKind(ELEMENT_KIND.WIRE),
	startPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID,
	endPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_C_ID,
		ELEMENT_KIND.WIRE,
	),
};

export const obmotkaDvigatelyaFazaC: CircuitElement = {
	id: MOTOR_WINDING_PHASE_C_ID,
	name: 'Обмотка двигателя фаза C',
	kind: ELEMENT_KIND.MOTOR_WINDING,
	resistance: getResistanceByKind(ELEMENT_KIND.MOTOR_WINDING),
	startPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID,
	endPoint: POWER_CIRCUIT_NEUTRAL_ID, // Нейтраль
	malfunctions: buildMalfunctions(MOTOR_WINDING_PHASE_C_ID, ELEMENT_KIND.MOTOR_WINDING),
};

/**
 * Структура powerCircuit — массив с вложенными подмассивами (ветвлениями).
 * Аналогично controlCircuit: вложенный массив = параллельное ветвление.
 * Импортированные переменные — camelCase русские названия элементов.
 */
export const powerCircuit: CircuitBranch[] = [
	// Фаза A
	[
		provodFazyADoVvodnogoAvtomata,
		kontaktVvodnogoAvtomataFazaA,
		provodOtAvtomataFazaADoKlemmikaPeredPuskatelyami,
		[
			// Параллельное ветвление: пускатель открыть и пускатель закрыть
			[
				// Ветка пускателя открыть
				provodOtKlemmikaDoPuskatelyaOtkrytoFazaA,
				kontaktPuskatelyaOtkrytoFazaA,
				provodOtPuskatelyaOtkrytoFazaA,
			],
			[
				// Ветка пускателя закрыть
				provodOtKlemmikaDoPuskatelyaZakrytoFazaA,
				kontaktPuskatelyaZakrytoFazaA,
				provodOtKontaktaPuskatelyaZakrytoFazaADoFazyC,
			],
		],
		provodPoslePuskateleyFazaA,
		provodDoSoyedinitelnojKorobkiFazaA,
		provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaA,
		obmotkaDvigatelyaFazaA,
	],
	// Фаза B
	[
		provodFazyBDoVvodnogoAvtomata,
		kontaktVvodnogoAvtomataFazaB,
		provodOtAvtomataFazaBDoKlemmikaPeredPuskatelyami,
		[
			// Параллельное ветвление: пускатель открыть и пускатель закрыть
			[
				// Ветка пускателя открыть
				provodOtKlemmikaDoPuskatelyaOtkrytoFazaB,
				kontaktPuskatelyaOtkrytoFazaB,
				provodOtPuskatelyaOtkrytoFazaB,
			],
			[
				// Ветка пускателя закрыть
				provodOtKlemmikaDoPuskatelyaZakrytoFazaB,
				kontaktPuskatelyaZakrytoFazaB,
				provodOtPuskatelyaZakrytoFazaB,
			],
		],
		provodPoslePuskateleyFazaB,
		provodDoSoyedinitelnojKorobkiFazaB,
		provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaB,
		obmotkaDvigatelyaFazaB,
	],
	// Фаза C
	[
		provodFazyCDoVvodnogoAvtomata,
		kontaktVvodnogoAvtomataFazaC,
		provodOtAvtomataFazaCDoKlemmikaPeredPuskatelyami,
		[
			// Параллельное ветвление: пускатель открыть и пускатель закрыть
			[
				// Ветка пускателя открыть
				provodOtKlemmikaDoPuskatelyaOtkrytoFazaC,
				kontaktPuskatelyaOtkrytoFazaC,
				provodOtPuskatelyaOtkrytoFazaC,
			],
			[
				// Ветка пускателя закрыть
				provodOtKlemmikaDoPuskatelyaZakrytoFazaC,
				kontaktPuskatelyaZakrytoFazaC,
				provodOtKontaktaPuskatelyaZakrytoFazaCDoFazyA,
			],
		],
		provodPoslePuskateleyFazaC,
		provodDoSoyedinitelnojKorobkiFazaC,
		provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaC,
		obmotkaDvigatelyaFazaC,
	],
];
