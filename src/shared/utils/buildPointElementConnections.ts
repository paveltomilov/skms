import { CircuitBranch, CircuitElement } from '@/shared/types/scheme';
import { initialStateScheme } from '@/shared/configs/scheme';

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
 * Элемент считается подключенным к точке, если точка является его startPoint или endPoint.
 */
export function buildPointElementConnections(): Record<string, string[]> {
	const allElements = [
		...extractElements(initialStateScheme.powerCircuit),
		...extractElements(initialStateScheme.controlCircuit),
	];

	const connections: Record<string, string[]> = {};

	for (const element of allElements) {
		// Добавляем элемент к точке начала
		if (element.startPoint) {
			if (!connections[element.startPoint]) {
				connections[element.startPoint] = [];
			}
			connections[element.startPoint].push(element.id);
		}

		// Добавляем элемент к точке конца
		if (element.endPoint) {
			if (!connections[element.endPoint]) {
				connections[element.endPoint] = [];
			}
			connections[element.endPoint].push(element.id);
		}
	}
	return connections;
}
