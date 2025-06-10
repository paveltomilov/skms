import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useAppDispatch } from '@/shared/hooks/store';
import { setResistance } from '@/store/circuitSlice';
import {
	BASE_RESISTANCE,
	HIGH_RESISTANCE,
	INPUT_CIRCUIT_BREAKER,
} from '../configs/scheme';

type SwitchMode = 'on' | 'off';

export function useSwitchingSwitch(
	handleRef: React.RefObject<HTMLDivElement | null>,
	initialMode: SwitchMode,
) {
	const [currentMode, setCurrentMode] = useState<SwitchMode>(initialMode);

	const isDragging = useRef(false);
	const dispatch = useAppDispatch();

	const debouncedMode = useDebounce(currentMode, 1000);

	// Диспатчим debounced значение в store
	useEffect(() => {
		for (const id of INPUT_CIRCUIT_BREAKER) {
			const resistance =
				debouncedMode === 'on' ? BASE_RESISTANCE[id] : HIGH_RESISTANCE;
			dispatch(setResistance({ id, value: resistance }));
		}
	}, [debouncedMode, dispatch]);

	// Обработка перетаскивания
	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
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

			event.preventDefault();
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
