import { KeyWindows, WINDOWS } from '../../configs/window';
import { getRandomNumberWindows } from '../getRandomNumberWindows/getRandomNumberWindows';

const getRandomDataInWindows = (
	id: KeyWindows,
	volumePercent: number,
): number | null => {
	const windowsConfig = WINDOWS[id];
	const { currentValue, maxValue, minValue, unitsMeasurement } =
		windowsConfig;
	const PercentOfChange = 2 / 100;

	if (currentValue == null) {
		return currentValue;
	}
	// при значении слайдера off volumePercent = -1 для возврата дефолтного значения из WINDOWS
	if (volumePercent === -1) {
		return getRandomNumberWindows(
			currentValue - Math.abs(currentValue * PercentOfChange),
			currentValue + Math.abs(currentValue * PercentOfChange),
		);
	}

	if (volumePercent === 0) {
		return getRandomNumberWindows(
			minValue,
			minValue + Math.abs(minValue * PercentOfChange),
		);
	}
	if (volumePercent === 100) {
		return getRandomNumberWindows(
			maxValue - Math.abs(maxValue * PercentOfChange),
			maxValue,
		);
	}
	const TargetPercent = volumePercent / 100;
	const BaseVolume = maxValue - minValue;
	const PercentBase = BaseVolume * TargetPercent + minValue;
	const min = PercentBase - PercentBase * PercentOfChange;
	const max = PercentBase + PercentBase * PercentOfChange;

	if (unitsMeasurement === '%' && max >= 100) {
		return getRandomNumberWindows(min, 100);
	}
	if (unitsMeasurement === '%' && min <= 0) {
		return getRandomNumberWindows(0, max);
	}

	return getRandomNumberWindows(min, max);
};

export default getRandomDataInWindows;
