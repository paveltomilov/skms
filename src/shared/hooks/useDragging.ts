import { useState, useEffect } from 'react';

interface Position {
	x: number;
	y: number;
}

export function useDragging() {
	const [position, setPosition] = useState<Position>({
		x: 0,
		y: 0,
	});

	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [startPos, setStartPos] = useState<Position>({
		x: 0,
		y: 0,
	});

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);

		setStartPos({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;

		setPosition({
			x: e.clientX - startPos.x,
			y: e.clientY - startPos.y,
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

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
	}, [isDragging, startPos]);

	return {
		handleMouseDown,
		position,
	};
}
