'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';

/**
 * Props:
 *  - `title`        – заголовок карточки (обязательный).
 *  - `description` – описание/текст внутри карточки (обязательный).
 *  - `gap`          – отступ между заголовком и описанием.
 *                     Принимает число → px, строку → любые CSS‑единицы
 *                     (rem, em, %, …). По умолчанию 1 rem.
 */
const Card: FC<{
	title: string;
	description: string;
	gap?: number | string; // отступ между элементами
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
