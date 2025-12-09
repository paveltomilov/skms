'use client';

import React, { memo } from 'react';
import cn from 'classnames';
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

const SchemePointComponent: React.FC<Props> = ({
	id,
	position,
	offsetX = 0,
	offsetY = 0,
}) => {
	const isAnyModalOpen = useAppSelector(state =>
		Object.values(state.modal).some(Boolean),
	);

	const { setNodeRef, isOver } = useDroppable({
		id,
		data: {
			id,
			type: 'point',
			pointId: id,
			accepts: 'probe',
		},
		disabled: isAnyModalOpen,
	});

	const schemePoint = useAppSelector(state => state.points[id]);

	const pointClassName = cn(styles.point, {
		[styles.point_over]: isOver,
		[styles.point__active]: schemePoint,
		[styles.point__inactive]: !schemePoint,
	});

	return (
		<div
			ref={setNodeRef}
			id={id}
			data-droppable-id={id}
			data-probe-offset-x={offsetX}
			data-probe-offset-y={offsetY}
			className={pointClassName}
			style={{ left: `${position.x}px`, top: `${position.y}px` }}
		></div>
	);
};

export const SchemePoint = memo(SchemePointComponent);
