// id точек схемы

import {
	IPoint,
	CircuitBranch,
	CircuitElement,
	InitialStateScheme,
} from '../types/scheme';
import { initialStateScheme } from './scheme';
import { findElementByID } from '../utils/findElementByID/scheme';
import { BASE_RESISTANCE_CONSTANT } from './elementKind';

import {
	CONTROL_POWER_FEED_POINT_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
	CONTROL_BREAKER_OUTPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
	COMMANDS_CLOSE_POINT_ID,
	CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	CLOSE_INTERLOCK_INPUT_POINT_ID,
	COMANDS_OPEN_POINT_ID,
	OPEN_INTERLOCK_OUTPUT_POINT_ID,
	OPEN_INTERLOCK_INPUT_POINT_ID,
	CONTROL_CIRCUIT_NEUTRAL_ID,
	OPEN_JUNCTION_BOX_POINT_ID,
	OPEN_TERMINAL_BLOCK_POINT_ID,
	OPEN_NDI_NOT_OPEN_INPUT_POINT_ID,
	OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID,
	OPEN_CMD_PTK_BRANCH_POINT_ID,
	OPEN_NDO_CMD_PTK_INPUT_POINT_ID,
	OPEN_BUTTON_INPUT_POINT_ID,
	OPEN_BUTTON_OUTPUT_POINT_ID,
	OPEN_COIL_INPUT_POINT_ID,
	CLOSED_LAMP_BRANCH_POINT_ID,
	CLOSED_LAMP_TO_NEUTRAL_POINT_ID,
	CLOSE_JUNCTION_BOX_POINT_ID,
	CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
	CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	CLOSE_TERMINAL_BLOCK_POINT_ID,
	CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID,
	CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID,
	CLOSE_CMD_PTK_BRANCH_POINT_ID,
	CLOSE_NDO_CMD_PTK_INPUT_POINT_ID,
	CLOSE_BUTTON_INPUT_POINT_ID,
	CLOSE_BUTTON_OUTPUT_POINT_ID,
	CLOSE_COIL_INPUT_POINT_ID,
	OPEN_LAMP_BRANCH_POINT_ID,
	OPEN_LAMP_INPUT_POINT_ID,
} from './controlCircuit/constants';
import {
	PHASE_B_POINT_ID,
	PHASE_C_POINT_ID,
	PHASE_A_POINT_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_C_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_B_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_A_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,
	MERGE_POINT_AFTER_STARTERS_PHASE_A_ID,
	MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	MERGE_POINT_AFTER_STARTERS_PHASE_C_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_A_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_B_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_C_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID,
	POWER_CIRCUIT_NEUTRAL_ID,
} from './powerCircuit/constants';

// ======================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ========================

/**
 * Рекурсивно извлекает все элементы схемы из ветвей.
 * @param branches - массив ветвей схемы
 * @returns массив всех элементов схемы
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
 * Создает индекс элементов по их endPoint.
 * @returns объект, где ключи - ID точек (endPoint), значения - массивы ID элементов
 */
function createElementsByEndpointIndex(): Record<string, string[]> {
	const allElements = [
		...extractElements(initialStateScheme.powerCircuit),
		...extractElements(initialStateScheme.controlCircuit),
	];

	const index: Record<string, string[]> = {};

	for (const element of allElements) {
		if (element.endPoint) {
			if (!index[element.endPoint]) {
				index[element.endPoint] = [];
			}
			index[element.endPoint].push(element.id);
		}
	}

	return index;
}

/**
 * Обогащает точки информацией об элементах, подключенных к ним как endPoint.
 * @param points - объект с точками схемы
 * @returns объект с точками, дополненный полем elements
 */
function enrichPointsWithElements(
	points: Record<string, IPoint>,
): Record<string, IPoint> {
	const elementsByEndpoint = createElementsByEndpointIndex();
	const enrichedPoints: Record<string, IPoint> = {};

	for (const pointId in points) {
		const point = { ...points[pointId] };
		point.elements = elementsByEndpoint[pointId] || [];
		enrichedPoints[pointId] = point;
	}

	return enrichedPoints;
}

/**
 * Извлекает состояния из объектов точек.
 * @param SCHEME_POINTS - объект с точками схемы
 * @returns объект с состояниями точек (ключ - ID точки, значение - состояние)
 */
function extractStates(SCHEME_POINTS: Record<string, IPoint>) {
	const result: Record<string, boolean> = {};

	for (const key in SCHEME_POINTS) {
		result[key] = SCHEME_POINTS[key].state;
	}
	return result;
}

