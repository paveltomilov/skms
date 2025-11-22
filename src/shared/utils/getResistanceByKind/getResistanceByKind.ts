import type { ElementKind } from '../../types/scheme';
import { BASE_RESISTANCE_CONSTANT } from '../../configs/elementKind';

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
