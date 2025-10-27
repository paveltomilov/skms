'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';

const Product: FC = () => {
	return (
		<section id="product" className={styles.product}>
			<div className={`${styles.product__container} container`}>
				<div className={styles.product__content}>
					<div className={styles.product__content__title}>
						<p>
							Просто начать <br />
							Легко использовать <br />
							Эффективно применять
						</p>
					</div>
					<div className={styles.product__content__description}>
						<p>
							Реальная практика в действии. Загляните внутрь
							тренажера и оцените процесс своими глазами
						</p>
					</div>
				</div>
				<div className={styles.product__media}>
					<div className={styles.product__media__button}>
						<button>
							<img src="/assets/svg/play.svg" alt="" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Product;
