import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
	id: string;
	className: string;
}

export const Point: FC<Props> = ({ id, className }) => {
	return <div className={`${styles.point} ${className}`} id={id}></div>;
};
