import { useCallback, useRef, useState } from 'react';

export type SwitchMode = 'on' | 'off';

export function useSwitchingTumbler(
	handleRef: React.RefObject<HTMLDivElement | null>,
	initialMode: SwitchMode,
) {
	const [currentMode, setCurrentMode] = useState<SwitchMode>(initialMode);

	const isDragging = useRef(false);

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

			const newY = Math.max(minY, Math.min(cursorY, maxY));

			// Применяем новую позицию
			handleRef.current.style.transform = `translateY(${newY}px)`;

			// Определяем текущий режим на основе положения
			const threshold = switchRect.height / 2;
			const newMode = newY < threshold ? 'on' : 'off';

			if (newMode !== currentMode) {
				setCurrentMode(newMode);
			}
		},
		[currentMode, handleRef],
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

	return {
		currentMode,
		onMouseDown,
	};
}
