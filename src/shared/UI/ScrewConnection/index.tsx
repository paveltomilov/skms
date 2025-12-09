import { FC, useId, useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MarkerName } from '@/shared/types/markers';
import Screw from '../icons/Screw';
import Provod from '../Provod';
import { useDndContext, useDroppable } from '@dnd-kit/core';
export interface Props {
	screwStatus?: 'close' | 'open';
	pointId?: string;
	className?: string;
	textRight?: MarkerName;
	textTop?: MarkerName;
	textLeft?: MarkerName;
	provodLocation?: 'bottom' | 'left' | 'top' | 'right';
	onToggle: () => void;
}

const ScrewConnection: FC<Props> = ({
	screwStatus = 'close',
	pointId,
	className,
	textRight,
	textTop,
	textLeft,
	provodLocation,
	onToggle,
}) => {
	const generatedId = useId();
	const droppableId = useMemo(
		() => `${pointId ?? 'screw'}-${generatedId}`,
		[generatedId, pointId],
	);

	const { active } = useDndContext();
	const { setNodeRef, isOver } = useDroppable({
		id: droppableId,
		disabled: !pointId,
		data: pointId
			? {
					type: 'point',
					pointId,
					accepts: 'probe',
			  }
			: undefined,
	});

	const isProbeOver =
		isOver && active?.data?.current?.type === 'probe';

	const deg = useMemo<90 | 180 | 270 | 0>(() => {
		const rotationByLocation: Record<
			NonNullable<Props['provodLocation']>,
			90 | 180 | 270 | 0
		> = {
			left: 90,
			top: 180,
			right: 270,
			bottom: 0,
		};

		return rotationByLocation[provodLocation ?? 'bottom'];
	}, [provodLocation]);

	return (
		<div
			ref={setNodeRef}
			data-droppable-id={droppableId}
			data-point-id={pointId}
			data-probe-offset-x={1}
			data-probe-offset-y={-1}
			className={cn(
				className,
				styles.component,
				pointId,
				`${screwStatus}`,
			)}
		>
			<Screw
				className={styles.screw}
				status={screwStatus}
				textLeft={textLeft}
				textRight={textRight}
				textTop={textTop}
				isProbeOver={isProbeOver}
				onClick={onToggle}
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
				length={screwStatus === 'open' ? 1 : 22}
				rotate={deg}
			/>
		</div>
	);
};

export default ScrewConnection;
