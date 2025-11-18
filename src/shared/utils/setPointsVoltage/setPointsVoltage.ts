import { InitialStateScheme } from '@/shared/types/scheme';
import { findElementByID } from '../findElementByID/scheme';
import {
	VOLTAGE_CALCULATION_CONFIG,
	VoltageCalculationType,
} from '@/shared/configs/controlCircuit/voltageCalculationConfig';

/**
 * Проверяет, проходит ли ток через элемент
 */
function canCurrentFlow(
	previousPointVoltage: boolean,
	scheme: InitialStateScheme,
	elementId: string,
): boolean {
	let element;
	try {
		element = findElementByID(elementId, scheme);
	} catch (error) {
		// Если элемент не найден, ток не может протекать
		console.error(`Element with id "${elementId}" not found in canCurrentFlow: ${error}`);
		return false;
	}

	// Ток проходит, если на предыдущей точке есть напряжение и сопротивление элемента не слишком высокое
	return previousPointVoltage && element.resistance < 1000000;
}

/**
 * Рекурсивно рассчитывает напряжение для точки на основе конфигурации
 */
function calculatePointVoltage(
	pointId: string,
	points: Record<string, boolean>,
	scheme: InitialStateScheme,
	config: VoltageCalculationType,
	visited: Set<string> = new Set(),
): boolean {
	// Защита от циклических зависимостей
	if (visited.has(pointId)) {
		return points[pointId] ?? false;
	}
	visited.add(pointId);

	switch (config.type) {
		case 'constant':
			return config.value;

		case 'from_previous': {
			const previousVoltage = calculatePointVoltage(
				config.previousPointId,
				points,
				scheme,
				VOLTAGE_CALCULATION_CONFIG[config.previousPointId] ?? {
					type: 'constant',
					value: points[config.previousPointId] ?? false,
				},
				visited,
			);
			return canCurrentFlow(previousVoltage, scheme, config.elementId);
		}

		case 'from_neutral': {
			// Для элементов, подключенных к нейтрали, напряжение рассчитывается
			// как разница между начальной точкой элемента и нейтралью

			// Нейтраль всегда 0V, поэтому напряжение на элементе зависит от его входной точки
			// Это обрабатывается через 'from_previous' для входной точки элемента
			return false;
		}

		case 'merge': {
			// Объединение нескольких путей (OR логика)
			// Для merge нужно рассчитать напряжение через каждый путь и объединить результаты
			// Но для правильной работы нужно найти элемент, который ведет к этой точке
			// В конфигурации merge используется для точек, к которым ведут несколько путей
			// Например, COMANDS_OPEN_POINT_ID получает напряжение от двух путей
			return config.calculations.some(calc => {
				// Для каждого пути в merge нужно рассчитать напряжение предыдущей точки
				if (calc.type === 'from_previous') {
					const previousVoltage = calculatePointVoltage(
						calc.previousPointId,
						points,
						scheme,
						VOLTAGE_CALCULATION_CONFIG[calc.previousPointId] ?? {
							type: 'constant',
							value: points[calc.previousPointId] ?? false,
						},
						visited,
					);
					return canCurrentFlow(
						previousVoltage,
						scheme,
						calc.elementId,
					);
				}
				return false;
			});
		}

		default:
			return points[pointId] ?? false;
	}
}

/**
 * Рассчитывает напряжение для всех точек схемы на основе конфигурации
 */
export function setNewVoltagePoints(
	scheme: InitialStateScheme,
	points: Record<string, boolean>,
	setVoltagePoints: (points: Record<string, boolean>) => void,
): Record<string, boolean> {
	const pointsAcc = JSON.parse(JSON.stringify(points)) as Record<
		string,
		boolean
	>;

	// Рассчитываем напряжение для каждой точки из конфигурации
	for (const [pointId, config] of Object.entries(
		VOLTAGE_CALCULATION_CONFIG,
	)) {
		pointsAcc[pointId] = calculatePointVoltage(
			pointId,
			pointsAcc,
			scheme,
			config,
		);
	}

	setVoltagePoints(pointsAcc);
	return pointsAcc;
}
