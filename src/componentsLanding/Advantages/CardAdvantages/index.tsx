'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';

const Card: FC<{
	title: string;
	description: string;
	breakTitle?: boolean;
	gap?: number | string;
}> = ({ title, description, gap, breakTitle }) => {
	const resolvedGap = typeof gap === 'number' ? `${gap}px` : gap ?? '1rem';

	const [firstWord, ...restParts] = title.split(' ');
	const restText = restParts.join(' ');

	return (
		<div className={styles.card}>
			<h3 style={{ marginBottom: resolvedGap }} className={styles.title}>
				<span>{firstWord}</span>
				{restText && (
					<span className={breakTitle ? styles.break : ''}>
						{' '}
						{restText}
					</span>
				)}
			</h3>
			<p className={styles.description}>{description}</p>
		</div>
	);
};

export default Card;
