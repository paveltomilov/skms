// Этот файл заменяет стандартную логику dnd-kit по определению пересечений (которая обычно смотрит на курсор 
// или весь элемент).
// Что он делает:
// Вычисляет "кончик": Когда вы тащите щуп, он берет его текущее положение и, с помощью констант 
// (TIP_OFFSET_X/Y, TIP_WIDTH, TIP_HEIGHT), вычисляет маленький прямоугольник точно там, где должен быть 
// кончик щупа.
// Ищет пересечения: Проверяет, пересекается ли именно этот маленький прямоугольник кончика с доступными 
// точками 
// подключения на схеме.
// Сообщает результат: Возвращает dnd-kit список тех точек, с которыми кончик пересекся.
// Зачем это нужно:
// Чтобы подсветка точки и "прилипание" щупа к ней происходили только тогда, когда вы наводите на точку 
// именно кончиком щупа, а не просто курсором мыши или любой другой частью иконки щупа.

import type { CollisionDetection, ClientRect } from '@dnd-kit/core';

// --- Константы для кончика щупа ---
const TIP_HEIGHT = 4;
const TIP_WIDTH = 10;
const TIP_OFFSET_X = 5;
const TIP_OFFSET_Y = 0;
// -------------------------------------

export const probeTipCollisionDetection: CollisionDetection = ({
    active, // Тип Active неявно используется сигнатурой CollisionDetection
    droppableContainers, // Тип DroppableContainer[] неявно используется сигнатурой
    droppableRects,
}) => {
    // Проверяем, что перетаскивается именно щуп
    if (active.data.current?.type !== 'probe') {
        // Для не-щупов просто возвращаем пустой массив (нет коллизий с точками)
         return [];
    }

    // Получаем текущее положение ПЕРЕТАСКИВАЕМОГО элемента (оверлея)
    const activeRect = active.rect.current.translated;
    if (!activeRect) {
        return [];
    }

    // Вычисляем прямоугольник "активного кончика" щупа
    const probeTipRect: ClientRect = {
        width: TIP_WIDTH,
        height: TIP_HEIGHT,
        top: activeRect.top + TIP_OFFSET_Y,
        left: activeRect.left + TIP_OFFSET_X,
        bottom: activeRect.top + TIP_OFFSET_Y + TIP_HEIGHT,
        right: activeRect.left + TIP_OFFSET_X + TIP_WIDTH,
    };

    const collisions = [];

    // Проверяем пересечение "кончика" с каждой "точкой" (droppable)
    // Переменная droppableContainer используется в цикле
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