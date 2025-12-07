'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './styles.module.scss';
import { IPoint } from '@/shared/types/scheme';
import { useAppSelector } from '@/shared/hooks/store';
import { canProbeAttach } from '@/shared/lib/probeRules';
import { ProbeColor } from '@/shared/types/multimeter';

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
	const isAnyModalOpen = useAppSelector(state =>
		Object.values(state.modal).some(Boolean),
	);
	const activeProbe = useAppSelector(
		state => state.multimeter.activeProb,
	) as ProbeColor | null;

	const isDisabledByProbe =
		!!activeProbe && !canProbeAttach(activeProbe, id);
	const isDisabled = isAnyModalOpen || isDisabledByProbe;

	const { setNodeRef, isOver } = useDroppable({
		id,
		data: {
			id,
			type: 'point',
			pointId: id,
			accepts: 'probe',
		},
		disabled: isDisabled,
	});

	// для визуализации состояния точек
	const schemePoint = useAppSelector(state => state.points[id]);

	const pointClassName = `${styles.point} ${isOver && styles.point_over} ${
		isDisabled && styles.point__disabled
	} ${schemePoint ? styles.point__active : styles.point__inactive}`;

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
