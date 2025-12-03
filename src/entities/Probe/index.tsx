'use client';

import React, { useLayoutEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './styles.module.scss';
import ProbeIcon from '@/shared/UI/icons/Probe';
import { useAppSelector } from '@/shared/hooks/store';
import { ProbeColor } from '@/shared/types/multimeter';
import { SCHEME_POINTS } from '@/shared/configs/points';

interface ProbeProps {
	color: ProbeColor;
}

// Probe tip offset relative to the SVG bounding box
const PROBE_TIP_OFFSET_X = 9;
const PROBE_TIP_OFFSET_Y = 1;
const SCHEME_POINT_SIZE = 24;

export const Probe: React.FC<ProbeProps> = ({ color }) => {
	const connection = useAppSelector(
		state => state.multimeter.probeConnections[color],
	);
	const pointId = connection?.pointId ?? null;
	const dropId = connection?.dropId ?? null;

	const [posStyle, setPosStyle] = useState<Record<string, string> | null>(
		null,
	);

	const {
		attributes,
		listeners,
		setNodeRef: setDraggableRef,
		transform,
		isDragging,
	} = useDraggable({
		id: color,
		data: {
			color,
			type: 'probe',
		},
	});

	// Keep the probe tip aligned with the center of the droppable point
	useLayoutEffect(() => {
		if (!pointId) {
			setPosStyle(null);
			return;
		}

		let raf = 0;
		const updatePosition = () => {
			const droppableElement =
				dropId !== null
					? (document.querySelector(
							`[data-droppable-id="${dropId}"]`,
					  ) as HTMLElement | null)
					: null;

			if (droppableElement) {
				const rect = droppableElement.getBoundingClientRect();
				const extraOffsetX = Number(
					droppableElement.dataset.probeOffsetX ??
						droppableElement.getAttribute('data-probe-offset-x') ??
						0,
				);
				const extraOffsetY = Number(
					droppableElement.dataset.probeOffsetY ??
						droppableElement.getAttribute('data-probe-offset-y') ??
						0,
				);

				const centerX = rect.left + rect.width / 2 + extraOffsetX;
				const centerY = rect.top + rect.height / 2 + extraOffsetY;

				const nextStyle = {
					left: `${centerX - PROBE_TIP_OFFSET_X}px`,
					top: `${centerY - PROBE_TIP_OFFSET_Y}px`,
					position: 'fixed',
					zIndex: '20',
				} as const;

				setPosStyle(prev =>
					prev &&
					prev.left === nextStyle.left &&
					prev.top === nextStyle.top &&
					prev.position === nextStyle.position
						? prev
						: nextStyle,
				);
			} else {
				const schemePoint = SCHEME_POINTS[pointId as string];

				if (
					schemePoint &&
					schemePoint.x !== undefined &&
					schemePoint.y !== undefined
				) {
					const centerX =
						schemePoint.x + SCHEME_POINT_SIZE / 2;
					const centerY =
						schemePoint.y + SCHEME_POINT_SIZE / 2;

					const nextStyle = {
						left: `${centerX - PROBE_TIP_OFFSET_X}px`,
						top: `${centerY - PROBE_TIP_OFFSET_Y}px`,
						position: 'absolute',
						zIndex: '3',
					} as const;

					setPosStyle(prev =>
						prev &&
						prev.left === nextStyle.left &&
						prev.top === nextStyle.top &&
						prev.position === nextStyle.position
							? prev
							: nextStyle,
					);
				} else {
					setPosStyle(null);
				}
			}

			raf = requestAnimationFrame(updatePosition);
		};

		updatePosition();

		return () => {
			cancelAnimationFrame(raf);
		};
	}, [dropId, pointId]);

	const style = posStyle
		? posStyle
		: {
				transform: `${CSS.Translate.toString(
					transform,
				)} rotate(-15deg)`,
		  };

	return (
		<div
			ref={el => {
				setDraggableRef(el);
			}}
			style={style}
			className={`${styles.probe} ${styles[color]} ${
				isDragging && styles.dragging
			}`}
			{...listeners}
			{...attributes}
			suppressHydrationWarning={true}
		>
			<ProbeIcon color={color} />
		</div>
	);
};

export default Probe;
