import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface Props {
	className?: string;
	length?: number;
}

const ProvodLine: FC<Props> = ({ className, length = 96 }) => {
	return (
		<span
			style={{ height: `${length}px` }}
			className={cn(styles.line, className)}
		></span>
	);
};

export default ProvodLine;
