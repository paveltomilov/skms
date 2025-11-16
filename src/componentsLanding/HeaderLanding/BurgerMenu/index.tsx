'use client';
import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

interface MobileMenuProps {
	isOpen: boolean;
}

const items = [
	{ href: '#about', label: 'Мы' },
	{ href: '#product', label: 'Продукт' },
	{ href: '#advantages', label: 'Преимущества' },
	{ href: '#reviews', label: 'Отзывы' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => (
	<nav className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
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

export default MobileMenu;
