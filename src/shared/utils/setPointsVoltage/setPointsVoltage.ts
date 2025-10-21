import { InitialStateScheme } from '@/shared/types/scheme';
import { findElementByID } from '../findElementByID/scheme';

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

	pointsAcc['p.c.1'] = calcPoint(pointsAcc['p.c.0'], scheme, 'c.1');

	pointsAcc['p.c.2'] = calcPoint(pointsAcc['p.c.1'], scheme, 'c.2');

	pointsAcc['p.c.3.1.1'] = calcPoint(pointsAcc['p.c.2'], scheme, 'c.3.1.1');

	pointsAcc['p.c.3.1.2'] = calcPoint(
		pointsAcc['p.c.3.1.1'],
		scheme,
		'c.3.1.2',
	);

	pointsAcc['p.c.3.1.3.2.1'] =
		calcPoint(pointsAcc['p.c.3.1.2'], scheme, 'c.3.1.3.2.1.1') ||
		calcPoint(pointsAcc['p.c.3.1.2'], scheme, 'c.3.1.3.2.1.2');

	pointsAcc['p.c.3.1.3.2.2'] = calcPoint(
		pointsAcc['p.c.3.1.3.2.1'],
		scheme,
		'c.3.1.3.2.2',
	);

	pointsAcc['p.c.3.2.1'] = calcPoint(pointsAcc['p.c.2'], scheme, 'c.3.2.1');

	pointsAcc['p.c.3.2.2'] = calcPoint(
		pointsAcc['p.c.3.2.1'],
		scheme,
		'c.3.2.2',
	);

	pointsAcc['p.c.3.2.3.2.1'] =
		calcPoint(pointsAcc['p.c.3.2.2'], scheme, 'c.3.2.3.2.1.1') ||
		calcPoint(pointsAcc['p.c.3.2.2'], scheme, 'c.3.2.3.2.1.2');

	pointsAcc['p.c.3.2.3.2.2'] = calcPoint(
		pointsAcc['p.c.3.2.3.2.1'],
		scheme,
		'c.3.2.3.2.2',
	);

	setVoltagePoints(pointsAcc);
	return pointsAcc;
}
