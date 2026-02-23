import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

export type ButtonProps = {
	text: string;
	color?: string;
	bgColor?: string;
	hoverBgColor?: string;
	focusBgColor?: string;
	activeBgColor?: string;
	icon?: React.ReactNode;
	focusOutlineColor?: string;
	width?: number;
	height?: number;
	radius?: number;
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit';
	href?: string;
	border?: string;
};

const Button: React.FC<ButtonProps> = ({
	text,
	color,
	bgColor,
	hoverBgColor,
	focusBgColor,
	activeBgColor,
	focusOutlineColor,
	width = 48,
	height = 48,
	radius,
	icon,
	onClick,
	href,

	className,
	border,
}) => {
	const rootStyle: React.CSSProperties = {
		'--color': color,
		'--bg': bgColor,
		'--w': `${width}px`,
		'--h': `${height}px`,
		'--radius': `${radius ?? height / 2}px`,
		...(hoverBgColor && { '--bg-hover': hoverBgColor }),
		...(focusBgColor && { '--bg-focus': focusBgColor }),
		...(activeBgColor && { '--bg-active': activeBgColor }),
		...(focusOutlineColor && { '--focus-outline': focusOutlineColor }),
		...(border && { '--border': border }),
	} as React.CSSProperties;

	const content = (
		<>
			<span>{text}</span>
			{icon && <span className={styles.icon}>{icon}</span>}
		</>
	);

	const mergedClassName = [styles.btn, className].filter(Boolean).join(' ');

	if (href) {
		return (
			<Link href={href} passHref legacyBehavior>
				<a
					className={mergedClassName}
					style={rootStyle}
					onClick={onClick}
				>
					{content}
				</a>
			</Link>
		);
	}

	return (
		<button className={mergedClassName} style={rootStyle} onClick={onClick}>
			{content}
		</button>
	);
};

export default Button;
