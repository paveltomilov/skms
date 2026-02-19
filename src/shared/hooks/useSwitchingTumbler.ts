import { useCallback, useEffect, useRef, useState } from 'react';
import { SwitchMode } from '../types/switch';

//Управляет перемещением рубильника
export function useSwitchingTumbler(
	handleRef: React.RefObject<HTMLDivElement | null>,
	initialMode: SwitchMode,
	isFaultActive: boolean = false,
) {
	const [currentMode, setCurrentMode] = useState<SwitchMode>(initialMode);
	const isDragging = useRef(false);
	const startY = useRef(0);

	useEffect(() => {
		setCurrentMode(initialMode);
	}, [initialMode]);


	// Обработка перетаскивания
	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			event.preventDefault();

			if (!isDragging.current || !handleRef.current) return;

			const switchElement = handleRef.current.parentElement;
			if (!switchElement) return;

			// Получаем размеры элементов
			const switchRect = switchElement.getBoundingClientRect();
			const handleRect = handleRef.current.getBoundingClientRect();

			// Вычисляем позицию курсора относительно центра handle
			const cursorY =
				event.clientY - switchRect.top - handleRect.height / 2;

			// Ограничиваем движение в пределах родительского элемента плюс высота handle
			const minY = -handleRect.height; // Верхняя граница (on)
			const maxY = switchRect.height; // Нижняя граница (off)

			let newY = Math.max(minY, Math.min(cursorY, maxY));

			if (isFaultActive) {
				const halfWayUp = (maxY + minY) / 2;
				if (newY < halfWayUp) {
					newY = halfWayUp;
				}
			}

			// Применяем новую позицию
			handleRef.current.style.transform = `translateY(${newY}px)`;

			// Определяем текущий режим на основе положения
			const threshold = switchRect.height / 2;
			const newMode = newY < threshold ? 'on' : 'off';

			if (newMode !== currentMode) {
				setCurrentMode(newMode);
			}
		},
		[currentMode, handleRef, isFaultActive],
	);

	const stopDragging = useCallback(() => {
		isDragging.current = false;

		if (
			isFaultActive &&
			handleRef.current &&
			handleRef.current.parentElement
		) {
			const switchElement = handleRef.current.parentElement;
			const maxY = switchElement.getBoundingClientRect().height;
			handleRef.current.style.transform = `translateY(${maxY}px)`;
			setCurrentMode('off');
		}

		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', stopDragging);
		window.removeEventListener('mouseleave', stopDragging);
	}, [handleMouseMove, handleRef, isFaultActive]);

	const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			isDragging.current = true;

			if (handleRef.current) {
				const computedStyle = window.getComputedStyle(
					handleRef.current,
				);
				const transform = computedStyle.transform;

				if (transform && transform !== 'none') {
					const matrix = new DOMMatrix(transform);
					startY.current = matrix.m42;
				} else if (handleRef.current.parentElement) {
					const parent = handleRef.current.parentElement;
					startY.current = parent.getBoundingClientRect().height;
				}
			}

			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', stopDragging);
			window.removeEventListener('mouseleave', stopDragging);
		},
		[handleMouseMove, handleRef, stopDragging],
	);

	return {
		currentMode,
		onMouseDown,
	};
}
