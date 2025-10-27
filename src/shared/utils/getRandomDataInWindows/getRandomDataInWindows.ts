import { KeyWindows, WINDOWS } from '../../configs/window';
import { getRandomNumberWindows } from '../getRandomNumberWindows/getRandomNumberWindows';

const getRandomDataInWindows = (
	id: KeyWindows,
	volumePercent: number,
): number | null => {
	const windowsConfig = WINDOWS[id];
	const { currentValue, maxValue, minValue, unitsMeasurement } =
		windowsConfig;
	const PERCENT_OF_CHANGE = 2 / 100;
	const PERCENT_OF_VOLUME = volumePercent === 0 ? 0 : volumePercent / 100;
	const BASE_VOLUME = maxValue - minValue;
	const PERCENT_BASE = BASE_VOLUME * PERCENT_OF_VOLUME + minValue;

	if (currentValue == null) {
		return currentValue;
	}
	let calculated = currentValue;

	if (PERCENT_OF_VOLUME) {
		calculated = PERCENT_BASE;
	}

	if (
		unitsMeasurement === '%' &&
		calculated + calculated * PERCENT_OF_CHANGE >= 100
	) {
		return getRandomNumberWindows(
			calculated - calculated * PERCENT_OF_CHANGE,
			100,
		);
	}

	return getRandomNumberWindows(
		Math.min(
			calculated - calculated * PERCENT_OF_CHANGE,
			calculated + calculated * PERCENT_OF_CHANGE,
		),
		Math.max(
			calculated - calculated * PERCENT_OF_CHANGE,
			calculated + calculated * PERCENT_OF_CHANGE,
		),
	);
};

export default getRandomDataInWindows;
