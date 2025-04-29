'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './Probe.module.scss';
import ProbeIcon from '@/shared/UI/icons/Probe';

import { ProbeColor } from '@/shared/types/simulator';
import { DndItemType } from '@/shared/configs/simulator.constants';

interface ProbeProps {
	color: ProbeColor;
}

export const Probe: React.FC<ProbeProps> = ({ color }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: color,
		data: {
			type: DndItemType.PROBE,
			probeColor: color,
		},
	});

	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`${styles.probe} ${styles[color]}`}
			{...listeners}
			{...attributes}
			suppressHydrationWarning={true}
		>
			<ProbeIcon color={color} />
		</div>
	);
};

export default Probe;
