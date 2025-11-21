import {
	CircuitElement,
	CircuitBranch,
	InitialStateScheme,
} from '@/shared/types/scheme';
import { initialStateScheme } from '@/shared/configs/scheme';

/**
 * Индекс элементов схемы для быстрого поиска O(1) вместо O(n) рекурсивного обхода.
 * Строится один раз при загрузке модуля из initialStateScheme.
 */
const elementsIndex = new Map<string, CircuitElement>();

/**
 * Рекурсивно обходит ветви схемы и добавляет элементы в индекс.
 * @param branches - массив ветвей схемы
 */
const buildIndex = (branches: CircuitBranch[]): void => {
	for (const branch of branches) {
		if (Array.isArray(branch)) {
			// Рекурсивно обрабатываем вложенные массивы (параллельные ветвления)
			buildIndex(branch);
		} else {
			// Это элемент схемы - добавляем в индекс
			elementsIndex.set(branch.id, branch);
		}
	}
};

/**
 * Инициализация индекса при загрузке модуля.
 * Строим индекс из initialStateScheme один раз.
 */
const initializeIndex = (): void => {
	if (elementsIndex.size === 0) {
		buildIndex(initialStateScheme.powerCircuit);
		buildIndex(initialStateScheme.controlCircuit);
	}
};

// Инициализируем индекс при загрузке модуля
initializeIndex();

/**
 * Валидация ID элемента схемы.
 * @param id - идентификатор элемента
 * @throws {Error} если ID невалиден
 */
const validateId = (id: string): void => {
	if (typeof id !== 'string') {
		throw new Error('ID must be a string');
	}

	if (id.length < 3) {
		throw new Error('id has wrong length');
	}

	if (!(id.startsWith('c') || id.startsWith('p'))) {
		throw new Error('id starts with wrong letter');
	}
};

/**
 * Оптимизированная функция поиска элемента по ID в initialStateScheme.
 * Использует предварительно построенный индекс для поиска O(1).
 *
 * @param id - идентификатор элемента (должен начинаться с 'p' или 'c')
 * @param state - состояние схемы (используется для обратной совместимости, но поиск всегда в initialStateScheme)
 * @returns найденный элемент схемы
 * @throws {Error} если элемент не найден или ID невалиден
 */
export const findElementByID = (
	id: string,
	state: InitialStateScheme,
): CircuitElement => {
	// Валидация ID
	validateId(id);

	// Определяем тип схемы для сообщений об ошибках
	const circuitType = id.startsWith('p') ? 'powerCircuit' : 'controlCircuit';

	// Поиск в индексе - O(1) операция
	const result = elementsIndex.get(id);

	if (!result) {
		const errorMessage = `6 - Element with id "${id}" not found in ${circuitType}`;
		console.error(errorMessage, {
			id,
			circuitType,
		});
		throw new Error(errorMessage);
	}

	return result;
};
