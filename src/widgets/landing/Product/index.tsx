'use client';

import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../SectionTitle';

const Product: FC = () => {
	const embedUrl =
		'https://rutube.ru/play/embed/8b8728155adfc2bc77dfcc6392fbd19f';

	return (
		<section id="product" className={styles.product}>
			<div className={`${styles.product__container} container`}>
				<div className={styles.product__content}>
					<SectionTitle
						className={styles.product__title}
						title="Просто&nbsp;начать Легко&nbsp;использовать Эффективно&nbsp;применять"
					/>
					<p className={styles.product__description}>
						Реальная практика в действии. Загляните внутрь тренажера
						и оцените процесс своими глазами
					</p>
				</div>
				<div className={styles.product__media}>
					<div className={styles.product__videoFrame}>
						<iframe
							className={styles.product__video}
							src={embedUrl}
							title="Видео о тренажере"
							allow="autoplay; fullscreen; picture-in-picture"
							allowFullScreen
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Product;
