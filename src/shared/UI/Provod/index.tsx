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
	isPin?: boolean;
	marker?: MarkerName;
	isDefault?: boolean;
}

const Provod: FC<Props> = ({
	className,
	rotate = 0,
	length,
	isBreak = true,
	isPin = false,
	marker,
	isDefault = true,
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
				isDefault={isDefault}
			/>
			{isBreak && <BreakLine className={styles.breakLine} />}
			{marker && (
				<Marker
					className={styles.marker}
					text={marker}
					rotate={rotate == 90 ? 270 : 180}
				/>
			)}
		</div>
	);
};

export default Provod;
