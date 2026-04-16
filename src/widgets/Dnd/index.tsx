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

interface Props {
	children: ReactNode;
}

export const Dnd: React.FC<Props> = ({ children }) => {
	const dispatch = useAppDispatch();
	const probeConnections = useAppSelector(
		state => state.multimeter.probeConnections,
	);
	const isModalBlockingMultimeter = useAppSelector(state => {
		return Object.entries(state.modal)
			.filter(
				([key]) =>
					key !== 'lamps' &&
					key !== 'motor' &&
					key !== 'block_switches' &&
					key !== 'starter',
			)
			.some(([, value]) => Boolean(value));
	});

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
					(dropData as { pointId?: UniqueIdentifier })?.pointId ??
					over.id;
				const isPointOccupied = Object.values(probeConnections).some(
					conn =>
						Boolean(conn) &&
						(
							conn as {
								pointId?: UniqueIdentifier | null;
							}
						).pointId === pointId,
				);

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

	// ⚠️ УДАЛЕНО: Отправка сообщений через WebSocket
	// Бэкенд не обрабатывает входящие сообщения через WebSocket
	// Все действия должны выполняться через REST API
	// При подключении к WebSocket сервер автоматически отправляет активную симуляцию (если есть)

	useEffect(() => {
		if (!isModalBlockingMultimeter) return;
		dispatch(detachProbe('red'));
		dispatch(detachProbe('black'));
		dispatch(setActiveProb(null));
	}, [dispatch, isModalBlockingMultimeter]);

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
