import { CircuitBranch, CircuitElement } from '@/shared/types/scheme';
import { initialStateScheme } from '@/shared/configs/scheme';
import { SCHEME_POINTS_BASE } from '@/shared/configs/points';

/**
 * Рекурсивно извлекает все элементы схемы из ветвей.
 */
function extractElements(branches: CircuitBranch[]): CircuitElement[] {
	const elements: CircuitElement[] = [];

	for (const branch of branches) {
		if (Array.isArray(branch)) {
			// Рекурсивно обрабатываем вложенные массивы (параллельные ветвления)
			elements.push(...extractElements(branch));
		} else {
			// Это элемент схемы
			elements.push(branch);
		}
	}

	return elements;
}

/**
 * Создает карту связей: точка -> массив ID элементов, подключенных к этой точке.
 * Элемент считается подключенным к точке, если точка является его endPoint.
 */
export function buildPointElementConnections(): Record<string, string[]> {
	const allElements = [
		...extractElements(initialStateScheme.powerCircuit),
		...extractElements(initialStateScheme.controlCircuit),
	];

	const connections: Record<string, string[]> = {};

	// Перебираем все точки схемы
	for (const pointId of Object.keys(SCHEME_POINTS_BASE)) {
		connections[pointId] = [];

		// Для каждой точки проверяем все элементы
		for (const element of allElements) {
			// Если точка является endPoint элемента, добавляем элемент в массив
			if (element.endPoint === pointId) {
				connections[pointId].push(element.id);
			}
		}
	}

	return connections;
}
