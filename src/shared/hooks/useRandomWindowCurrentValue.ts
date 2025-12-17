import { useDispatch, useSelector } from 'react-redux';
import { KeyWindows } from '../configs/window';
import { AppDispatch, RootState } from '@/store/store';
import { setValueAll } from '@/store/windowsSlice';
import getRandomDataInWindows from '../utils/getRandomDataInWindows/getRandomDataInWindows';
import { useAppSelector } from './store';
import { useCallback, useEffect } from 'react';
import { getRandomNumberWindows } from '../utils/getRandomNumberWindows/getRandomNumberWindows';
import { setPercent } from '@/store/percentSlice';

const STEP_CHANGE_PERCENT: number = 100 / 60;

const useRandomWindowCurrentValue = () => {
	const dispatch = useDispatch<AppDispatch>();
	const windows = useSelector((state: RootState) => state.windows);
	const volumePercent = useAppSelector((state: RootState) => state.percent);
	const hasEmergency = useAppSelector(store => store.emergencyStatus);

	const updateRandomValues = useCallback(() => {
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
	}, [windows, dispatch, volumePercent]);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		// уменьшаем показания до 0%
		if (hasEmergency && volumePercent > 0) {
			const nextPercent = Math.max(
				0,
				volumePercent - STEP_CHANGE_PERCENT,
			);
			timeoutId = setTimeout(() => {
				dispatch(setPercent(nextPercent));
				updateRandomValues();
			}, 1000);
		} else {
			// устанавливаем показанрия на 100%
			if (!hasEmergency && volumePercent < 100) {
				dispatch(setPercent(100));
				updateRandomValues();
				// обновляем данные в приделах 1-2% при базовом значении 100% при условии что неисправности в задвижках отсутсвуют
			} else {
				const delay = getRandomNumberWindows(1000, 2000);
				timeoutId = setTimeout(() => {
					updateRandomValues();
				}, delay);
			}
		}
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [updateRandomValues, dispatch, hasEmergency, volumePercent]);
};

export default useRandomWindowCurrentValue;
