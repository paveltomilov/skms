'use client';
import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';
import HeaderWindow from './HeaderWindow';
import Navigation from '../Nav';
import Logo from './Logo';
import Button from '../Button';

const Header: FC = () => {
	const [isOpen, setIsOpen] = useState(false); // окно с телефоном
	const [scrolled, setScrolled] = useState(false); // прокрутка >10px

	/* ----------   2. Обработчики   ---------- */
	const toggleWindow = () => setIsOpen(prev => !prev);

	/* ----------   3. Слушаем scroll   ---------- */
	useEffect(() => {
		const onScroll = () => {
			// если прокручено более 10px – меняем состояние
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', onScroll);

		/* Очистка при размонтировании */
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	/* ----------   4. Классы header   ---------- */
	const headerClass = `${styles.header} container ${
		scrolled ? styles.scrolled : ''
	}`;

	return (
		<header className={headerClass}>
			<div className={styles.header__container}>
				<Logo />
				<Navigation className={styles.header__nav} gap={16} />
				<div>
					<div className={styles.header__bit}>
						<a
							href="tel:+78452398636"
							className={styles.header__telephone}
						>
							+7 (845) 239-86-36
						</a>
						<button
							onClick={toggleWindow}
							className={styles.header__button}
						>
							<svg
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
						</button>
					</div>
					{isOpen && <HeaderWindow />}
				</div>
				<Button
					className={styles.button__login}
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
					href="/login" // ← теперь кнопка становится ссылкой
				/>
				<Button
					className={styles.button__register}
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
