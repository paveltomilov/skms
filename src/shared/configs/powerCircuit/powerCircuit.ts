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

// ======================== Фаза A (p.0.0.*) ========================

export const provodFazyADoVvodnogoAvtomata: CircuitElement = {
	id: WIRE_PHASE_A_TO_INPUT_BREAKER_ID,
	name: 'Провод фазы A до вводного автомата',
	resistance: 0.1,
	startPoint: PHASE_A_POINT_ID,
	endPoint: INPUT_BREAKER_INPUT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(WIRE_PHASE_A_TO_INPUT_BREAKER_ID, 'wire'),
};

export const kontaktVvodnogoAvtomataFazaA: CircuitElement = {
	id: INPUT_BREAKER_CONTACT_PHASE_A_ID,
	name: 'Контакт вводного автомата фаза A',
	resistance: 0,
	startPoint: INPUT_BREAKER_INPUT_POINT_PHASE_A_ID,
	endPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		INPUT_BREAKER_CONTACT_PHASE_A_ID,
		'breaker',
	),
};

export const provodOtAvtomataFazaADoKlemmikaPeredPuskatelyami: CircuitElement =
	{
		id: WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_A_ID,
		name: 'Провод от автомата фаза A до клемника перед пускателями',
		resistance: 0.1,
		startPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID,
		endPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
		malfunctions: buildMalfunctions(
			WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_A_ID,
			'wire',
		),
	};

export const provodOtKlemmikaDoPuskatelyaOtkrytoFazaA: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_A_ID,
	name: 'Провод от клемника до пускателя открыто фаза A',
	resistance: 0.1,
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
	endPoint: POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_A_ID,
		'wire',
	),
};

export const kontaktPuskatelyaOtkrytoFazaA: CircuitElement = {
	id: STARTER_CONTACT_OPEN_PHASE_A_ID,
	name: 'Контакт пускателя открыто фаза A',
	resistance: 0,
	startPoint: POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	endPoint: POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_OPEN_PHASE_A_ID,
		'starterContact',
	),
};

export const provodOtPuskatelyaOtkrytoFazaA: CircuitElement = {
	id: WIRE_FROM_STARTER_OPEN_PHASE_A_ID,
	name: 'Провод от пускателя открыто фаза A',
	resistance: 0.1,
	startPoint: POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_A_ID,
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_OPEN_PHASE_A_ID, 'wire'),
};

export const provodOtKlemmikaDoPuskatelyaZakrytoFazaA: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_A_ID,
	name: 'Провод от клемника до пускателя закрыто фаза A',
	resistance: 0.1,
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
	endPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_A_ID,
		'wire',
	),
};

export const kontaktPuskatelyaZakrytoFazaA: CircuitElement = {
	id: STARTER_CONTACT_CLOSE_PHASE_A_ID,
	name: 'Контакт пускателя закрыто фаза A',
	resistance: 0,
	startPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	endPoint: POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_CLOSE_PHASE_A_ID,
		'starterContact',
	),
};

// Провод от контакта пускателя закрыто фазы A идет к точке после пускателей фазы C (реверс)
export const provodOtKontaktaPuskatelyaZakrytoFazaADoFazyC: CircuitElement = {
	id: WIRE_FROM_STARTER_CLOSE_PHASE_A_ID,
	name: 'Провод от контакта пускателя закрыто фаза A (для реверса, к фазе C)',
	resistance: 0.1,
	startPoint: POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_C_ID, // Идет к фазе C для реверса
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_CLOSE_PHASE_A_ID, 'wire'),
};

export const provodPoslePuskateleyFazaA: CircuitElement = {
	id: WIRE_AFTER_STARTERS_PHASE_A_ID,
	name: 'Провод после пускателей фаза A',
	resistance: 0.1,
	startPoint: MERGE_POINT_AFTER_STARTERS_PHASE_A_ID,
	endPoint: JUNCTION_BOX_INPUT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(WIRE_AFTER_STARTERS_PHASE_A_ID, 'wire'),
};

