'use client';
import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import styles from './styles.module.scss';
import HeaderWindow from './HeaderWindow';
import Navigation from '../Nav';
import Logo from './Logo';
import Button from '../Button';
import Link from 'next/link';

const Header: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [phoneActive, setPhoneActive] = useState(false);

	/* ---------- 2. Обработчики ---------- */
	const toggleWindow = () => {
		setIsOpen(prev => !prev);
		setPhoneActive(prev => !prev); // переключаем активность
	};

	/* ---------- 3. Слушаем scroll ---------- */
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	/* ---------- 4. Классы header ---------- */
	const headerClass = `${styles.header} container ${
		scrolled ? styles.scrolled : ''
	}`;

	return (
		<header className={headerClass}>
			<div className={styles.header__container}>
				<div className={styles.header__container__logo}>
					<Logo />
				</div>

				<Navigation
					className={styles.header__container__nav}
					gap={16}
				/>

				<div className={styles.header__buttons}>
					<div>
						<Button
							className={styles.header__buttons__telephone}
							text={'+7 (8452) 39-86-36'}
							onClick={toggleWindow}
							width={199}
							radius={0}
							color={
								phoneActive
									? 'var(--lan-bright-cyan---lime-green)'
									: 'var(--lan-light-grayish-blue)'
							}
							icon={
								phoneActive ? (
									<svg
										className={
											styles.header__buttons__telephone__svg
										}
										width="12"
										height="8"
										viewBox="0 0 12 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11.3996 1.85486e-06L0.599332 9.1067e-07C0.489984 0.000306554 0.3828 0.0271611 0.289318 0.0776748C0.195835 0.128188 0.119593 0.200447 0.0687997 0.286673C0.018006 0.372901 -0.00541717 0.469831 0.00105351 0.56703C0.00752322 0.664229 0.0436408 0.758016 0.105518 0.838296L5.50567 7.78401C5.72948 8.07199 6.26829 8.07199 6.4927 7.78401L11.8929 0.838297C11.9554 0.758184 11.992 0.66435 11.9988 0.566989C12.0057 0.469628 11.9824 0.372465 11.9315 0.286055C11.8807 0.199646 11.8042 0.127294 11.7105 0.0768623C11.6167 0.0264311 11.5092 -0.000151677 11.3996 1.85486e-06Z"
											fill="#42E465"
										/>
									</svg>
								) : (
									<svg
										className={
											styles.header__buttons__telephone__svg
										}
										width="12"
										height="8"
										viewBox="0 0 12 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M0.600361 8H11.4007C11.51 7.99969 11.6172 7.97284 11.7107 7.92232C11.8042 7.87181 11.8804 7.79955 11.9312 7.71333C11.982 7.6271 12.0054 7.53017 11.9989 7.43297C11.9925 7.33577 11.9564 7.24198 11.8945 7.1617L6.49433 0.215985C6.27052 -0.071995 5.73171 -0.071995 5.5073 0.215985L0.107147 7.1617C0.0446404 7.24182 0.00798496 7.33565 0.00116339 7.43301C-0.00565818 7.53037 0.0176151 7.62754 0.0684546 7.71394C0.119294 7.80035 0.195755 7.87271 0.289531 7.92314C0.383307 7.97357 0.49081 8.00015 0.600361 8Z"
											fill="#F9FAFB"
										/>
									</svg>
								)
							}
						/>
						{isOpen && <HeaderWindow />}
					</div>
				</div>
				<Button
					href="/login"
					className={styles.header__buttons__login}
					text="Войти"
					width={85}
					height={40}
					radius={4}
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z"
								fill="#0A0A14"
							/>
						</svg>
					}
				/>
				<Button
					href="/login"
					className={styles.header__buttons__register}
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
