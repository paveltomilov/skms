import React, { FC } from 'react';
import styles from './styles.module.scss';
import Button from '../Button';
import SectionTitle from '../SectionTitle';
import PlayIcon from '../IconsSvg/play';

const Product: FC = () => {
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
					<Button
						className={styles.product__button}
						text={''}
						width={72}
						height={72}
						icon={<PlayIcon className={styles.icon__play} />}
					/>
				</div>
			</div>
		</section>
	);
};

export default Product;
