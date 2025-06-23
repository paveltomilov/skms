import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useAppDispatch } from '@/shared/hooks/store';
import { setCurrentMode } from '@/store/multimeterSlice';
import { MultimeterMode } from '../types/multimeter';

//Управляет вращением стрелки и дебаунсом диспатча в store.

export function useMultimeterKnob<T extends string>(
	knobRef: React.RefObject<SVGSVGElement | null>,
	modeAngles: Record<T, number>,
	initialMode: T,
) {
	const [currentMode, setCurrentModeLocal] = useState<T>(initialMode);
	const [currentAngle, setCurrentAngle] = useState(modeAngles[initialMode]);
	const isDragging = useRef(false);
	const dispatch = useAppDispatch();

	const debouncedMode = useDebounce(currentMode, 1000);

	// Диспатчим debounced значение в store
	useEffect(() => {
		dispatch(setCurrentMode(debouncedMode as MultimeterMode));
	}, [debouncedMode, dispatch]);

	// Находим ближайший режим по углу
	const findClosestMode = useCallback(
		(angle: number): T => {
			return (Object.entries(modeAngles) as [T, number][]).reduce(
				(closest, [mode, angleVal]) => {
					const diff = Math.abs(angleVal - angle);
					const closestDiff = Math.abs(modeAngles[closest] - angle);
					return diff < closestDiff ? mode : closest;
				},
				Object.keys(modeAngles)[0] as T,
			);
		},
		[modeAngles],
	);

	useEffect(() => {
		setCurrentModeLocal(initialMode);
		setCurrentAngle(modeAngles[initialMode]);
	}, [initialMode, modeAngles]);

	// Обработка вращения
	const handleMouseMove = useCallback(
		(event: MouseEvent | TouchEvent) => {
			if (!isDragging.current || !knobRef.current) return;

			const rect = knobRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const clientX =
				'touches' in event ? event.touches[0].clientX : event.clientX;
			const clientY =
				'touches' in event ? event.touches[0].clientY : event.clientY;

			const deltaX = clientX - centerX;
			const deltaY = clientY - centerY;
			let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
			angle = (angle + 360) % 360;

			const closestMode = findClosestMode(angle);
			setCurrentModeLocal(closestMode);
			setCurrentAngle(modeAngles[closestMode]);

			event.preventDefault();
		},
		[findClosestMode, modeAngles, knobRef],
	);

	const stopDragging = useCallback(() => {
		isDragging.current = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', stopDragging);
		window.removeEventListener('touchmove', handleMouseMove);
		window.removeEventListener('touchend', stopDragging);
	}, [handleMouseMove]);

	const onMouseDown = useCallback(
		(e: React.MouseEvent | React.TouchEvent) => {
			e.preventDefault();
			isDragging.current = true;

			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', stopDragging);
			window.addEventListener('touchmove', handleMouseMove, {
				passive: false,
			});
			window.addEventListener('touchend', stopDragging);
		},
		[handleMouseMove, stopDragging],
	);

	return {
		currentAngle,
		onMouseDown,
	};
}
