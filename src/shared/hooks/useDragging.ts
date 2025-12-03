import { useState, useEffect, useCallback, RefObject } from 'react';

interface Position {
	x: number;
	y: number;
}

export function useDragging(ref: RefObject<HTMLElement|null>) {
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });

	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);

		setStartPos({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const handleMouseMove = useCallback((e: MouseEvent) => {
			if (!isDragging || !ref.current) return;

			const rect = ref.current.getBoundingClientRect();
			const elementWidth = rect.width;
			const elementHeight = rect.height;

			let newX = e.clientX - startPos.x;
			let newY = e.clientY - startPos.y;

			newX = Math.max(0, Math.min(newX, window.innerWidth - elementWidth));
			newY = Math.max(0, Math.min(newY, window.innerHeight - elementHeight));

			setPosition({ x: newX, y: newY });
		}, [isDragging, startPos.x, startPos.y, ref]
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Добавляем/удаляем глобальные обработчики
	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		} else {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, handleMouseMove, handleMouseUp]);

	return {
		handleMouseDown,
		position,
		setPosition
	};
};