import { useCallback, useRef, useState } from 'react';

//Управляет вращением стрелки
export function useRotateKnob<T extends string>(
	knobRef: React.RefObject<SVGSVGElement | null>,
	modeAngles: Record<T, number>,
	initialMode: T,
	isFaultActive: boolean = true
) {
	const [angle, setAngle] = useState<number>(modeAngles[initialMode]);
	const isDragging = useRef(false);
	const [faultMode, setFaultMode] = useState(false);
	const returnAngle = useRef<number>(270);
	const maxFaultAngle = 330;
	const minFaultAngle = 270;

	const calculateAngle = useCallback(
		(clientX: number, clientY: number): number | null => {
			const rect = knobRef.current?.getBoundingClientRect();
			if (!rect) return null;

			const centerX: number = rect.left + rect.width / 2;
			const centerY: number = rect.top + rect.height / 2;

			const deltaX: number = clientX - centerX;
			const deltaY: number = clientY - centerY;

			let newAngle: number = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
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

			const rawAngle: number | null = calculateAngle(e.clientX, e.clientY);
			if (rawAngle === null) return;

			if (isFaultActive && faultMode) {
				// При первом движении после активации неисправности
				// или когда колесо находится в положении 270°
				let targetAngle = rawAngle;

				// Ограничиваем угол в пределах 270-330 градусов
				if (targetAngle < minFaultAngle || targetAngle > maxFaultAngle) {
					// Если угол выходит за пределы, вычисляем ближайший допустимый
					const to270 = Math.abs(targetAngle - minFaultAngle);
					const to330 = Math.abs(targetAngle - maxFaultAngle);

					// Также учитываем переход через 0°
					const to270Alt = Math.abs((targetAngle + 360) - minFaultAngle);
					const to330Alt = Math.abs((targetAngle + 360) - maxFaultAngle);

					const minDist = Math.min(to270, to330, to270Alt, to330Alt);

					if (minDist === to270 || minDist === to270Alt) {
						targetAngle = minFaultAngle;
					} else {
						targetAngle = maxFaultAngle;
					}
				}

				setAngle(targetAngle);
				return;
			}

			const snapped = getClosestModeWithinTolerance(rawAngle);

			if (isFaultActive && snapped?.mode === 'off') {
				setFaultMode(true);
				returnAngle.current = minFaultAngle;
			}
			setAngle(snapped ? snapped.angle : rawAngle);
		},
		[calculateAngle, faultMode, getClosestModeWithinTolerance, isFaultActive],
	);

	const stopDragging = useCallback(() => {
		isDragging.current = false;

		if (isFaultActive && faultMode) {
			setAngle(minFaultAngle);
		}

		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', stopDragging);
		window.removeEventListener('mouseleave', stopDragging);
	}, [faultMode, handleMouseMove, isFaultActive]);

	const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			isDragging.current = true;

			if (isFaultActive && faultMode) {
				setAngle(minFaultAngle);
			}

			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', stopDragging);
			window.addEventListener('mouseleave', stopDragging);
		},
		[faultMode, handleMouseMove, isFaultActive, stopDragging],
	);

	// Определить ближайший режим с учетом допуска
	const getSelectedMode = useCallback((): T | null => {
		if (isFaultActive && faultMode) {
			const result = getClosestModeWithinTolerance(minFaultAngle);
			return result ? result.mode : null;
		}
		
		const result = getClosestModeWithinTolerance(angle);
		return result ? result.mode : null;
	}, [angle, faultMode, getClosestModeWithinTolerance, isFaultActive]);

	return {
		angle, // угол поворота (для отображения)
		onMouseDown, // обработчик нажатия
		getSelectedMode, // функция для получения режима
	};
}