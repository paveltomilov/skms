'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './styles.module.scss';
import { IPoint } from '@/shared/types/scheme';
import { useAppSelector } from '@/shared/hooks/store';

interface Props {
	id: string;
	position: IPoint;
	handleTooltipOpen:(React.MouseEventHandler<HTMLDivElement> | undefined);
	handleTooltipClose:(React.MouseEventHandler<HTMLDivElement> | undefined);
};

export const SchemePoint: React.FC<Props> = ({ id, position, handleTooltipOpen,handleTooltipClose }) => {
	const { setNodeRef, isOver } = useDroppable({
		id,
		data: {
			id,
			type: 'point',
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
			className={pointClassName}
			style={{ left: `${position.x}px`, top: `${position.y}px` }}
			onMouseEnter={handleTooltipOpen}
			onMouseLeave={handleTooltipClose}
		></div>
	);
};
