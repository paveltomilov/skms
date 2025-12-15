import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/widgets/landing/Button';

interface CardProps {
	title: string;
	description: string;
	fulldescription?: string;
	button?: string;
	gap?: number | string;
	rating?: number;
}

const CardReviews: FC<CardProps> = ({
	title,
	description,
	fulldescription,
	rating = 0,
}) => {
	const [expanded, setExpanded] = useState(false);
	const textToShow = expanded ? fulldescription ?? description : description;

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
							text={expanded ? 'Свернуть' : 'Читать ещё'}
						/>
					)}
				</div>
			</div>
		</article>
	);
};

export default CardReviews;
