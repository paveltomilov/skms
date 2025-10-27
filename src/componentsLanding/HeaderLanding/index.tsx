'use client';
import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';
import HeaderWindow from './HeaderWindow';
import Navigation from '../Nav';
import Logo from './Logo';
import Button from '../Button';

const Header: FC = () => {
	// const [hied, setHied] = useState(false);
	// const windowGet = () => {
	// 	setHied(!hied);
	// };

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
				<Navigation />
				<div>
					<div className={styles.header__bit}>
						<a href="">8981968545</a>
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
					text="Войти"
					color="var(--color-dark)"
					bgColor="var(--green-color)"
					hoverBgColor="" // можно задать цвет при наведении
					activeBgColor="var(--color-active)"
					focusOutlineColor="var(--color-focus)"
					width={80}
					height={40}
					radius={4}
					href="/login" // ← теперь кнопка становится ссылкой
				/>
				<Button
					text="Зарегистрироваться"
					color="var(--lan-very-dark-mostly-black-blue)"
					bgColor="var(--lan-bright-cyan---lime-green)" // основной цвет кнопки
					hoverBgColor="var(--lan-moderate-cyan)" // цвет при наведении
					activeBgColor="var(--lan-gray)" // цвет при нажатии
					focusOutlineColor="var(--lan-moderate-cyan)" // outline при фокусе
					width={172}
					height={40}
					radius={4}
				/>
			</div>
		</header>
	);
};

export default Header;
