/**
 * Шаблоны неисправностей для элементов схемы управления.
 * Каждый элемент имеет тип (kind) и набор шаблонов неисправностей.
 */

import type { MalfTpl } from '@/shared/types/scheme';

/**
 * Тип для ID элементов схемы управления.
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

// --- Кнопки ---
export const MALF_TPL_BUTTON_CMD: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Нет контакта, команда не уходит' },
	{ suffix: '.2', name: 'Ложно сработала, команда постоянно висит' },
] as const;

// --- Вставки NDI ---
export const MALF_TPL_INSERT_SIGNAL: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Нет контакта, цепь не замыкается' },
	{ suffix: '.2', name: 'Ложно сработала, цепь не размыкается' },
] as const;

// --- Концевые выключатели ---
export const MALF_TPL_LIMIT_SWITCH: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Залипший контакт' },
	{ suffix: '.2', name: 'Нет контакта' },
	{ suffix: '.3', name: 'Не настроен' },
] as const;

// --- Блокировочные контакты ---
export const MALF_TPL_BLOCKING_CONTACT: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Нет контакта' },
	{ suffix: '.2', name: 'Ложно замкнутый контакт' },
] as const;

// --- Автоматы ---
export const MALF_TPL_BREAKER: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Плохой контакт на клемме, нет фазы' },
	{ suffix: '.2', name: 'Ложно выбивает' },
	{ suffix: '.3', name: 'Собирается механически, но нет коммутации' },
] as const;

// --- Катушки пускателей ---
export const MALF_TPL_COIL: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Неисправна катушка, пускатель не подтягивается' },
] as const;

// --- Лампы ---
export const MALF_TPL_LAMP: readonly MalfTpl[] = [
	{ suffix: '.1', name: 'Перегорела' },
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
 *   (например, WIRE_POWER_TO_CONTROL_BREAKER_ID, COIL_OPEN_ID, BUTTON_KRUZA_P_OPEN_ID)
 * @param templates - Массив шаблонов с суффиксами и названиями
 * @param activeSuffixes - Опционально: список суффиксов, которые должны быть активны
 * @returns Массив неисправностей с полными ID
 *
 * @example
 *  Используйте существующие константы
 * import { WIRE_POWER_TO_CONTROL_BREAKER_ID } from './constants';
 * buildMalfunctions(WIRE_POWER_TO_CONTROL_BREAKER_ID, MALF_TPL_WIRE_GROUND)
 * => [{ id: 'c.0.1', name: 'Обрыв провода', active: false }, ...]
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
