'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './styles.module.scss';
import { IPoint } from '@/shared/types/scheme';

interface Props {
	id: string;
	position: IPoint;
}

export const SchemePoint: React.FC<Props> = ({ id, position }) => {
	const { setNodeRef, isOver } = useDroppable({
		id,
		data: {
			id,
			type: 'point',
			accepts: 'probe',
		},
	});

	const pointClassName = `${styles.schemePoint} ${isOver && styles.over}`;

	return (
		<div
			ref={setNodeRef}
			id={id}
			className={pointClassName}
			style={{ left: `${position.x}px`, top: `${position.y}px` }}
		></div>
	);
};
