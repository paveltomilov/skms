import {
	InitialStateScheme,
	CircuitElement,
	CircuitBranch,
} from '@/shared/types/scheme';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import { SCHEME_POINTS } from '@/shared/configs/points';

/**
 * Рекурсивно извлекает все элементы схемы из ветвей.
 */
function extractElements(branches: CircuitBranch[]): CircuitElement[] {
	const elements: CircuitElement[] = [];

	for (const branch of branches) {
		if (Array.isArray(branch)) {
			elements.push(...extractElements(branch));
		} else {
			elements.push(branch);
		}
	}

	return elements;
}

/**
 * Создает карту элементов схемы по их ID для быстрого доступа.
 */
function buildElementsMap(
	scheme: InitialStateScheme,
): Record<string, CircuitElement> {
	const allElements = [
		...extractElements(scheme.powerCircuit),
		...extractElements(scheme.controlCircuit),
	];

	const elementsMap: Record<string, CircuitElement> = {};
	for (const element of allElements) {
		elementsMap[element.id] = element;
	}

	return elementsMap;
}

/**
 * Обновляет состояние напряжения (state) во всех точках схемы на основе подключённых к ним элементов.
 *
 * Правила расчёта:
 * - Для каждой точки перебираются все подключённые к ней элементы.
 * - Если элемент проводит напряжение (resistance <= BASE_RESISTANCE_CONSTANT.highResistance)
 *   и подключен к точке через endPoint, то проверяется startPoint элемента.
 * - Если startPoint имеет state = true, то текущая точка получает state = true.
 * - Если точка является источником напряжения (state = true изначально), она остается true.
 *
 * @param scheme - схема с элементами и их сопротивлениями
 * @param points - текущее состояние точек (Record<pointId, state>)
 * @returns обновленное состояние точек
 */
export function setNewVoltagePoints(
	scheme: InitialStateScheme,
	points: Record<string, boolean>,
): Record<string, boolean> {
	// Создаем копию текущего состояния точек
	const updatedPoints = { ...points };

	// Создаем карту элементов по их ID
	const elementsMap = buildElementsMap(scheme);

	// Обрабатываем каждую точку из SCHEME_POINTS
	for (const [pointId, pointData] of Object.entries(SCHEME_POINTS)) {
		// Если точка является источником напряжения (state = true изначально), сохраняем его
		if (pointData.state) {
			updatedPoints[pointId] = true;
			continue;
		}

		// Получаем список элементов, подключенных к этой точке
		const connectedElementIds = pointData.elements || [];

		// По умолчанию точка не имеет напряжения
		let hasVoltage = false;

		// Перебираем все подключённые элементы
		for (const elementId of connectedElementIds) {
			const element = elementsMap[elementId];

			// Если элемент не найден, пропускаем
			if (!element) {
				continue;
			}

			// Проверяем, подключен ли элемент к текущей точке через endPoint
			// (т.е. элемент передает напряжение ОТ startPoint К endPoint)
			if (element.endPoint === pointId && element.startPoint) {
				// Проверяем, проводит ли элемент напряжение
				if (
					element.resistance <=
					BASE_RESISTANCE_CONSTANT.highResistance
				) {
					// Проверяем состояние точки-источника (startPoint)
					const sourcePointState =
						updatedPoints[element.startPoint] ?? false;

					if (sourcePointState) {
						hasVoltage = true;
						break; // Найдено напряжение, можно прервать цикл
					}
				}
			}
		}

		// Обновляем состояние точки
		updatedPoints[pointId] = hasVoltage;
	}

	return updatedPoints;
}
