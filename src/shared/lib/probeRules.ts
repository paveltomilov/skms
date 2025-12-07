import { UniqueIdentifier } from '@dnd-kit/core';
import {
	CLOSED_LAMP_TO_NEUTRAL_POINT_ID,
	CONTROL_CIRCUIT_NEUTRAL_ID,
} from '@/shared/configs/controlCircuit/constants';
import { POWER_CIRCUIT_NEUTRAL_ID } from '@/shared/configs/powerCircuit/constants';
import { ProbeColor } from '@/shared/types/multimeter';

const NEUTRAL_POINT_IDS = new Set<string>([
	POWER_CIRCUIT_NEUTRAL_ID,
	CONTROL_CIRCUIT_NEUTRAL_ID,
	CLOSED_LAMP_TO_NEUTRAL_POINT_ID,
]);

export const isNeutralPoint = (pointId?: UniqueIdentifier | null) => {
	if (!pointId) return false;
	const id = String(pointId);
	const idLower = id.toLowerCase();

	return (
		NEUTRAL_POINT_IDS.has(id) ||
		idLower.includes('neutral') ||
		idLower.endsWith('.n')
	);
};

export const canProbeAttach = (
	color: ProbeColor,
	pointId?: UniqueIdentifier | null,
) => {
	if (!pointId) return true;

	const isNeutral = isNeutralPoint(pointId);
	return color === 'black' ? isNeutral : !isNeutral;
};