export const provodDoSoyedinitelnojKorobkiFazaA: CircuitElement = {
	id: WIRE_TO_JUNCTION_BOX_PHASE_A_ID,
	name: 'Провод до соединительной коробки фаза A',
	resistance: 0.1,
	startPoint: JUNCTION_BOX_INPUT_POINT_PHASE_A_ID,
	endPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(WIRE_TO_JUNCTION_BOX_PHASE_A_ID, 'wire'),
};

export const provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaA: CircuitElement = {
	id: WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_A_ID,
	name: 'Провод от соединительной коробки до двигателя фаза A',
	resistance: 0.1,
	startPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID,
	endPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID,
	malfunctions: buildMalfunctions(
		WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_A_ID,
		'wire',
	),
};

export const obmotkaDvigatelyaFazaA: CircuitElement = {
	id: MOTOR_WINDING_PHASE_A_ID,
	name: 'Обмотка двигателя фаза A',
	resistance: 4100,
	startPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID,
	endPoint: POWER_CIRCUIT_NEUTRAL_ID, // Нейтраль
	malfunctions: buildMalfunctions(MOTOR_WINDING_PHASE_A_ID, 'motorWinding'),
};

// ======================== Фаза B (p.0.1.*) ========================

export const provodFazyBDoVvodnogoAvtomata: CircuitElement = {
	id: WIRE_PHASE_B_TO_INPUT_BREAKER_ID,
	name: 'Провод фазы B до вводного автомата',
	resistance: 0.1,
	startPoint: PHASE_B_POINT_ID,
	endPoint: INPUT_BREAKER_INPUT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_PHASE_B_TO_INPUT_BREAKER_ID, 'wire'),
};

export const kontaktVvodnogoAvtomataFazaB: CircuitElement = {
	id: INPUT_BREAKER_CONTACT_PHASE_B_ID,
	name: 'Контакт вводного автомата фаза B',
	resistance: 0,
	startPoint: INPUT_BREAKER_INPUT_POINT_PHASE_B_ID,
	endPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		INPUT_BREAKER_CONTACT_PHASE_B_ID,
		'breaker',
	),
};

export const provodOtAvtomataFazaBDoKlemmikaPeredPuskatelyami: CircuitElement =
	{
		id: WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_B_ID,
		name: 'Провод от автомата фаза B до клемника перед пускателями',
		resistance: 0.1,
		startPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID,
		endPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
		malfunctions: buildMalfunctions(
			WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_B_ID,
			'wire',
		),
	};

export const provodOtKlemmikaDoPuskatelyaOtkrytoFazaB: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_B_ID,
	name: 'Провод от клемника до пускателя открыто фаза B',
	resistance: 0.1,
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
	endPoint: POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_B_ID,
		'wire',
	),
};

export const kontaktPuskatelyaOtkrytoFazaB: CircuitElement = {
	id: STARTER_CONTACT_OPEN_PHASE_B_ID,
	name: 'Контакт пускателя открыто фаза B',
	resistance: 0,
	startPoint: POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	endPoint: POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_OPEN_PHASE_B_ID,
		'starterContact',
	),
};

export const provodOtPuskatelyaOtkrytoFazaB: CircuitElement = {
	id: WIRE_FROM_STARTER_OPEN_PHASE_B_ID,
	name: 'Провод от пускателя открыто фаза B',
	resistance: 0.1,
	startPoint: POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_OPEN_PHASE_B_ID, 'wire'),
};

export const provodOtKlemmikaDoPuskatelyaZakrytoFazaB: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_B_ID,
	name: 'Провод от клемника до пускателя закрыто фаза B',
	resistance: 0.1,
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
	endPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_B_ID,
		'wire',
	),
};

