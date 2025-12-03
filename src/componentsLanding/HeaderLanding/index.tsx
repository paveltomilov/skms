'use client';
import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import HeaderWindow from './HeaderWindow';
import Navigation from '../Nav';
import Logo from './Logo';
import Button from '../Button';
import LoginIcon from '../IconSvg/login';
import ArrowTopIcon from '../IconSvg/arrowTop';
import ArrowBottomIcon from '../IconSvg/arrowBottomIcon';
import Link from 'next/link';
import Burger from '../Burger';
import styles from './styles.module.scss';
import MobileMenu from './BurgerMenu';

const Header: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				isMenuOpen &&
				!(e.target as HTMLElement).closest(`.${styles.header}`)
			) {
				setIsMenuOpen(false);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (isMenuOpen && e.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isMenuOpen]);

	//Обработчик прокрутки
	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const toggleWindow = () => {
		setIsOpen(prev => !prev);
	};

	const headerClass = `${styles.header} container ${
		scrolled ? styles.headerScrolled : ''
	}`;

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
					href="/login?mode=login"
					className={styles.header__login}
					text="Войти"
					width={85}
					height={40}
					radius={4}
					icon={<LoginIcon />}
				/>

				<Button
					href="/login?mode=signup"
					className={styles.header__register}
					text="Зарегистрироваться"
					width={172}
					height={40}
					radius={4}
				/>
				<Burger
					className={styles.header__burger}
					isOpen={isMenuOpen}
					onToggle={() => setIsMenuOpen(prev => !prev)}
					color="#fff"
					size={40}
				/>
			</div>
			<MobileMenu isOpen={isMenuOpen} />
		</header>
	);
};

export default Header;
