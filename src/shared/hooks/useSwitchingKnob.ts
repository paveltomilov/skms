import { useCallback, useRef, useState } from 'react';

//Управляет вращением стрелки и дебаунсом диспатча в store.

export function useSwitchingKnob<T extends string>(
	knobRef: React.RefObject<SVGSVGElement | null>,
	modeAngles: Record<T, number>,
	initialMode: T,
) {
	const [currentMode, setCurrentMode] = useState<T>(initialMode);
	const isDragging = useRef(false);

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

	// Обработка вращения
	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			event.preventDefault();
			if (!isDragging.current || !knobRef.current) return;

			const rect = knobRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const clientX = event.clientX;
			const clientY = event.clientY;

			const deltaX = clientX - centerX;
			const deltaY = clientY - centerY;
			let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
			angle = (angle + 360) % 360;

			const closestMode = findClosestMode(angle);

			console.log(closestMode);

			if (closestMode !== currentMode) {
				setCurrentMode(closestMode);
			}
		},
		[findClosestMode, modeAngles, knobRef],
	);

	const stopDragging = useCallback(() => {
		isDragging.current = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', stopDragging);
		window.removeEventListener('touchend', stopDragging);
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

	return {
		currentMode,
		onMouseDown,
	};
}
