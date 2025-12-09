'use client';

import React, { ReactNode, useCallback, useEffect } from 'react';
import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
	UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import {
	attachProbe,
	detachProbe,
	setActiveProb,
} from '@/store/multimeterSlice';
import { probeTipCollisionDetection } from '@/shared/lib/probeTipCollisionDetection';
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
	const isAnyModalOpen = useAppSelector(state =>
		Object.values(state.modal).some(Boolean),
	);

	const handleDragStart = useCallback(
		({ active }: DragStartEvent) => {
			const probeColor = active.id as ProbeColor;
			dispatch(setActiveProb(probeColor));
			dispatch(detachProbe(probeColor));
		},
		[dispatch],
	);

	const handleDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			const probeColor = active.id as ProbeColor;
			const dropData = over?.data.current;
			const isPointTarget = dropData?.type === 'point';

			if (isPointTarget && over) {
				const pointId =
					(dropData as { pointId?: UniqueIdentifier })
						?.pointId ?? over.id;
				const isPointOccupied = Object.values(
					probeConnections,
				).some(conn => conn && conn.pointId === pointId);

				if (!isPointOccupied) {
					dispatch(
						attachProbe({
							probeColor,
							pointId,
							dropId: over.id,
						}),
					);
				}
			} else {
				dispatch(detachProbe(probeColor));
			}

			dispatch(setActiveProb(null));
		},
		[dispatch, probeConnections],
	);

	const { sendMessage } = useWebSocket();

	useEffect(() => {
		sendMessage({
			type: 'start_simulation',
			studentId: '12345',
		});
	}, [sendMessage]);

	useEffect(() => {
		if (!isAnyModalOpen) return;
		dispatch(detachProbe('red'));
		dispatch(detachProbe('black'));
		dispatch(setActiveProb(null));
	}, [dispatch, isAnyModalOpen]);

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
