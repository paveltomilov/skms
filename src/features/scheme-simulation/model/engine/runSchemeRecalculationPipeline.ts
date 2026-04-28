import { setNewVoltagePoints } from '@/shared/utils/setPointsVoltage/setPointsVoltage';
import { updateStarterContacts } from '@/shared/utils/updateStarterContacts/updateStarterContacts';
import type { InitialStateScheme } from '@/shared/types/scheme';

export interface RecalculationPipelineResult {
	updatedPoints: Record<string, boolean>;
	pointsChanged: boolean;
	resistanceChanges: Record<string, number>;
}

export const runSchemeRecalculationPipeline = (
	scheme: InitialStateScheme,
	points: Record<string, boolean>,
): RecalculationPipelineResult => {
	const updatedPoints = setNewVoltagePoints(scheme, points);
	const pointsChanged = Object.keys(updatedPoints).some(
		key => updatedPoints[key] !== points[key],
	);
	const pointsForContacts = pointsChanged ? updatedPoints : points;
	const resistanceChanges = updateStarterContacts(scheme, pointsForContacts);

	return { updatedPoints, pointsChanged, resistanceChanges };
};
