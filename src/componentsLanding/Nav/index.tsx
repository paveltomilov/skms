'use client';
import { FC } from 'react';
import styles from './styles.module.scss';

const Navigation: FC = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.nav__list}>
				<li className={styles.nav__item}>
					<a href="#about" className={styles.nav__link}>
						Мы
					</a>
				</li>
				<li className={styles.nav__item}>
					<a href="#product" className={styles.nav__link}>
						Продукт
					</a>
				</li>
				<li className={styles.nav__item}>
					<a href="#advantages" className={styles.nav__link}>
						Преимущества
					</a>
				</li>
				<li className={styles.nav__item}>
					<a href="#reviews" className={styles.nav__link}>
						Отзывы
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
