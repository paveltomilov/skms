import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Link from 'next/link';

interface Props {
	className?: string;
}

const Navigation: FC<Props> = ({ className }) => {
	const items = [
		{ href: '#about', label: 'Мы' },
		{ href: '#product', label: 'Продукт' },
		{ href: '#advantages', label: 'Преимущества' },
		{ href: '#reviews', label: 'Отзывы' },
	];

	return (
		<nav className={cn(styles.nav, className)}>
			<ul className={styles.nav__list}>
				{items.map(({ href, label }) => (
					<li key={href} className={styles.nav__item}>
						<Link href={href} className={styles.nav__link}>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
