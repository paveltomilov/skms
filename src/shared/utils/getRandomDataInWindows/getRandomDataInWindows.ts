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

	const deviation = PercentWithBase * PercentOfChange;

	let min =
		PercentWithBase - deviation <= minValue
			? minValue
			: PercentWithBase - deviation;
	let max =
		PercentWithBase + deviation >= maxValue
			? maxValue
			: PercentWithBase + deviation;

	if (PercentWithBase < 0) {
		min =
			PercentWithBase - deviation <= minValue
				? minValue
				: PercentWithBase - deviation;
		max =
			PercentWithBase + deviation <= minValue
				? minValue
				: PercentWithBase + deviation;
	}

	return getRandomNumberWindows(min, max);
};

export default getRandomDataInWindows;
