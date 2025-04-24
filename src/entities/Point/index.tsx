import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
	id: string;
}

export const Point: FC<Props> = ( {id} ) => {
	return <div className={`${styles.point} ${styles[id]}`} id={id}></div>;
};
