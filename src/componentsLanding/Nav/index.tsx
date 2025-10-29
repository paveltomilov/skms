'use client';
import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

interface Props {
	className?: string;
	gap?: number | string; // optional, default handled in CSS
}

const Navigation: FC<Props> = ({ className, gap }) => {
	/* Передаём значение в переменную `--gap` через инлайн‑стиль */
	const listStyle = gap
		? { '--gap': typeof gap === 'number' ? `${gap}px` : gap }
		: undefined;

	return (
		<nav className={cn(className, styles.nav)}>
			<ul className={styles.nav__list} style={listStyle}>
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
