import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { MarkerName } from '@/shared/types/markers';

interface Props {
	className?: string;
	text: MarkerName;
	rotate?: number;
}

const Marker: FC<Props> = ({ className, text, rotate }) => {
	return (
		<span
			className={cn(className, styles.marker)}
			style={{ transform: `rotate(${rotate}deg)` }}
		>
			{text}
		</span>
	);
};

export default Marker;
