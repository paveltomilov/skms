'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './styles.module.scss';
import {
	DndItemType,
	ACCEPTABLE_NODE_TYPES,
} from '@/shared/configs/simulator.constants';

interface SchemePointProps {
	id: string;
}

export const SchemePoint: React.FC<SchemePointProps> = ({ id }) => {
	const { setNodeRef, isOver } = useDroppable({
		id: id,
		data: {
			type: DndItemType.NODE,
			nodeId: id,
			accepts: ACCEPTABLE_NODE_TYPES,
		},
	});

	const pointClassName = `${styles.schemePoint} ${styles[id]} ${
		isOver && styles.over
	}`;
	/* const htmlId = `scheme-point-${id}`; */

	return (
		<div
			ref={setNodeRef} // ref для dnd-kit
			/* id={htmlId}  */ // id для HTML
			className={pointClassName} // классы CSS
		></div>
	);
};
