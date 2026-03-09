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

			const centerX: number = rect.left + rect.width / 2;
			const centerY: number = rect.top + rect.height / 2;

			const deltaX: number = clientX - centerX;
			const deltaY: number = clientY - centerY;

			let newAngle: number =
				Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
			newAngle = (newAngle + 360) % 360;

			return newAngle;
		},
		[knobRef],
	);

	// будет искать ближайший режим к текущему углу, если тот попадает в заданный допуск (tolerance)
	const getClosestModeWithinTolerance = useCallback(
		(
			currentAngle: number,
			tolerance: number = 10,
		): { mode: T; angle: number } | null => {
			const entries = Object.entries(modeAngles) as [T, number][];

			for (const [mode, modeAngle] of entries) {
				const diff: number = Math.abs(modeAngle - currentAngle);
				const angleDiff: number = Math.min(diff, 360 - diff); // учёт перехода через 360°

				if (angleDiff <= tolerance) {
					return { mode, angle: modeAngle };
				}
			}

			return null;
		},
		[modeAngles],
	);

	// Обработка перетаскивания
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging.current) return;

			const rawAngle: number | null = calculateAngle(
				e.clientX,
				e.clientY,
			);
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
		window.removeEventListener('mouseleave', stopDragging);
	}, [handleMouseMove]);

	const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			isDragging.current = true;

			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', stopDragging);
			window.addEventListener('mouseleave', stopDragging);
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
