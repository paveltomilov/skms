import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/componentsLanding/Button';

interface CardProps {
	title: string;
	description: string; // краткое описание
	fulldescription?: string; // полный текст (может отсутствовать)
	button?: string; // надпись на кнопке
	gap?: number | string; // отступ между элементами
	rating?: number; // сколько звёзд активных (0‑5)
}

const CardReviews: FC<CardProps> = ({
	title,
	description,
	fulldescription,
	rating = 0, // по умолчанию нет активных звезд
}) => {
	const [expanded, setExpanded] = useState(false);
	const textToShow = expanded ? fulldescription ?? description : description;

	/* ---------- Рендер звёзд ----------------- */
	const stars = Array.from({ length: 5 }, (_, i) => (
		<div
			key={i}
			className={`${styles.rating__star} ${
				i < rating ? styles.is__active : ''
			}`}
		/>
	));

	return (
		<article className={styles.card}>
			<div className={styles.card__rating}>{stars}</div>
			<h3 className={styles.title}>{title}</h3>
			<div
				className={`${styles.content} ${expanded ? styles.column : ''}`}
			>
				<div className={styles.content__descr}>
					<p className={styles.description}>{textToShow}</p>
				</div>
				<div
					className={`${styles.content__button} ${
						expanded ? styles.column : ''
					}`}
				>
					{fulldescription && fulldescription !== description && (
						<Button
							className={styles.card__button}
							onClick={() => setExpanded(prev => !prev)}
							width={expanded ? 62 : 96}
							height={24}
							text={expanded ? 'Скрыть' : 'Читать еще'}
						/>
					)}
				</div>
			</div>
		</article>
	);
};

export default CardReviews;
