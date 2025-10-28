import { useDispatch, useSelector } from 'react-redux';
import { KeyWindows } from '../configs/window';
import { AppDispatch, RootState } from '@/store/store';
import { setValueAll } from '@/store/windowsSlice';
import getRandomDataInWindows from '../utils/getRandomDataInWindows/getRandomDataInWindows';
import { useAppSelector } from './store';
import { useEffect } from 'react';
import { getRandomNumberWindows } from '../utils/getRandomNumberWindows/getRandomNumberWindows';

const useRandomWindowCurrentValue = () => {
	const dispatch = useDispatch<AppDispatch>();
	const windows = useSelector((state: RootState) => state.windows);
	const volumePercent = useAppSelector((state: RootState) => state.percent);

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
					currentValue: getRandomDataInWindows(key, volumePercent),
				};
			}
		}

		dispatch(setValueAll(updatedWindows));
	};

	useEffect(() => {
		const interval = setInterval(() => {
			updateRandomValues();
		}, getRandomNumberWindows(1000, 2000));
		return () => clearInterval(interval);
	}, [updateRandomValues]);
};


export default useRandomWindowCurrentValue;