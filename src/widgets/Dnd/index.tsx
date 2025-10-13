'use client';

import React, { ReactNode } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import {
	attachProbe,
	detachProbe,
	setActiveProb,
} from '@/store/multimeterSlice';
import { ProbeColor } from '@/shared/types/multimeter';
import { probeTipCollisionDetection } from '@/shared/lib/probeTipCollisionDetection';
import { useWebSocket } from '@/shared/hooks/useWebSocket';

interface Props {
	children: ReactNode;
}

export const Dnd: React.FC<Props> = ({ children }) => {
	const dispatch = useAppDispatch();

	const probeConnections = useAppSelector(
		state => state.multimeter.probeConnections,
	);
	const currentMode = useAppSelector(state => state.multimeter.currentMode);

	const handleDragStart = ({ active }: DragStartEvent) => {
		const probeColor = active.id as ProbeColor;
		dispatch(setActiveProb(probeColor));
		dispatch(detachProbe(probeColor));
	};

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		const probeColor = active.id as ProbeColor;

		if (currentMode === 'OFF') {
			dispatch(detachProbe(probeColor));
			dispatch(setActiveProb(null));
			return;
		}

		if (over && over.data.current?.type === 'point') {
			const pointId =
				(over.data.current?.pointId as string | undefined) ??
				(over.id as string);
			const dropId =
				(over.data.current?.dropId as string | undefined) ?? null;

			const isPointOccupied = Object.values(probeConnections).some(
				connection => connection.pointId === pointId,
			);

			if (!isPointOccupied) {
				dispatch(
					attachProbe({
						probeColor,
						pointId,
						dropId,
					}),
				);
			}
		} else {
			dispatch(detachProbe(probeColor));
		}

		dispatch(setActiveProb(null));
	};

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


