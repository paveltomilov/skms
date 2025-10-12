import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MarkerName } from '@/shared/types/markers';
import Screw from '../icons/Screw';
import Provod from '../Provod';

interface Props {
	screwStatus?: 'close' | 'open';
	pointId: string;
	className?: string;
	textRight?: MarkerName;
	textTop?: MarkerName;
	textLeft?: MarkerName;
	provodLocation?: 'bottom' | 'left' | 'top' | 'right';
	changeGlobalState?: () => void;
}

const ScrewConnection: FC<Props> = ({
	screwStatus = 'close',
	pointId,
	className,
	textRight,
	textTop,
	textLeft,
	provodLocation,
	changeGlobalState,
}) => {
	const [stateScrew, setStateScrew] = useState<'close' | 'open'>(screwStatus);
	const [deg, setDeg] = useState<90 | 180 | 270 | 0>(0);

	function handleScrewClick() {
		setStateScrew(() => (stateScrew === 'open' ? 'close' : 'open'));

		if (changeGlobalState) {
			changeGlobalState();
		}
	}

	useEffect(() => {
		if (provodLocation === 'left') setDeg(90);
		if (provodLocation === 'top') setDeg(180);
		if (provodLocation === 'right') setDeg(270);
		if (provodLocation === 'bottom') setDeg(0);
		setStateScrew(screwStatus);
	}, [provodLocation, screwStatus]);

	return (
		<div
			className={cn(
				className,
				styles.component,
				pointId,
				`${stateScrew}`,
			)}
		>
			<Screw
				className={styles.screw}
				status={stateScrew}
				textLeft={textLeft}
				textRight={textRight}
				textTop={textTop}
				onClick={handleScrewClick}
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
				length={stateScrew === 'open' ? 1 : 22}
				rotate={deg}
			/>
		</div>
	);
};

export default ScrewConnection;