/**
 * Вычисляет состояние точек на основе элементов, подключенных к ним.
 * Точка считается активной (true), если хотя бы один элемент, подключенный к ней как endPoint,
 * имеет активный startPoint (true) и сопротивление меньше высокого сопротивления.
 * Базовые точки (фазы и нейтрали) пропускаются - они должны быть установлены заранее.
 * @param currentPoints - текущие состояния точек
 * @param scheme - текущее состояние схемы с элементами
 * @returns объект с обновленными состояниями точек
 */
export function calculatePointsState(
	currentPoints: Record<string, boolean>,
	scheme: InitialStateScheme,
): Record<string, boolean> {
	const result: Record<string, boolean> = { ...currentPoints };

	// Проходим по всем точкам из pointsMap
	for (const pointId of pointsMap) {
		// Пропускаем базовые точки (фазы и нейтрали) - они устанавливаются отдельно
		if (
			pointId === PHASE_A_POINT_ID ||
			pointId === PHASE_B_POINT_ID ||
			pointId === PHASE_C_POINT_ID ||
			pointId === POWER_CIRCUIT_NEUTRAL_ID ||
			pointId === CONTROL_CIRCUIT_NEUTRAL_ID
		) {
			continue;
		}

		// Находим точку в SCHEME_POINTS_BASE
		const point = SCHEME_POINTS_BASE[pointId];
		if (!point) {
			continue;
		}

		// Получаем массив элементов, подключенных к этой точке
		const elements = point.elements || [];
		if (elements.length === 0) {
			// Если к точке не подключено элементов, состояние не меняется
			// (она может быть начальной точкой для других элементов)
			continue;
		}

		// Проверяем, есть ли хотя бы один активный элемент
		let hasActiveElement = false;

		for (const elementId of elements) {
			try {
				// Находим элемент в схеме
				const element = findElementByID(elementId, scheme);

				// Проверяем условия:
				// 1. startPoint должен иметь состояние true
				// 2. сопротивление должно быть меньше высокого сопротивления
				if (
					element.startPoint &&
					currentPoints[element.startPoint] === true &&
					element.resistance < BASE_RESISTANCE_CONSTANT.highResistance
				) {
					hasActiveElement = true;
					break; // Достаточно одного активного элемента
				}
			} catch (error) {
				// Если элемент не найден, пропускаем его
				console.warn(
					`Element with id "${elementId}" not found: ${error}`,
				);
				continue;
			}
		}

		// Устанавливаем состояние точки на основе наличия активного элемента
		result[pointId] = hasActiveElement;
	}

	return result;
}

// ======================== КОНСТАНТЫ И ДАННЫЕ ========================

export const pointsMap = [
	PHASE_A_POINT_ID,
	PHASE_B_POINT_ID,
	PHASE_C_POINT_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_A_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_B_ID,
	INPUT_BREAKER_INPUT_POINT_PHASE_C_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID,
	INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID,
	TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID,
	MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID,
	CONTROL_POWER_FEED_POINT_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
	CONTROL_BREAKER_OUTPUT_POINT_ID,
	//ветка открыть
	OPEN_JUNCTION_BOX_POINT_ID,
	OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
	OPEN_TERMINAL_BLOCK_POINT_ID,
	//сигнал не закрыто
	OPEN_NDI_NOT_OPEN_INPUT_POINT_ID,
	OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID,

	//команда открыть с ПТК
	OPEN_CMD_PTK_BRANCH_POINT_ID,
	OPEN_NDO_CMD_PTK_INPUT_POINT_ID,

	//команда открыть с кнопки КРУЗА-П
	OPEN_BUTTON_INPUT_POINT_ID,
	OPEN_BUTTON_OUTPUT_POINT_ID,
	//воздействие на пускатель открыть
	COMANDS_OPEN_POINT_ID,
	OPEN_INTERLOCK_INPUT_POINT_ID,
	OPEN_INTERLOCK_OUTPUT_POINT_ID,
	OPEN_COIL_INPUT_POINT_ID,
	// лампочка закрыто
	CLOSED_LAMP_BRANCH_POINT_ID,
	CLOSED_LAMP_TO_NEUTRAL_POINT_ID,

	//ветка закрыть
	CLOSE_JUNCTION_BOX_POINT_ID,
	CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
	CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	CLOSE_TERMINAL_BLOCK_POINT_ID,

	//сигнал не открыто
	CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID,
	CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID,

	//команда закрыть с ПТК
	CLOSE_CMD_PTK_BRANCH_POINT_ID,
	CLOSE_NDO_CMD_PTK_INPUT_POINT_ID,

	//команда закрыть с кнопки КРУЗА-П
	CLOSE_BUTTON_INPUT_POINT_ID,
	CLOSE_BUTTON_OUTPUT_POINT_ID,
	//воздействие на пускатель закрыть
	COMMANDS_CLOSE_POINT_ID,
	CLOSE_INTERLOCK_INPUT_POINT_ID,
	CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	CLOSE_COIL_INPUT_POINT_ID,
	// лампочка открыто
	OPEN_LAMP_BRANCH_POINT_ID,
	OPEN_LAMP_INPUT_POINT_ID,

	MERGE_POINT_AFTER_STARTERS_PHASE_A_ID,
	MERGE_POINT_AFTER_STARTERS_PHASE_B_ID,
	MERGE_POINT_AFTER_STARTERS_PHASE_C_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_A_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_B_ID,
	JUNCTION_BOX_INPUT_POINT_PHASE_C_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID,
	JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID,
];

