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

export const CONTROL_CIRCUIT_NEUTRAL_ID = 'p.c.n'; // нейтраль цепи управления
export const POWER_CIRCUIT_NEUTRAL_ID = 'p.p.n'; // нейтраль силовой цепи

// Точки для подключения щупов на схеме
export const SCHEME_POINTS: Record<string, IPoint> = {
	'p.p.1.0': { x: 87, y: 12, state: true },
	'p.p.2.0': { x: 129, y: 27, state: true },
	'p.p.3.0': { x: 171, y: 42, state: true },

	'p.p.1.1': { x: 87, y: 150, state: true },
	'p.p.2.1': { x: 129, y: 150, state: true },
	'p.p.3.1': { x: 171, y: 150, state: true },

	'p.p.1.2': { x: 86, y: 188, state: true },
	'p.p.2.2': { x: 129, y: 187, state: true },
	'p.p.3.2': { x: 170, y: 187, state: true },

	'p.p.1.3.1': { x: 86, y: 355, state: true },
	'p.p.2.3.1': { x: 129, y: 355, state: true },
	'p.p.3.3.1': { x: 170, y: 355, state: true },
	'p.p.1.3.2': { x: 208, y: 355, state: true },
	'p.p.2.3.2': { x: 242, y: 355, state: true },
	'p.p.3.3.2': { x: 276, y: 355, state: true },

	'p.p.1.4.1.1': { x: 87, y: 398, state: false },
	'p.p.2.4.1': { x: 128, y: 398, state: false },
	'p.p.3.4.1.1': { x: 171, y: 398, state: false },
	'p.p.1.4.2.1': { x: 200, y: 398, state: false },
	'p.p.2.4.2': { x: 240, y: 398, state: false },
	'p.p.3.4.2.1': { x: 272, y: 398, state: false },

	'p.p.1.4.1.2': { x: 87, y: 578, state: false },
	'p.p.2.5': { x: 128, y: 578, state: false },
	'p.p.3.4.1.2': { x: 171, y: 578, state: false },

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
	[CLOSE_INTERLOCK_OUTPUT_POINT_ID ]: { x: 845, y: 480, state: false },

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
