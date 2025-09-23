import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { MarkerName } from '@/shared/types/markers';

interface Props {
	className?: string;
	text: MarkerName;
	rotate?: number;
}

const Marker: FC<Props> = ({ className, text, rotate = 0 }) => {
	const style = rotate ? { transform: `rotate(${rotate}deg)` } : undefined;
	return <span className={cn(className, styles.marker)} style={style}>{text}</span>;
};

export default Marker;
