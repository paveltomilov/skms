import { useCallback, useRef, useState } from 'react';

//Управляет вращением стрелки
export function useRotateKnob<T extends string>(
	knobRef: React.RefObject<SVGSVGElement | null>,
	modeAngles: Record<T, number>,
	initialMode: T,
) {
	const [angle, setAngle] = useState<number>(modeAngles[initialMode]);
	const isDragging = useRef(false);

	const calculateAngle = useCallback(
		(clientX: number, clientY: number): number | null => {
			const rect = knobRef.current?.getBoundingClientRect();
			if (!rect) return null;

			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const deltaX = clientX - centerX;
			const deltaY = clientY - centerY;

			let newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
			newAngle = (newAngle + 360) % 360;

			return newAngle;
		},
		[knobRef],
	);

	// будет искать ближайший режим к текущему углу, если тот попадает в заданный допуск (tolerance)
	const getClosestModeWithinTolerance = useCallback(
		(
			currentAngle: number,
			tolerance = 10,
		): { mode: T; angle: number } | null => {
			const entries = Object.entries(modeAngles) as [T, number][];

			for (const [mode, modeAngle] of entries) {
				const diff = Math.abs(modeAngle - currentAngle);
				const angleDiff = Math.min(diff, 360 - diff); // учёт перехода через 360°

				if (angleDiff <= tolerance) {
					return { mode, angle: modeAngle };
				}
			}

			return null;
		},
		[modeAngles],
	);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging.current) return;

			const clientX = e.clientX;
			const clientY = e.clientY;

			const rawAngle = calculateAngle(clientX, clientY);
			if (rawAngle === null) return;

			const snapped = getClosestModeWithinTolerance(rawAngle);

			setAngle(snapped ? snapped.angle : rawAngle);
		},
		[calculateAngle, getClosestModeWithinTolerance],
	);

	const stopDragging = useCallback(() => {
		isDragging.current = false;

		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', stopDragging);
	}, [handleMouseMove]);

	const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			isDragging.current = true;

			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', stopDragging);
		},
		[handleMouseMove, stopDragging],
	);

	// Определить ближайший режим с учетом допуска
	const getSelectedMode = useCallback((): T | null => {
		const result = getClosestModeWithinTolerance(angle);
		return result ? result.mode : null;
	}, [angle, getClosestModeWithinTolerance]);

	return {
		angle, // угол поворота (для отображения)
		onMouseDown, // обработчик нажатия
		getSelectedMode, // функция для получения режима
	};
}
