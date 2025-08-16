import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Positions {
  [key: string]: Position;
}

export function useDragging() {
  const [position, setPosition] = useState<Positions>({
    control: { x: 0, y: 0 },
    diagnostic: { x: 0, y: 0 },
    values: { x: 0, y: 0 },
    automatic: { x: 0, y: 0 },
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [startPos, setStartPos] = useState<Positions>({
    control: { x: 0, y: 0 },
    diagnostic: { x: 0, y: 0 },
    values: { x: 0, y: 0 },
    automatic: { x: 0, y: 0 },
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget.id;
    if (!target) return;

    setIsDragging(true);
    setActiveTarget(target);

    setStartPos(prev => ({
      ...prev,
      [target]: {
        x: e.clientX - position[target].x,
        y: e.clientY - position[target].y,
      },
    }));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !activeTarget) return;

    setPosition(prev => ({
      ...prev,
      [activeTarget]: {
        x: e.clientX - startPos[activeTarget].x,
        y: e.clientY - startPos[activeTarget].y,
      },
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveTarget(null);
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
  }, [isDragging, activeTarget, startPos]);

  return {
    handleMouseDown,
    position,
  };
}