'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './styles.module.scss';
import { IPoint } from '@/shared/types/scheme';
import { useAppSelector } from '@/shared/hooks/store';

interface Props {
	id: string;
	position: IPoint;
	offsetX?: number;
	offsetY?: number;
}

export const SchemePoint: React.FC<Props> = ({
	id,
	position,
	offsetX = 0,
	offsetY = 0,
}) => {
	const { setNodeRef, isOver } = useDroppable({
		id,
		data: {
			id,
			type: 'point',
			pointId: id,
			accepts: 'probe',
		},
	});

	// для визуализации состояния точек
	const schemePoint = useAppSelector(state => state.points[id]);

	const pointClassName = `${styles.point} ${isOver && styles.point_over} ${
		schemePoint ? styles.point__active : styles.point__inactive
	}`;

	return (
		<div
			ref={setNodeRef}
			id={id}
			data-drop-id={id}
			data-droppable-id={id}
			data-probe-offset-x={offsetX}
			data-probe-offset-y={offsetY}
			className={pointClassName}
			style={{ left: `${position.x}px`, top: `${position.y}px` }}
		></div>
	);
};
