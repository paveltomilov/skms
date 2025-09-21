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
	provodLeft?: boolean;
	provodTop?: boolean;
	provodRight?: boolean;
	provodBottom?: boolean;
}

const ScrewConnection: FC<Props> = ({
	className,
	isOpen = false,
	textRight,
	textTop,
	textLeft,
	provodLeft,
	provodTop,
	provodRight,
	provodBottom,
}) => {
	const [deg, setDeg] = useState<90 | 180 | 270 | 0>(0);
	const [open, setOpen] = useState<boolean>(isOpen);

	useEffect(() => {
		if (provodLeft) setDeg(90);
		if (provodTop) setDeg(180);
		if (provodRight) setDeg(270);
		if (provodBottom) setDeg(0);

		setOpen(isOpen);
	}, [provodLeft, provodTop, provodRight, provodBottom, isOpen]);

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
					[styles.provod__left]: provodLeft,
					[styles.provod__top]: provodTop,
					[styles.provod__right]: provodRight,
					[styles.provod__bottom]: provodBottom,
				})}
				isPin
				isBreak={false}
				length={open ? 1 : 22}
				rotate={deg}
				isDefault={false}
			/>
		</div>
	);
};

export default ScrewConnection;
