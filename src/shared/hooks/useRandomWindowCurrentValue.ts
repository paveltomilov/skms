import { useDispatch } from 'react-redux';
import { KeyWindows } from '../configs/window';
import { AppDispatch, RootState } from '@/store/store';
import { setValueAll } from '@/store/windowsSlice';
import getRandomDataInWindows from '../utils/getRandomDataInWindows/getRandomDataInWindows';
import { useAppSelector } from './store';
import { useEffect, useRef } from 'react';

const useRandomWindowCurrentValue = () => {
	const dispatch = useDispatch<AppDispatch>();
	const windows = useAppSelector((state: RootState) => state.windows);
	const volumePercent = useAppSelector((state: RootState) => state.percent);

	// Используем ref для хранения актуальных значений без пересоздания эффекта
	const windowsRef = useRef(windows);
	const volumePercentRef = useRef(volumePercent);

	// Обновляем ref при изменении значений
	useEffect(() => {
		windowsRef.current = windows;
	}, [windows]);

	useEffect(() => {
		volumePercentRef.current = volumePercent;
	}, [volumePercent]);

	useEffect(() => {
		const updateRandomValues = () => {
			// Используем актуальные значения из ref
			const currentWindows = windowsRef.current;
			const currentVolumePercent = volumePercentRef.current;

			const updatedWindows = {} as Record<
				KeyWindows,
				(typeof currentWindows)[KeyWindows]
			>;
			let key: KeyWindows;
			for (key in currentWindows) {
				if (currentWindows.hasOwnProperty(key)) {
					updatedWindows[key] = {
						...currentWindows[key],
						currentValue: getRandomDataInWindows(
							key,
							currentVolumePercent,
						),
					};
				}
			}
			dispatch(setValueAll(updatedWindows));
		};

		// Используем фиксированный интервал для стабильности
		const interval = setInterval(updateRandomValues, 1500);
		return () => clearInterval(interval);
	}, [dispatch]); // dispatch стабилен, эффект не будет пересоздаваться
};

export default useRandomWindowCurrentValue;
