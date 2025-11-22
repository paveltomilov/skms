import type { ElementKind } from '../../types/scheme';

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
} as const satisfies Record<string, ElementKind>;

/**
 * Базовые сопротивления элементов схемы по их типу (kind).
 * Используется для автоматического определения сопротивления элемента на основе его типа.
 */
export const BASE_RESISTANCE_CONSTANT: Record<ElementKind, number> = {
	'wire': 0.1,
	'breaker': 0,
	'limitSwitch': 0,
	'blockingContact': 0,
	'coil': 6400,
	'lamp'  : 4800,
	'starterContact': 0,
	'motorWinding': 4100,
} as const;

// Значение сопротивления при обрыве или при размыкании цепи
export const HIGH_RESISTANCE = 1_000_000_000;

/**
 * Получает базовое сопротивление элемента по его типу.
 * @param kind - тип элемента схемы
 * @returns базовое сопротивление для данного типа элемента
 * @throws {Error} если сопротивление не найдено для указанного типа
 */
export const getResistanceByKind = (kind: ElementKind): number => {
	const resistance = BASE_RESISTANCE_CONSTANT[kind];
	if (resistance === undefined) {
		throw new Error(`Сопротивление не найдено для типа элемента: ${kind}`);
	}
	return resistance;
};
