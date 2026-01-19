import { useDispatch } from 'react-redux';
import { KeyWindows } from '../configs/window';
import { AppDispatch, RootState } from '@/store/store';
import { setValueAll } from '@/store/windowsSlice';
import getRandomDataInWindows from '../utils/getRandomDataInWindows/getRandomDataInWindows';
import { useAppSelector } from './store';
import { useEffect, useRef } from 'react';
import { setPercent } from '@/store/percentSlice';

const STEP_CHANGE_PERCENT: number = 100 / 60;

const useRandomWindowCurrentValue = () => {
	const dispatch = useDispatch<AppDispatch>();
	const windows = useAppSelector((state: RootState) => state.windows);
	const volumePercent = useAppSelector((state: RootState) => state.percent);
	const hasEmergency = useAppSelector(store => store.emergencyStatus);

	const windowsRef = useRef(windows);
	const volumePercentRef = useRef(volumePercent);

	useEffect(() => {
		windowsRef.current = windows;
	}, [windows]);

	useEffect(() => {
		volumePercentRef.current = volumePercent;
	}, [volumePercent]);

	useEffect(() => {
		const updateRandomValues = (percent?: number) => {
			const currentVolumePercent = percent ?? volumePercentRef.current;
			const updatedWindows = { ...windowsRef.current };
			let key: KeyWindows;
			for (key in updatedWindows) {
				updatedWindows[key] = {
					...windowsRef.current[key],
					currentValue: getRandomDataInWindows(
						key,
						currentVolumePercent,
					),
				};
			}
			dispatch(setValueAll(updatedWindows));
		};

		let timeoutId: NodeJS.Timeout | null = null;
		let intervalId: NodeJS.Timeout | null = null;

		// уменьшаем показания до 0%
		if (hasEmergency && volumePercent > 0) {
			const nextPercent = Math.max(
				0,
				volumePercent - STEP_CHANGE_PERCENT,
			);
			timeoutId = setTimeout(() => {
				dispatch(setPercent(nextPercent));
				updateRandomValues(nextPercent);
			}, 1000);
		} else {
			// устанавливаем показания на 100%
			if (!hasEmergency && volumePercent < 100) {
				dispatch(setPercent(100));
				updateRandomValues(100);
				// обновляем данные в приделах 1-2% при базовом значении 100% при условии что неисправности в задвижках отсутсвуют
			} else {
				intervalId = setInterval(() => {
					updateRandomValues();
				}, 1500);
			}
		}
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
			if (intervalId) clearInterval(intervalId);
		};
	}, [dispatch, hasEmergency, volumePercent]);
};

export default useRandomWindowCurrentValue;
