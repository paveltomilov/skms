'use client';
import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Link from 'next/link';

interface Props {
	className?: string;
	gap?: number | string;
}

const Navigation: FC<Props> = ({ className, gap }) => {
	const listStyle = gap
		? { '--gap': typeof gap === 'number' ? `${gap}px` : gap }
		: undefined;

	return (
		<nav className={cn(className, styles.nav)}>
			<ul className={styles.nav__list} style={listStyle}>
				<li className={styles.nav__item}>
					<Link href="#about" className={styles.nav__link}>
						Мы
					</Link>
				</li>
				<li className={styles.nav__item}>
					<Link href="#product" className={styles.nav__link}>
						Продукт
					</Link>
				</li>
				<li className={styles.nav__item}>
					<a href="#advantages" className={styles.nav__link}>
						Преимущества
					</a>
				</li>
				<li className={styles.nav__item}>
					<Link href="#reviews" className={styles.nav__link}>
						Отзывы
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
