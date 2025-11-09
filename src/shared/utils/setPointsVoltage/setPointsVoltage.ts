import { InitialStateScheme } from '@/shared/types/scheme';
import { findElementByID } from '../findElementByID/scheme';
import {
	BUTTON_KRUZA_P_OPEN_ID,
	BUTTON_KRUZA_P_CLOSE_ID,
	CLOSE_INTERLOCK_INPUT_POINT_ID,
	CLOSE_LIMIT_SWITCH_INPUT_POINT_ID,
	CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	INTERLOCK_CLOSE_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
	CONTROL_BREAKER_OUTPUT_POINT_ID,
	CONTROL_CIRCUIT_BREAKER_ID,
	CONTROL_POWER_FEED_POINT_ID,
	INSERT_NDO_CMD_OPEN_PTK_ID,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	OPEN_INTERLOCK_INPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_INPUT_POINT_ID,
	OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
	INTERLOCK_OPEN_ID,
	WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	WIRE_PHASE_AFTER_BREAKER_ID,
} from '@/shared/configs/controlCircuit/constants';

function calcPoint(
	idPreviousPoint: boolean,
	scheme: InitialStateScheme,
	idElement: string,
): boolean {
	const element = findElementByID(idElement, scheme);
	if (idPreviousPoint === true && element.resistance < 1000000) {
		return true;
	} else {
		return false;
	}
}

export function setNewVoltagePoints(
	scheme: InitialStateScheme,
	points: Record<string, boolean>,
	setVoltagePoints: (points: Record<string, boolean>) => void,
): Record<string, boolean> {
	const pointsAcc = JSON.parse(JSON.stringify(points)) as Record<
		string,
		boolean
	>;

	pointsAcc[CONTROL_BREAKER_INPUT_POINT_ID] = calcPoint(
		pointsAcc[CONTROL_POWER_FEED_POINT_ID],
		scheme,
		CONTROL_CIRCUIT_BREAKER_ID,
	);

	pointsAcc[CONTROL_BREAKER_OUTPUT_POINT_ID] = calcPoint(
		pointsAcc[CONTROL_BREAKER_INPUT_POINT_ID],
		scheme,
		WIRE_PHASE_AFTER_BREAKER_ID,
	);

	pointsAcc[OPEN_LIMIT_SWITCH_INPUT_POINT_ID] = calcPoint(
		pointsAcc[CONTROL_BREAKER_OUTPUT_POINT_ID],
		scheme,
		LIMIT_SWITCH_OPEN_ID,
	);

	pointsAcc[OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID] = calcPoint(
		pointsAcc[OPEN_LIMIT_SWITCH_INPUT_POINT_ID],
		scheme,
		WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	);

	pointsAcc[OPEN_COMMAND_MERGE_POINT_ID] =
		calcPoint(
			pointsAcc[OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID],
			scheme,
			INSERT_NDO_CMD_OPEN_PTK_ID,
		) ||
		calcPoint(
			pointsAcc[OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID],
			scheme,
			BUTTON_KRUZA_P_OPEN_ID,
		);

	pointsAcc[OPEN_INTERLOCK_INPUT_POINT_ID] = calcPoint(
		pointsAcc[OPEN_COMMAND_MERGE_POINT_ID],
		scheme,
		INTERLOCK_OPEN_ID,
	);

	pointsAcc[CLOSE_LIMIT_SWITCH_INPUT_POINT_ID] = calcPoint(
		pointsAcc[CONTROL_BREAKER_OUTPUT_POINT_ID],
		scheme,
		LIMIT_SWITCH_CLOSE_ID,
	);

	pointsAcc[CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID] = calcPoint(
		pointsAcc[CLOSE_LIMIT_SWITCH_INPUT_POINT_ID],
		scheme,
		WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	);

	pointsAcc[CLOSE_COMMAND_MERGE_POINT_ID] =
		calcPoint(
			pointsAcc[CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID],
			scheme,
			CLOSE_COMMAND_FROM_PTK_INSERT_ID,
		) ||
		calcPoint(
			pointsAcc[CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID],
			scheme,
			BUTTON_KRUZA_P_CLOSE_ID,
		);

	pointsAcc[CLOSE_INTERLOCK_INPUT_POINT_ID] = calcPoint(
		pointsAcc[CLOSE_COMMAND_MERGE_POINT_ID],
		scheme,
		INTERLOCK_CLOSE_ID,
	);

	setVoltagePoints(pointsAcc);
	return pointsAcc;
}
