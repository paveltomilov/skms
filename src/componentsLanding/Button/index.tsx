// src/componentsLanding/Button/index.tsx
'use client';
import React from 'react';
import Link from 'next/link'; // ← импортируем Link
import styles from './styles.module.scss';

export type ButtonProps = {
	text: string;
	color?: string; // цвет текста
	bgColor?: string;
	hoverBgColor?: string;
	activeBgColor?: string;
	focusOutlineColor?: string;

	width?: number;
	height?: number;
	radius?: number;
	onClick?: () => void;

	/** Если передано, кнопка будет <a href={href}> */
	href?: string;

	/** Параметры границы. По умолчанию – без рамки. */
	border?: string; // пример: "1px solid #000"
};

const Button: React.FC<ButtonProps> = ({
	text,
	color,
	bgColor,
	hoverBgColor,
	activeBgColor,
	focusOutlineColor,
	width = 48,
	height = 48,
	radius,
	onClick,
	href,
	border, // <-- новый проп
}) => {
	const rootStyle: React.CSSProperties = {
		'--color': color,
		'--bg': bgColor,
		'--w': `${width}px`,
		'--h': `${height}px`,
		'--radius': `${radius ?? height / 2}px`,
		...(hoverBgColor && { '--bg-hover': hoverBgColor }),
		...(activeBgColor && { '--bg-active': activeBgColor }),
		...(focusOutlineColor && { '--focus-outline': focusOutlineColor }),
		...(border && { '--border': border }), // ← добавляем переменную
	} as React.CSSProperties;

	if (href) {
		return (
			<Link href={href} passHref legacyBehavior>
				<a className={styles.btn} style={rootStyle} onClick={onClick}>
					{text}
				</a>
			</Link>
		);
	}

	return (
		<button className={styles.btn} style={rootStyle} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
