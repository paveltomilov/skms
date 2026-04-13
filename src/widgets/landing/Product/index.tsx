'use client';

import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import { LANDING_EXTERNAL_URLS } from '@/shared/configs/landingExternalUrls';

const Product: FC = () => {
	const embedUrl = LANDING_EXTERNAL_URLS.rutubeProductVideoEmbed;

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
