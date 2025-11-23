import {
	CircuitElement,
	CircuitBranch,
	InitialStateScheme,
} from '@/shared/types/scheme';

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
 * Функция поиска элемента по ID через путь в структуре схемы.
 * ID представляет собой путь через массивы: например, "p.0.1" означает:
 * - "p" - powerCircuit
 * - "0" - первый элемент в powerCircuit (массив)
 * - "0" - первый элемент в этом массиве (массив)
 * - "1" - второй элемент в этом массиве (CircuitElement)
 *
 * @param id - идентификатор элемента в формате "p.0.1" или "c.1.2.3"
 * @param state - состояние схемы для получения актуальных данных элементов
 * @returns найденный элемент схемы из текущего состояния
 * @throws {Error} если элемент не найден или ID невалиден
 */
export const findElementByID = (
	id: string,
	state: InitialStateScheme,
): CircuitElement => {
	// Валидация ID
	validateId(id);

	// 1. Разбор ID на части
	const parts = id.split('.');
	const [prefix, ...indexStrings] = parts;

	if (indexStrings.length === 0) {
		throw new Error(
			`ID "${id}" must contain at least one index after prefix`,
		);
	}

	// 2. Преобразование строковых индексов в числа
	const indices = indexStrings.map((str, pos) => {
		const num = Number(str);
		if (!Number.isInteger(num) || num < 0) {
			throw new Error(
				`Invalid non-negative integer index at position ${pos} in ID "${id}": "${str}"`,
			);
		}
		return num;
	});

	// 3. Выбор корневого массива схемы

	let current: CircuitBranch | CircuitElement =
		prefix === 'p' ? state.powerCircuit : state.controlCircuit;

	// 4. Проход по пути через индексы
	for (let i = 0; i < indices.length; i++) {
		const index = indices[i];
		const currentPath = `${prefix}.${indices.slice(0, i + 1).join('.')}`;

		// Проверка: на всех шагах, кроме последнего, текущий узел должен быть массивом
		if (!Array.isArray(current)) {
			throw new Error(
				`Expected array at path "${currentPath}", but found a CircuitElement (leaf). Full ID: "${id}"`,
			);
		}

		// Проверка границ массива
		if (index >= current.length) {
			throw new Error(
				`Index ${index} out of bounds at path "${currentPath}". Array length: ${current.length}`,
			);
		}

		// Переход к следующему узлу
		current = current[index];
	}

	// 5. Финальная проверка: результат должен быть CircuitElement, а не массивом
	if (Array.isArray(current)) {
		throw new Error(
			`Path "${id}" resolves to a CircuitGroup (array), but a CircuitElement was expected`,
		);
	}

	// 6. Возвращаем найденный элемент
	return current;
};
