'use client';

import React, { ReactNode } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import {
	attachProbe,
	detachProbe,
	setActiveProb,
} from '@/store/multimeterSlice';
import { probeTipCollisionDetection } from '@/shared/lib/probeTipCollisionDetection';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { ProbeColor } from '@/shared/types/multimeter';
import { useWebSocket } from '@/shared/hooks/useWebSocket';

interface Props {
	children: ReactNode;
}

export const Dnd: React.FC<Props> = ({ children }) => {
	const dispatch = useAppDispatch();

	const probeConnections = useAppSelector(
		state => state.multimeter.probeConnections,
	);

	const handleDragStart = ({ active }: DragStartEvent) => {
		const probeColor = active.id as 'red' | 'black';
		dispatch(setActiveProb(probeColor));
		dispatch(detachProbe(probeColor));
	};

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		const probeColor = active.id as ProbeColor;
		if (over && over.data.current?.type === 'point') {
			const pointId = over.id;

			// Проверяем, не занята ли точка другим щупом
			const isPointOccupied =
				Object.values(probeConnections).includes(pointId);

			if (!isPointOccupied) {
				// Если если точка не занята - прикрепляем
				dispatch(
					attachProbe({
						probeColor,
						pointId,
					}),
				);
			}
		} else {
			// Если щуп отпустили не над точкой - открепляем
			dispatch(detachProbe(probeColor));
		}
		dispatch(setActiveProb(null));
	};

	// подключение к вебсокету
	const { sendMessage } = useWebSocket();

	sendMessage({
		type: 'start_simulation',
		studentId: '12345',
	});

	return (
		<DndContext
			collisionDetection={probeTipCollisionDetection}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToParentElement]}
		>
			{children}
		</DndContext>
	);
};

export default Dnd;