export const kontaktPuskatelyaZakrytoFazaB: CircuitElement = {
	id: STARTER_CONTACT_CLOSE_PHASE_B_ID,
	name: 'Контакт пускателя закрыто фаза B',
	resistance: 0,
	startPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	endPoint: POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_CLOSE_PHASE_B_ID,
		'starterContact',
	),
};

export const provodOtPuskatelyaZakrytoFazaB: CircuitElement = {
	id: WIRE_FROM_STARTER_CLOSE_PHASE_B_ID,
	name: 'Провод от пускателя закрыто фаза B',
	resistance: 0.1,
	startPoint: POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_CLOSE_PHASE_B_ID, 'wire'),
};

export const provodPoslePuskateleyFazaB: CircuitElement = {
	id: WIRE_AFTER_STARTERS_PHASE_B_ID,
	name: 'Провод после пускателей фаза B',
	resistance: 0.1,
	startPoint: MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	endPoint: JUNCTION_BOX_INPUT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_AFTER_STARTERS_PHASE_B_ID, 'wire'),
};

export const provodDoSoyedinitelnojKorobkiFazaB: CircuitElement = {
	id: WIRE_TO_JUNCTION_BOX_PHASE_B_ID,
	name: 'Провод до соединительной коробки фаза B',
	resistance: 0.1,
	startPoint: JUNCTION_BOX_INPUT_POINT_PHASE_B_ID,
	endPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(WIRE_TO_JUNCTION_BOX_PHASE_B_ID, 'wire'),
};

export const provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaB: CircuitElement = {
	id: WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_B_ID,
	name: 'Провод от соединительной коробки до двигателя фаза B',
	resistance: 0.1,
	startPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID,
	endPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID,
	malfunctions: buildMalfunctions(
		WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_B_ID,
		'wire',
	),
};

export const obmotkaDvigatelyaFazaB: CircuitElement = {
	id: MOTOR_WINDING_PHASE_B_ID,
	name: 'Обмотка двигателя фаза B',
	resistance: 4100,
	startPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID,
	endPoint: POWER_CIRCUIT_NEUTRAL_ID, // Нейтраль
	malfunctions: buildMalfunctions(MOTOR_WINDING_PHASE_B_ID, 'motorWinding'),
};

// ======================== Фаза C (p.0.2.*) ========================

export const provodFazyCDoVvodnogoAvtomata: CircuitElement = {
	id: WIRE_PHASE_C_TO_INPUT_BREAKER_ID,
	name: 'Провод фазы C до вводного автомата',
	resistance: 0.1,
	startPoint: PHASE_C_POINT_ID,
	endPoint: INPUT_BREAKER_INPUT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(WIRE_PHASE_C_TO_INPUT_BREAKER_ID, 'wire'),
};

export const kontaktVvodnogoAvtomataFazaC: CircuitElement = {
	id: INPUT_BREAKER_CONTACT_PHASE_C_ID,
	name: 'Контакт вводного автомата фаза C',
	resistance: 0,
	startPoint: INPUT_BREAKER_INPUT_POINT_PHASE_C_ID,
	endPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		INPUT_BREAKER_CONTACT_PHASE_C_ID,
		'breaker',
	),
};

export const provodOtAvtomataFazaCDoKlemmikaPeredPuskatelyami: CircuitElement =
	{
		id: WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_C_ID,
		name: 'Провод от автомата фаза C до клемника перед пускателями',
		resistance: 0.1,
		startPoint: INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID,
		endPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
		malfunctions: buildMalfunctions(
			WIRE_BREAKER_TO_TERMINAL_BEFORE_STARTERS_PHASE_C_ID,
			'wire',
		),
	};

export const provodOtKlemmikaDoPuskatelyaOtkrytoFazaC: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_C_ID,
	name: 'Провод от клемника до пускателя открыто фаза C',
	resistance: 0.1,
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
	endPoint: POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_OPEN_PHASE_C_ID,
		'wire',
	),
};

