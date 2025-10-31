'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';

const Card: FC<{
	title: string;
	description: string;
	gap?: number | string;
}> = ({ title, description, gap }) => {
	const resolvedGap = typeof gap === 'number' ? `${gap}px` : gap ?? '1rem';

	return (
		<article className={styles.card}>
			<h3 className={styles.title}>{title}</h3>
			<p
				className={styles.description}
				style={{ marginTop: resolvedGap }}
			>
				{description}
			</p>
		</article>
	);
};

export default Card;
