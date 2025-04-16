import React, { FC } from 'react';
import styles from './Display.module.scss';

interface DisplayProps {
	value: string | number | null | undefined;
}

export const Display: FC<DisplayProps> = ({ value }) => {
	return (
		<div
			className={styles.display}
			title={`Показание дисплея: ${value ?? ''}`}
		>
			<span className={styles.display__value}>{value}</span>
		</div>
	);
};
