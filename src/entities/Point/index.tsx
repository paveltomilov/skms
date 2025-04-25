import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
	id: string;
}

export const SchemePoint: FC<Props> = ({ id }) => {
	return <div className={`${styles.schemePoint} ${styles[id]}`}></div>;
};
