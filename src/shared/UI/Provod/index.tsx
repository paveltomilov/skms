import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import ProvodLine from '../icons/ProvodLine';
import BreakLine from '../icons/BreakLine';
import { MarkerName } from '@/shared/types/markers';
import Marker from '../Marker';

interface Props {
	className?: string;
	rotate?: 90 | 180 | 270 | 0;
	length?: number;
	isBreak?: boolean;
	marker?: MarkerName;
	isPin?: boolean;
	retreatMarker?: number;
}

const Provod: FC<Props> = ({
	className,
	rotate = 0,
	length,
	isBreak = true,
	marker,
	isPin = false,
	retreatMarker,
}) => {
	return (
		<div
			className={cn(styles.container, className)}
			style={{ transform: `rotate(${rotate}deg)` }}
		>
			<ProvodLine
				length={length}
				className={styles.provodLine}
				isPin={isPin}
			/>
			{isBreak && <BreakLine className={styles.breakLine} />}
			{marker && (
				<Marker
					className={styles.marker}
					bottomRetreat={retreatMarker}
					text={marker}
					rotate={rotate === 90 ? 270 : rotate === 270 ? 90 : rotate}
				/>
			)}
		</div>
	);
};

export default Provod;
