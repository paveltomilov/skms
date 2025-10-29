import { KeyWindows, WINDOWS } from '../../configs/window';
import { getRandomNumberWindows } from '../getRandomNumberWindows/getRandomNumberWindows';

const getRandomDataInWindows = (
	id: KeyWindows,
	volumePercent: number,
): number | null => {
	const windowsConfig = WINDOWS[id];
	const { currentValue, maxValue, minValue } = windowsConfig;
	const PercentOfChange = 2 / 100;
	const TargetPercent = volumePercent / 100;
	const BaseVolume = maxValue - minValue;

	if (currentValue == null) {
		return currentValue;
	}
	const PercentWithBase =
		volumePercent === -1 // при значении слайдера off volumePercent = -1, реализовано для возврата дефолтного значения из WINDOWS
			? currentValue
			: BaseVolume * TargetPercent + minValue;

	let min =
		PercentWithBase - PercentWithBase * PercentOfChange <= minValue
			? minValue
			: PercentWithBase - PercentWithBase * PercentOfChange;
	let max =
		PercentWithBase + PercentWithBase * PercentOfChange >= maxValue
			? maxValue
			: PercentWithBase + PercentWithBase * PercentOfChange;

	if (PercentWithBase < 0) {
		min =
			PercentWithBase - PercentWithBase * PercentOfChange <= minValue
				? minValue
				: PercentWithBase - PercentWithBase * PercentOfChange;
		max =
			PercentWithBase + PercentWithBase * PercentOfChange <= minValue
				? minValue
				: PercentWithBase + PercentWithBase * PercentOfChange;
	}

	return getRandomNumberWindows(min, max);
};

export default getRandomDataInWindows;
