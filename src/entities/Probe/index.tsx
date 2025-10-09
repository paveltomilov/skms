'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './styles.module.scss';
import ProbeIcon from '@/shared/UI/icons/Probe';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { ProbeColor } from '@/shared/types/multimeter';
import { SCHEME_POINTS } from '@/shared/configs/points';
import { detachProbe } from '@/store/multimeterSlice';

interface ProbeProps {
	color: ProbeColor;
}

type FixedPosition = { left: number; top: number } | null;

const PROBE_WIDTH = 17;
const PROBE_TIP_FROM_TOP = 14;

const getDropElementPosition = (
	dropId: string,
): { rect: DOMRect; offsetX: number; offsetY: number } | null => {
	const element = document.querySelector<HTMLElement>(
		`[data-drop-id="${dropId}"]`,
	);

	if (!element) return null;

	const rect = element.getBoundingClientRect();
	const offsetX = Number(element.dataset.probeOffsetX ?? 0);
	const offsetY = Number(element.dataset.probeOffsetY ?? 0);

	return { rect, offsetX, offsetY };
};

export const Probe: React.FC<ProbeProps> = ({ color }) => {
	const dispatch = useAppDispatch();
	const attachment = useAppSelector(
		state => state.multimeter.probeConnections[color],
	);

	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: color,
			data: {
				color,
				type: 'probe',
			},
		});

	const [fixedPosition, setFixedPosition] = useState<FixedPosition>(null);

	useEffect(() => {
		if (!attachment.dropId) {
			setFixedPosition(null);
			return;
		}

		let animationFrame = 0;
		let stopped = false;

		const updatePosition = () => {
			if (stopped) return;

			const data = getDropElementPosition(attachment.dropId!);

			if (!data) {
				setFixedPosition(null);
				dispatch(detachProbe(color));
				return;
			}

			const { rect, offsetX, offsetY } = data;

			setFixedPosition({
				left: rect.left + rect.width / 2 - PROBE_WIDTH / 2 + offsetX,
				top: rect.bottom - PROBE_TIP_FROM_TOP + offsetY,
			});

			animationFrame = window.requestAnimationFrame(updatePosition);
		};

		animationFrame = window.requestAnimationFrame(updatePosition);

		return () => {
			stopped = true;
			window.cancelAnimationFrame(animationFrame);
		};
	}, [attachment.dropId, color, dispatch]);

	const dragTransform = useMemo(() => {
		if (!transform) return undefined;
		return `${CSS.Translate.toString(transform)} rotate(0deg)`;
	}, [transform]);

	const style = useMemo<React.CSSProperties>(() => {
		const pointId = attachment.pointId as string | null;

		if (attachment.dropId) {
			return {
				position: 'fixed',
				left: fixedPosition?.left ?? -9999,
				top: fixedPosition?.top ?? -9999,
				transform: 'rotate(0deg)',
			};
		}

		if (pointId) {
			const coords = SCHEME_POINTS[pointId];
			return {
				left: `${coords.x + 12 - PROBE_WIDTH / 2}px`,
				top: `${coords.y + 40 - PROBE_TIP_FROM_TOP}px`, 
				transform: 'rotate(0deg)',
			};
		}

		return {
			transform: dragTransform ?? 'rotate(0deg)',
		};
	}, [attachment.pointId, attachment.dropId, fixedPosition, dragTransform]);


	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`${styles.probe} ${styles[color]} ${isDragging && styles.dragging
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