// Базовые точки для подключения щупов на схеме (без элементов)
export const SCHEME_POINTS: Record<string, IPoint> = {
	[PHASE_A_POINT_ID]: { x: 87, y: 12, state: true },
	[PHASE_B_POINT_ID]: { x: 129, y: 27, state: true },
	[PHASE_C_POINT_ID]: { x: 171, y: 42, state: true },

	[INPUT_BREAKER_INPUT_POINT_PHASE_A_ID]: { x: 87, y: 150, state: true },
	[INPUT_BREAKER_INPUT_POINT_PHASE_B_ID]: { x: 129, y: 150, state: true },
	[INPUT_BREAKER_INPUT_POINT_PHASE_C_ID]: { x: 171, y: 150, state: true },

	[INPUT_BREAKER_OUTPUT_POINT_PHASE_A_ID]: { x: 86, y: 188, state: true },
	[INPUT_BREAKER_OUTPUT_POINT_PHASE_B_ID]: { x: 129, y: 187, state: true },
	[INPUT_BREAKER_OUTPUT_POINT_PHASE_C_ID]: { x: 170, y: 187, state: true },

	[POINT_BEFORE_STARTER_OPEN_PHASE_A_ID]: { x: 86, y: 355, state: true },
	[POINT_BEFORE_STARTER_OPEN_PHASE_B_ID]: { x: 129, y: 355, state: true },
	[POINT_BEFORE_STARTER_OPEN_PHASE_C_ID]: { x: 170, y: 355, state: true },
	[POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID]: { x: 208, y: 355, state: true },
	[POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID]: { x: 242, y: 355, state: true },
	[POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID]: { x: 276, y: 355, state: true },

	[POINT_AFTER_STARTER_OPEN_PHASE_A_ID]: { x: 87, y: 398, state: false },
	[POINT_AFTER_STARTER_OPEN_PHASE_B_ID]: { x: 128, y: 398, state: false },
	[POINT_AFTER_STARTER_OPEN_PHASE_C_ID]: { x: 171, y: 398, state: false },
	[POINT_AFTER_STARTER_CLOSE_PHASE_A_ID]: { x: 200, y: 398, state: false },
	[POINT_AFTER_STARTER_CLOSE_PHASE_B_ID]: { x: 240, y: 398, state: false },
	[POINT_AFTER_STARTER_CLOSE_PHASE_C_ID]: { x: 272, y: 398, state: false },

	[MOTOR_WINDING_CONTACT_POINT_PHASE_A_ID]: { x: 87, y: 578, state: false },
	[MOTOR_WINDING_CONTACT_POINT_PHASE_B_ID]: { x: 128, y: 578, state: false },
	[MOTOR_WINDING_CONTACT_POINT_PHASE_C_ID]: { x: 171, y: 578, state: false },

	[POWER_CIRCUIT_NEUTRAL_ID]: { x: 129, y: 647, state: false },

	[CONTROL_POWER_FEED_POINT_ID]: { x: 86, y: 217, state: true },

	[CONTROL_BREAKER_INPUT_POINT_ID]: { x: 320, y: 215, state: true },
	[CONTROL_BREAKER_OUTPUT_POINT_ID]: { x: 371, y: 215, state: true },
	//ветка открыть
	[OPEN_JUNCTION_BOX_POINT_ID]: { state: false },
	[OPEN_LIMIT_SWITCH_INPUT_POINT_ID]: { state: false },
	[OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID]: { x: 518, y: 215, state: true },
	[OPEN_TERMINAL_BLOCK_POINT_ID]: { x: 595, y: 215, state: true },

	[COMANDS_OPEN_POINT_ID]: { x: 776, y: 216, state: false },
	[OPEN_INTERLOCK_OUTPUT_POINT_ID]: { x: 847, y: 215, state: false },

	[CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID]: { x: 518, y: 480, state: true },
	[CLOSE_TERMINAL_BLOCK_POINT_ID]: { x: 594, y: 480, state: true },
	[COMMANDS_CLOSE_POINT_ID]: { x: 766, y: 480, state: false },
	[CLOSE_INTERLOCK_OUTPUT_POINT_ID]: { x: 845, y: 480, state: false },

	[CONTROL_CIRCUIT_NEUTRAL_ID]: { x: 1045, y: 67, state: false },

	// Power circuit internal points (без координат для отображения)
	[TERMINAL_BEFORE_STARTERS_POINT_PHASE_A_ID]: { state: false },
	[TERMINAL_BEFORE_STARTERS_POINT_PHASE_B_ID]: { state: false },
	[TERMINAL_BEFORE_STARTERS_POINT_PHASE_C_ID]: { state: false },
	[MERGE_POINT_AFTER_STARTERS_PHASE_A_ID]: { state: false },
	[MERGE_POINT_AFTER_STARTERS_PHASE_B_ID]: { state: false },
	[MERGE_POINT_AFTER_STARTERS_PHASE_C_ID]: { state: false },

	[JUNCTION_BOX_INPUT_POINT_PHASE_A_ID]: { state: false },
	[JUNCTION_BOX_INPUT_POINT_PHASE_B_ID]: { state: false },
	[JUNCTION_BOX_INPUT_POINT_PHASE_C_ID]: { state: false },
	[JUNCTION_BOX_OUTPUT_POINT_PHASE_A_ID]: { state: false },
	[JUNCTION_BOX_OUTPUT_POINT_PHASE_B_ID]: { state: false },
	[JUNCTION_BOX_OUTPUT_POINT_PHASE_C_ID]: { state: false },

	// Control circuit internal points (без координат для отображения)
	// CONTROL_NEUTRAL_POINT_ID уже определен выше как CONTROL_CIRCUIT_NEUTRAL_ID

	[OPEN_NDI_NOT_OPEN_INPUT_POINT_ID]: { state: false },
	[OPEN_NDI_NOT_OPEN_OUTPUT_POINT_ID]: { state: false },
	[OPEN_CMD_PTK_BRANCH_POINT_ID]: { state: false },
	[OPEN_NDO_CMD_PTK_INPUT_POINT_ID]: { state: false },
	[OPEN_BUTTON_INPUT_POINT_ID]: { state: false },
	[OPEN_BUTTON_OUTPUT_POINT_ID]: { state: false },
	[OPEN_INTERLOCK_INPUT_POINT_ID]: { state: false },
	[OPEN_COIL_INPUT_POINT_ID]: { state: false },
	[CLOSED_LAMP_BRANCH_POINT_ID]: { state: false },
	[CLOSED_LAMP_TO_NEUTRAL_POINT_ID]: { state: false },

	[CLOSE_JUNCTION_BOX_POINT_ID]: { state: false },
	[CLOSE_LIMIT_SWITCH_INPUT_POINT_ID]: { state: false },
	[CLOSE_NDI_NOT_CLOSED_INPUT_POINT_ID]: { state: false },
	[CLOSE_NDI_NOT_CLOSED_OUTPUT_POINT_ID]: { state: false },
	[CLOSE_CMD_PTK_BRANCH_POINT_ID]: { state: false },
	[CLOSE_NDO_CMD_PTK_INPUT_POINT_ID]: { state: false },
	[CLOSE_BUTTON_INPUT_POINT_ID]: { state: false },
	[CLOSE_BUTTON_OUTPUT_POINT_ID]: { state: false },
	[CLOSE_INTERLOCK_INPUT_POINT_ID]: { state: false },
	[CLOSE_COIL_INPUT_POINT_ID]: { state: false },
	[OPEN_LAMP_BRANCH_POINT_ID]: { state: false },
	[OPEN_LAMP_INPUT_POINT_ID]: { state: false },
};

