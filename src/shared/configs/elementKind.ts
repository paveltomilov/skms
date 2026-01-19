import type { ElementKind } from '../types/scheme';

/**
 * Константы типов элементов схемы.
 * Используются для типизации и валидации элементов.
 */
export const ELEMENT_KIND = {
	WIRE: 'wire',
	BREAKER: 'breaker',
	LIMIT_SWITCH: 'limitSwitch',
	BLOCKING_CONTACT: 'blockingContact',
	COIL: 'coil',
	LAMP: 'lamp',
	STARTER_CONTACT: 'starterContact',
	MOTOR_WINDING: 'motorWinding',
	HIGH_RESISTANCE: 'highResistance',
} as const satisfies Record<string, ElementKind>;

/**
 * Базовые сопротивления элементов схемы по их типу (kind).
 * Используется для автоматического определения сопротивления элемента на основе его типа.
 */
export const BASE_RESISTANCE_CONSTANT: Record<ElementKind, number> = {
	wire: 0.1,
	breaker: 0,
	limitSwitch: 0,
	blockingContact: 0,
	coil: 6400,
	lamp: 4800,
	starterContact: 0,
	motorWinding: 4100,
	highResistance: 1_000_000_000,
} as const;
