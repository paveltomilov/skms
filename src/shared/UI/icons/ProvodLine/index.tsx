import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Pin from '../Pin';

interface Props {
	className?: string;
	length?: number;
	isPin: boolean;
	isDefault: boolean;
}

const ProvodLine: FC<Props> = ({
	className,
	length = 96,
	isPin,
	isDefault = true,
}) => {
	return (
		<div
			style={{ height: `${length}px` }}
			className={cn(styles.line, className, {
				[styles.line__absolute]: !isDefault,
			})}
		>
			{isPin && <Pin className={styles.pin} />}
		</div>
	);
};

export default ProvodLine;