// Базовые точки с обогащением элементов, подключенных как endPoint
export const SCHEME_POINTS_BASE: Record<string, IPoint> =
	enrichPointsWithElements(SCHEME_POINTS);

/**
 * Вычисляет начальное состояние точек на основе начальной схемы.
 * Используется для инициализации Redux store.
 * @returns объект с начальными состояниями точек
 */
function calculateInitialPointsState(): Record<string, boolean> {
	// Создаем объект с начальными состояниями из статических значений
	const initialPoints = extractStates(SCHEME_POINTS_BASE);

	// Устанавливаем базовые точки
	initialPoints[PHASE_A_POINT_ID] = true;
	initialPoints[PHASE_B_POINT_ID] = true;
	initialPoints[PHASE_C_POINT_ID] = true;
	initialPoints[POWER_CIRCUIT_NEUTRAL_ID] = false;
	initialPoints[CONTROL_CIRCUIT_NEUTRAL_ID] = false;

	// Вычисляем состояния остальных точек на основе начальной схемы
	const calculatedState = calculatePointsState(
		initialPoints,
		initialStateScheme,
	);

	return calculatedState;
}

// Состояния точек (только boolean значения без координат и элементов)
// Вычисляются на основе начальной схемы перед помещением в Redux store
export const pointsState = calculateInitialPointsState();
