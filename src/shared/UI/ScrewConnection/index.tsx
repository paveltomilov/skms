import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MarkerName } from '@/shared/types/markers';
import Screw from '../icons/Screw';
import Provod from '../Provod';
import { useAppDispatch } from '@/shared/hooks/store';
import { togglePointState } from '@/store/pointsSlice';
import useGetStateScrew from '@/shared/hooks/useGetStateScrew';

interface Props {
	pointId: string;
	className?: string;
	textRight?: MarkerName;
	textTop?: MarkerName;
	textLeft?: MarkerName;
	provodLocation?: 'bottom' | 'left' | 'top' | 'right';
}

const ScrewConnection: FC<Props> = ({
	pointId,
	className,
	textRight,
	textTop,
	textLeft,
	provodLocation,
}) => {
	const dispatch = useAppDispatch();
	const [deg, setDeg] = useState<90 | 180 | 270 | 0>(0);
	const screwState: boolean = useGetStateScrew(pointId);

	useEffect(() => {
		if (provodLocation === 'left') setDeg(90);
		if (provodLocation === 'top') setDeg(180);
		if (provodLocation === 'right') setDeg(270);
		if (provodLocation === 'bottom') setDeg(0);
	}, [provodLocation]);

	return (
		<div
			className={cn(
				className,
				styles.component,
				pointId,
				`${screwState}`,
			)}
		>
			<Screw
				className={styles.screw}
				isClose={screwState}
				textLeft={textLeft}
				textRight={textRight}
				textTop={textTop}
				onClick={() => dispatch(togglePointState(pointId))}
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
				length={!screwState ? 1 : 22}
				rotate={deg}
			/>
		</div>
	);
};

export default ScrewConnection;
