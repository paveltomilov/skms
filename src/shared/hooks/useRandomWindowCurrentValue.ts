import { useDispatch, useSelector } from 'react-redux';
import { KeyWindows } from '../configs/window';
import { AppDispatch, RootState } from '@/store/store';
import { setValueAll } from '@/store/windowsSlice';
import getRandomDataInWindows from '../utils/getRandomDataInWindows/getRandomDataInWindows';
import { useAppSelector } from './store';

const useRandomWindowCurrentValue = () => {
	const dispatch = useDispatch<AppDispatch>();
	const windows = useSelector((state: RootState) => state.windows);
	const valuePercent = useAppSelector((state: RootState) => state.percent);

	const updateRandomValues = () => {
		const updatedWindows = {} as Record<
			KeyWindows,
			(typeof windows)[KeyWindows]
		>;
		let key: KeyWindows;
		for (key in windows) {
			if (windows.hasOwnProperty(key)) {
				updatedWindows[key] = {
					...windows[key],
					currentValue: getRandomDataInWindows(key, valuePercent),
				};
			}
		}

		dispatch(setValueAll(updatedWindows));
	};

	return updateRandomValues;
};

export default useRandomWindowCurrentValue;
