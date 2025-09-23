import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Pin from '../Pin';

interface Props {
	className?: string;
	length?: number;
	isPin: boolean;
	rotate?: 90 | 180 | 270 | 0;
}

const ProvodLine: FC<Props> = ({
	className,
	length = 96,
	isPin,
	rotate = 0,
}) => {
	return (
		<div
			style={{ height: `${length}px`, transform: `rotate(${rotate}deg)` }}
			className={cn(styles.line, className, {
				[styles.line__absolute]: isPin,
			})}
		>
			{isPin && <Pin className={styles.pin} />}
		</div>
	);
};

export default ProvodLine;
