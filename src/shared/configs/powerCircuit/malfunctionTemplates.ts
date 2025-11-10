/**
 * Шаблоны неисправностей для элементов силовой схемы.
 * Каждый элемент имеет тип (kind) и набор шаблонов неисправностей.
 */

import type { MalfTpl } from '@/shared/types/scheme';

/**
 * Тип для ID элементов силовой схемы.
 * Принимает только валидные константы из './constants'.
 */
type ElementId = string;

// ======================== Шаблоны неисправностей ========================

// --- Провода (4 варианта текста для разных контекстов) ---
export const MALF_TPL_WIRE_GROUND: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв провода' },
	{ suffix: '.2', name: 'КЗ на землю' },
	{ suffix: '.3', name: 'КЗ с соседним проводом' },
] as const;

export const MALF_TPL_WIRE_SHORT: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв провода' },
	{ suffix: '.2', name: 'КЗ' },
	{ suffix: '.3', name: 'КЗ с соседним проводом' },
] as const;

export const MALF_TPL_WIRE_FULL: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв провода' },
	{ suffix: '.2', name: 'Короткое замыкание' },
	{ suffix: '.3', name: 'Короткое замыкание с соседним проводом' },
] as const;

export const MALF_TPL_WIRE_GROUND_FULL: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв провода' },
	{ suffix: '.2', name: 'Короткое замыкание на землю' },
	{ suffix: '.3', name: 'Короткое замыкание с соседним проводом' },
] as const;

// --- Автоматы ---
export const MALF_TPL_BREAKER: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Плохой контакт на клемме, нет фазы' },
	{ suffix: '.2', name: 'Ложно выбивает' },
	{ suffix: '.3', name: 'Собирается механически, но нет коммутации' },
] as const;

// --- Контакты пускателей ---
export const MALF_TPL_STARTER_CONTACT: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Неисправна катушка, пускатель не подтягивается' },
	{ suffix: '.2', name: 'Нет контакта в контактной группе' },
	{ suffix: '.3', name: 'Залипший контакт в контактной группе' },
] as const;

// --- Обмотка двигателя ---
export const MALF_TPL_MOTOR_WINDING: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Обрыв фазы' },
	{ suffix: '.2', name: 'Короткое замыкание между фазами' },
	{ suffix: '.3', name: 'Короткое замыкание обмотки на землю' },
] as const;

// ======================== Генератор неисправностей ========================

interface Malfunction {
	id: string;
	name: string;
	active: boolean;
}

/**
 * Генерирует массив неисправностей на основе базового ID и шаблонов.
 *
 * @param baseId - ID элемента, используйте константы из './constants'
 *   (например, WIRE_PHASE_A_TO_INPUT_BREAKER_ID, INPUT_BREAKER_CONTACT_PHASE_A_ID)
 * @param templates - Массив шаблонов с суффиксами и названиями
 * @param activeSuffixes - Опционально: список суффиксов, которые должны быть активны
 * @returns Массив неисправностей с полными ID
 *
 * @example
 *  Используйте существующие константы
 * import { WIRE_PHASE_A_TO_INPUT_BREAKER_ID } from './constants';
 * buildMalfunctions(WIRE_PHASE_A_TO_INPUT_BREAKER_ID, MALF_TPL_WIRE_GROUND_FULL)
 * => [{ id: 'p.0.0.0.1', name: 'Обрыв провода', active: false }, ...]
 */
export function buildMalfunctions(
	baseId: ElementId,
	templates: readonly MalfTpl[],
	activeSuffixes?: string[],
): Malfunction[] {
	return templates.map(t => ({
		id: `${baseId}${t.suffix}`,
		name: t.name,
		active: activeSuffixes ? activeSuffixes.includes(t.suffix) : false,
	}));
}
