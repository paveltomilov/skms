import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MarkerName } from '@/shared/types/markers';
import Screw from '../icons/Screw';
import Provod from '../Provod';

interface Props {
	className?: string;
	isOpen?: boolean;
	textRight?: MarkerName;
	textTop?: MarkerName;
	textLeft?: MarkerName;
	provodLocation?: 'bottom' | 'left' | 'top' | 'right';
}

const ScrewConnection: FC<Props> = ({
	className,
	isOpen = false,
	textRight,
	textTop,
	textLeft,
	provodLocation,
}) => {
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
		<div className={cn(className, styles.component)}>
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
