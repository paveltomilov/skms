import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { MarkerName } from '@/shared/types/markers';

interface Props {
	className?: string;
	text: MarkerName;
}

const Marker: FC<Props> = ({ className, text }) => {
	return <span className={cn(className, styles.marker)}>{text}</span>;
};

export default Marker;
