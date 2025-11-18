// id точек схемы

import { IPoint } from '../types/scheme';
import {
	CONTROL_POWER_FEED_POINT_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
	CONTROL_BREAKER_OUTPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
	WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	LIMIT_SWITCH_CLOSE_ID,
	WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	COMMANDS_CLOSE_POINT_ID,
	CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	COMANDS_OPEN_POINT_ID,
	OPEN_INTERLOCK_OUTPUT_POINT_ID,
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
	POWER_CIRCUIT_NEUTRAL_ID,
} from './powerCircuit/constants';

export const CONTROL_CIRCUIT_NEUTRAL_ID = 'p.c.n'; // нейтраль цепи управления

// Точки для подключения щупов на схеме
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

	[OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID]: { x: 518, y: 215, state: true },
	[WIRE_LIMIT_OPEN_TO_TERMINAL_ID]: { x: 595, y: 215, state: true },
	[COMANDS_OPEN_POINT_ID]: { x: 776, y: 216, state: false },
	[OPEN_INTERLOCK_OUTPUT_POINT_ID]: { x: 847, y: 215, state: false },

	[LIMIT_SWITCH_CLOSE_ID]: { x: 518, y: 480, state: true },
	[WIRE_LIMIT_CLOSE_TO_TERMINAL_ID]: { x: 594, y: 480, state: true },
	[COMMANDS_CLOSE_POINT_ID]: { x: 766, y: 480, state: false },
	[CLOSE_INTERLOCK_OUTPUT_POINT_ID]: { x: 845, y: 480, state: false },

	[CONTROL_CIRCUIT_NEUTRAL_ID]: { x: 1045, y: 67, state: false },
};

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
