'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './styles.module.scss';
import ProbeIcon from '@/shared/UI/icons/Probe';
import { useAppSelector } from '@/shared/hooks/store';
import { SCHEME_POINTS } from '@/shared/configs/scheme';
import { ProbeColor } from '@/shared/types/multimeter';

interface ProbeProps {
	color: ProbeColor;
}

export const Probe: React.FC<ProbeProps> = ({ color }) => {
	const point = useAppSelector(
		state => state.multimeter.probeConnections[color],
	);

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: color,
		data: {
			color,
			type: 'probe',
		},
	});

	const style = point
		? {
				left: `${SCHEME_POINTS[point].x + 2}px`,
				top: `${SCHEME_POINTS[point].y + 11}px`,
		  }
		: {
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
