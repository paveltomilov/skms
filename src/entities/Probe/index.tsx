'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './Probe.module.scss'; 
import ProbeIcon from '@/shared/UI/icons/Probe'; 

import { ProbeColor } from '@/shared/types/simulator'; 
import { DndItemType } from '@/shared/configs/simulator.constants';

interface ProbeProps {
	id: string;
	color: ProbeColor;
	style?: React.CSSProperties;
}

export const Probe: React.FC<ProbeProps> = ({ id, color, style }) => {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id,
		data: {
			type: DndItemType.PROBE,
			probeColor: color,
		},
	});

	const combinedStyle: React.CSSProperties = {
		...style,
		touchAction: 'none',
	};

	return (
		<div
			ref={setNodeRef}
			id={id}
			className={styles.probeContainer}
			style={combinedStyle}
			{...listeners}
			{...attributes}
			suppressHydrationWarning={true}
		>
			<ProbeIcon color={color} className={styles.probeSvg} />
		</div>
	);
};

export default Probe;