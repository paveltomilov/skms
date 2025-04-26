// Этот файл заменяет стандартную логику dnd-kit по определению пересечений 
// (которая обычно смотрит на курсор или весь элемент).

// Что он делает:
// Когда тащите щуп, он берет его текущее положение и, с помощью констант 
// (TIP_OFFSET_X/Y, TIP_WIDTH, TIP_HEIGHT), вычисляет маленький прямоугольник 
// точно там, где должен быть кончик щупа.

import type { CollisionDetection, ClientRect } from '@dnd-kit/core';

const TIP_HEIGHT = 4;
const TIP_WIDTH = 10;
const TIP_OFFSET_X = 5;
const TIP_OFFSET_Y = 0;

export const probeTipCollisionDetection: CollisionDetection = ({
    active, 
    droppableContainers, 
    droppableRects,
}) => {
    if (active.data.current?.type !== 'probe') {
        return [];
    }

    const activeRect = active.rect.current.translated;
    if (!activeRect) {
        return [];
    }

    const probeTipRect: ClientRect = {
        width: TIP_WIDTH,
        height: TIP_HEIGHT,
        top: activeRect.top + TIP_OFFSET_Y,
        left: activeRect.left + TIP_OFFSET_X,
        bottom: activeRect.top + TIP_OFFSET_Y + TIP_HEIGHT,
        right: activeRect.left + TIP_OFFSET_X + TIP_WIDTH,
    };

    const collisions = [];

    for (const droppableContainer of droppableContainers) {
        const droppableId = droppableContainer.id;
        const droppableRect = droppableRects.get(droppableId);
        const droppableData = droppableContainer.data.current;

        if (!droppableRect || droppableData?.type !== 'node' || !droppableData?.accepts?.includes('probe')) {
            continue;
        }

        if (
            probeTipRect.left < droppableRect.right &&
            probeTipRect.right > droppableRect.left &&
            probeTipRect.top < droppableRect.bottom &&
            probeTipRect.bottom > droppableRect.top
        ) {
            collisions.push({
                id: droppableId,
                data: {
                    droppableContainer,
                    collisionRect: probeTipRect,
                },
            });
        }
    }

    return collisions;
};