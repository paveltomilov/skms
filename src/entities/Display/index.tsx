import React, { FC } from 'react';
import styles from './styles.module.scss';

interface DisplayProps {
	value: string | number | null | undefined;
}

export const Display: FC<DisplayProps> = ({ value }) => {
	return (
		<div className={styles.display}>
			<span className={styles.display__value}>{value}</span>
		</div>
	);
};
