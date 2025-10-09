import { FC, useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MarkerName } from '@/shared/types/markers';
import Screw from '../icons/Screw';
import Provod from '../Provod';

interface Props {
	pointId: string;
	dropId?: string;
	className?: string;
	isOpen?: boolean;
	textRight?: MarkerName;
	textTop?: MarkerName;
	textLeft?: MarkerName;
	provodLocation?: 'bottom' | 'left' | 'top' | 'right';
	probeOffsetX?: number;
	probeOffsetY?: number;
}

const ScrewConnection: FC<Props> = ({
	pointId,
	dropId,
	className,
	isOpen = false,
	textRight,
	textTop,
	textLeft,
	provodLocation,
	probeOffsetX = 0,
	probeOffsetY = 0,
}) => {
	const dropTargetId = dropId ?? pointId;

	const { setNodeRef, isOver } = useDroppable({
		id: dropTargetId,
		data: {
			type: 'point',
			accepts: ['probe'],
			pointId,
			dropId: dropTargetId,
		},
	});

	const [deg, setDeg] = useState<90 | 180 | 270 | 0>(0);
	const [open, setOpen] = useState<boolean>(isOpen);

	useEffect(() => {
		if (provodLocation === 'left') setDeg(90);
		if (provodLocation === 'top') setDeg(180);
		if (provodLocation === 'right') setDeg(270);
		if (provodLocation === 'bottom') setDeg(0);

		setOpen(isOpen);
	}, [provodLocation, isOpen]);

	return (
		<div
			ref={setNodeRef}
			data-drop-id={dropTargetId}
			data-probe-offset-x={probeOffsetX}
			data-probe-offset-y={probeOffsetY}
			className={cn(className, styles.component, pointId, {
				[styles.component_over]: isOver,
			})}
		>
			<Screw
				className={styles.screw}
				isOpen={open}
				textLeft={textLeft}
				textRight={textRight}
				textTop={textTop}
				onClick={setOpen}
			/>
			<Provod
				className={cn(styles.provod, {
					[styles.provod__left]: provodLocation === 'left',
					[styles.provod__top]: provodLocation === 'top',
					[styles.provod__right]: provodLocation === 'right',
					[styles.provod__bottom]: provodLocation === 'bottom',
				})}
				isPin
				isBreak={false}
				length={open ? 1 : 22}
				rotate={deg}
			/>
		</div>
	);
};

export default ScrewConnection;

