'use client';
import React, { useState } from 'react';
import type { FC } from 'react';
import styles from './styles.module.scss';
import HeaderWindow from './HeaderWindow';
import Navigation from '../Nav';
import Logo from './Logo';
import Button from '../Button';
import LoginIcon from '../IconsSvg/login';
import ArrowTopIcon from '../IconsSvg/arrowTop';
import ArrowBottomIcon from '../IconsSvg/arrowBottomIcon';
import Link from 'next/link';

const Header: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleWindow = () => {
		setIsOpen(prev => !prev);
	};

	const headerClass = `${styles.header} container`;

	return (
		<header className={headerClass}>
			<div className={styles.header__container}>
				<Logo />
				<Navigation className={styles.header__nav} />
				{isOpen && <HeaderWindow />}
				<Link className={styles.header__link} href="tel:+78452398636">
					+7 (8452) 39-86-36
				</Link>
				{isOpen ? (
					<ArrowBottomIcon
						className={styles.header__arrow}
						onClick={toggleWindow}
					/>
				) : (
					<ArrowTopIcon
						className={styles.header__arrow}
						onClick={toggleWindow}
					/>
				)}
				<Button
					href="/login"
					className={styles.header__login}
					text="Войти"
					width={85}
					height={40}
					radius={4}
					icon={<LoginIcon />}
				/>
				<Button
					href="/login"
					className={styles.header__register}
					text="Зарегистрироваться"
					width={172}
					height={40}
					radius={4}
				/>
			</div>
		</header>
	);
};

export default Header;
