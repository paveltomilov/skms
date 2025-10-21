import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MarkerName } from '@/shared/types/markers';
import Screw from '../icons/Screw';
import Provod from '../Provod';
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
	const [deg, setDeg] = useState<90 | 180 | 270 | 0>(0);

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
				`${screwStatus}`,
			)}
		>
			<Screw
				className={styles.screw}
				status={screwStatus}
				textLeft={textLeft}
				textRight={textRight}
				textTop={textTop}
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
