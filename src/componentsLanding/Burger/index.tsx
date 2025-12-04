'use client';

import React from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';

interface BurgerProps {
	className?: string;
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
			className={`${styles.burger} ${className} ${
				isOpen ? styles['burger--active'] : ''
			}`}
			onClick={() => onToggle(!isOpen)}
			style={
				{
					width: size,
					height: size,
					'--burger-color': color,
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