export const kontaktPuskatelyaOtkrytoFazaC: CircuitElement = {
	id: STARTER_CONTACT_OPEN_PHASE_C_ID,
	name: 'Контакт пускателя открыто фаза C',
	resistance: 0,
	startPoint: POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	endPoint: POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_OPEN_PHASE_C_ID,
		'starterContact',
	),
};

export const provodOtPuskatelyaOtkrytoFazaC: CircuitElement = {
	id: WIRE_FROM_STARTER_OPEN_PHASE_C_ID,
	name: 'Провод от пускателя открыто фаза C',
	resistance: 0.1,
	startPoint: POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_C_ID,
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_OPEN_PHASE_C_ID, 'wire'),
};

export const provodOtKlemmikaDoPuskatelyaZakrytoFazaC: CircuitElement = {
	id: WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_C_ID,
	name: 'Провод от клемника до пускателя закрыто фаза C',
	resistance: 0.1,
	startPoint: TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
	endPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		WIRE_TERMINAL_TO_STARTER_CLOSE_PHASE_C_ID,
		'wire',
	),
};

export const kontaktPuskatelyaZakrytoFazaC: CircuitElement = {
	id: STARTER_CONTACT_CLOSE_PHASE_C_ID,
	name: 'Контакт пускателя закрыто фаза C',
	resistance: 0,
	startPoint: POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	endPoint: POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		STARTER_CONTACT_CLOSE_PHASE_C_ID,
		'starterContact',
	),
};

// Провод от контакта пускателя закрыто фазы C идет к точке после пускателей фазы A (реверс)
export const provodOtKontaktaPuskatelyaZakrytoFazaCDoFazyA: CircuitElement = {
	id: WIRE_FROM_STARTER_CLOSE_PHASE_C_ID,
	name: 'Провод от контакта пускателя закрыто фаза C (для реверса, к фазе A)',
	resistance: 0.1,
	startPoint: POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,
	endPoint: MERGE_POINT_AFTER_STARTERS_PHASE_A_ID, // Идет к фазе A для реверса
	malfunctions: buildMalfunctions(WIRE_FROM_STARTER_CLOSE_PHASE_C_ID, 'wire'),
};

export const provodPoslePuskateleyFazaC: CircuitElement = {
	id: WIRE_AFTER_STARTERS_PHASE_C_ID,
	name: 'Провод после пускателей фаза C',
	resistance: 0.1,
	startPoint: MERGE_POINT_AFTER_STARTERS_PHASE_C_ID,
	endPoint: JUNCTION_BOX_INPUT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(WIRE_AFTER_STARTERS_PHASE_C_ID, 'wire'),
};

export const provodDoSoyedinitelnojKorobkiFazaC: CircuitElement = {
	id: WIRE_TO_JUNCTION_BOX_PHASE_C_ID,
	name: 'Провод до соединительной коробки фаза C',
	resistance: 0.1,
	startPoint: JUNCTION_BOX_INPUT_POINT_PHASE_C_ID,
	endPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(WIRE_TO_JUNCTION_BOX_PHASE_C_ID, 'wire'),
};

export const provodOtSoyedinitelnojKorobkiDoDvigatelyaFazaC: CircuitElement = {
	id: WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_C_ID,
	name: 'Провод от соединительной коробки до двигателя фаза C',
	resistance: 0.1,
	startPoint: JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID,
	endPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID,
	malfunctions: buildMalfunctions(
		WIRE_FROM_JUNCTION_BOX_TO_MOTOR_PHASE_C_ID,
		'wire',
	),
};

export const obmotkaDvigatelyaFazaC: CircuitElement = {
	id: MOTOR_WINDING_PHASE_C_ID,
	name: 'Обмотка двигателя фаза C',
	resistance: 4100,
	startPoint: MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID,
	endPoint: POWER_CIRCUIT_NEUTRAL_ID, // Нейтраль
	malfunctions: buildMalfunctions(MOTOR_WINDING_PHASE_C_ID, 'motorWinding'),
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
