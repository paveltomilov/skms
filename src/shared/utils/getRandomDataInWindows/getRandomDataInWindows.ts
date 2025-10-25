import { KeyWindows, WINDOWS } from '../../configs/window';
import { getRandomNumberWindows } from '../getRandomNumberWindows/getRandomNumberWindows';

const getRandomDataInWindows = (id: KeyWindows): number | null => {
	const windowsConfig = WINDOWS[id];
	const { currentValue } = windowsConfig;
	let percent = 1;

	if (currentValue == null || currentValue === 0) {
		return currentValue;
	}
	const moduleCurrentValue = Math.abs(currentValue);

	if (moduleCurrentValue < 1 && moduleCurrentValue > 0) {
		percent = 5;
	}
	if (moduleCurrentValue < 10 && moduleCurrentValue > 1) {
		percent = 3;
	}
	if (moduleCurrentValue < 50 && moduleCurrentValue > 10) {
		percent = 2;
	}
	return getRandomNumberWindows(
		currentValue - currentValue * (percent / 100),
		currentValue + currentValue * (percent / 100),
	);
};

export default getRandomDataInWindows;
