'use client';

import React from 'react';
import { FC } from 'react';
import styles from './styles.module.scss'; // <-- импортируем как модуль

interface BurgerProps {
	className?: string; // можно опустить, но оставим для кастомных классов
	isOpen: boolean;
	onToggle: (isOpen: boolean) => void;
	color?: string;
	size?: number;
}

const Burger: FC<BurgerProps> = ({
	className = '',
	isOpen,
	onToggle,
	color = '#fff',
	size = 30,
}) => {
	return (
		<button
			// комбинируем модульный класс, наш класс и состояние открытости
			className={`${styles.burger} ${className} ${
				isOpen ? styles['burger--active'] : ''
			}`}
			onClick={() => onToggle(!isOpen)}
			style={
				{
					width: size,
					height: size,
					'--burger-color': color, // CSS‑переменная
				} as React.CSSProperties
			}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};

export default Burger;
