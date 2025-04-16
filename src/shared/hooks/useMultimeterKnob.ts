import { useCallback, useRef, useState } from 'react';

/**
 * Хук управления стрелкой мультиметра.
 *
 * @template T — тип ключей режимов (например, 'OFF' | 'ACV_750' | ...)
 * @param knobRef - ссылка на стрелку/элемент, за который вращаем
 * @param modeAngles - объект: режим → угол
 * @param initialMode - начальный режим
 */
export function useMultimeterKnob<T extends string>(
	knobRef: React.RefObject<SVGSVGElement | null>,
	modeAngles: Record<T, number>,
	initialMode: T,
) {
	const [currentMode, setCurrentMode] = useState<T>(initialMode);
	const [currentAngle, setCurrentAngle] = useState(
		modeAngles[initialMode] ?? 0,
	);
	const isDragging = useRef(false);

	// Определяем ближайший режим к углу
	const findClosestMode = useCallback(
		(angle: number): T => {
			return (Object.entries(modeAngles) as [T, number][]).reduce(
				(closest, [mode, angleValue]) => {
					const diff = Math.abs(angleValue - angle);
					const closestDiff = Math.abs(modeAngles[closest] - angle);
					return diff < closestDiff ? mode : closest;
				},
				Object.keys(modeAngles)[0] as T,
			);
		},
		[modeAngles],
	);

	// Обработка движения
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

			// Прерываем если курсор вышел за пределы стрелки
			if (
				clientX < rect.left ||
				clientX > rect.right ||
				clientY < rect.top ||
				clientY > rect.bottom
			) {
				stopDragging();
				return;
			}

			const deltaX = clientX - centerX;
			const deltaY = clientY - centerY;
			let angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
			angleDeg = (angleDeg + 360) % 360;

			const closestMode = findClosestMode(angleDeg);
			const snappedAngle = modeAngles[closestMode];

			setCurrentMode(closestMode);
			setCurrentAngle(snappedAngle);

			event.preventDefault();
		},
		[findClosestMode, modeAngles, knobRef],
	);

	// Остановка
	const stopDragging = useCallback(() => {
		if (isDragging.current) {
			isDragging.current = false;
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', stopDragging);
			window.removeEventListener('touchmove', handleMouseMove);
			window.removeEventListener('touchend', stopDragging);
		}
	}, [handleMouseMove]);

	// Старт вращения
	const onMouseDown = useCallback(
		(event: React.MouseEvent | React.TouchEvent) => {
			event.preventDefault();
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
		currentMode, // текущий режим (ключ из modeAngles)
		currentAngle, // угол поворота в градусах
		onMouseDown, // обработчик для стрелки
	};
}
