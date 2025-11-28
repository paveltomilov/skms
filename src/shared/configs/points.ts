// id точек схемы

import { IPoint } from '../types/scheme';
import { buildPointElementConnections } from '../utils/buildPointElementConnections';
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

// Базовые точки для подключения щупов на схеме
export const SCHEME_POINTS_BASE: Record<string, IPoint> = {
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

/**
 * Обогащает точки информацией о подключенных элементах схемы.
 * Для каждой точки добавляет массив позиционных ID элементов, подключенных к этой точке.
 */
function enrichPointsWithElements(
	points: Record<string, IPoint>,
): Record<string, IPoint> {
	const connections = buildPointElementConnections();
	console.log(connections);
	const enriched: Record<string, IPoint> = {};
	console.log(points);
	for (const [pointId, point] of Object.entries(points)) {
		enriched[pointId] = {
			...point,
			elements: connections[pointId] || [],
		};
	}
	console.log(enriched);
	return enriched;
}

// Точки с информацией о подключенных элементах
export const SCHEME_POINTS: Record<string, IPoint> =
	enrichPointsWithElements(SCHEME_POINTS_BASE);

function extractStates(SCHEME_POINTS: Record<string, IPoint>) {
	const result: Record<string, boolean> = {};

	for (const key in SCHEME_POINTS) {
		if (SCHEME_POINTS.hasOwnProperty(key)) {
			result[key] = SCHEME_POINTS[key].state;
		}
	}
	return result;
}

export const pointsState = extractStates(SCHEME_POINTS);
export { CONTROL_CIRCUIT_NEUTRAL_ID };
