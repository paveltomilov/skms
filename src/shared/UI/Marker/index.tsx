import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { MarkerName } from '@/shared/types/markers';

interface Props {
	className?: string;
	text: MarkerName;
	rotate?: number;
	bottomRetreat?: number;
}

const Marker: FC<Props> = ({
	className,
	text,
	rotate = 0,
	bottomRetreat = 40,
}) => {
	return (
		<span
			className={cn(className, styles.marker)}
			style={{
				transform: `rotate(${rotate}deg)`,
				bottom: `${bottomRetreat}px`,
			}}
			aria-label={`Маркер ${text}`}
		>
			{text}
		</span>
	);
};

export default Marker;
