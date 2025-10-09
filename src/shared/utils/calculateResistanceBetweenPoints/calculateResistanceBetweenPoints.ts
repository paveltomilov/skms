import { RESISTANCE_MEASUREMENTS, OHM_OPEN_LINE } from '@/shared/configs/resistanceMeasurement';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { InitialStateScheme } from '@/shared/types/scheme';

const makeKey = (a: string, b: string): string =>
	[a, b].sort((left, right) => (left > right ? 1 : left < right ? -1 : 0)).join('__');

const measurementMap = new Map<string, string>(
	RESISTANCE_MEASUREMENTS.map(({ points, elementId }) => [makeKey(points[0], points[1]), elementId]),
);

export const calculateResistanceBetweenPoints = (
	pointA: string | null,
	pointB: string | null,
	circuit: InitialStateScheme,
): number | null => {
	if (!pointA || !pointB) {
		return null;
	}

	if (pointA === pointB) {
		return 0;
	}

	const key = makeKey(pointA, pointB);
	const elementId = measurementMap.get(key);

	if (!elementId) {
		return OHM_OPEN_LINE;
	}

	try {
		const element = findElementByID(elementId, circuit);
		return typeof element?.resistance === 'number' ? element.resistance : OHM_OPEN_LINE;
	} catch {
		return OHM_OPEN_LINE;
	}
};
