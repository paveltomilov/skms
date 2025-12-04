import { InitialStateScheme } from '@/shared/types/scheme';
//import { findElementByID } from '../findElementByID/scheme';


export function setNewVoltagePoints(
	scheme: InitialStateScheme,
	points: Record<string, boolean>,
): Record<string, boolean> {
	const pointsAcc = JSON.parse(JSON.stringify(points)) as Record<
		string,
		boolean
	>;



	return pointsAcc;
}
