'use client';
import { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface ImageProps {
	src: string;
	width: number;
	height: number;
}

interface ButtonProps {
	title?: string;
	href?: string;
	width: number;
	height: number;
	text?: string;
	image?: ImageProps;
	icon?: ReactNode;
	disabled?: boolean;
	active?: boolean;
	success?: boolean;
	className?: string;
	ariaLabel?: string;
	style?: CSSProperties;
	onClick?: () => void;
	onMouseDown?: () => void;
	onMouseUp?: () => void;
}

const Button = ({
	title,
	href,
	width,
	height,
	text,
	image,
	icon,
	disabled = false,
	active = false,
	success = false,
	className,
	ariaLabel,
	style,
	onClick,
	onMouseDown,
	onMouseUp,
}: ButtonProps) => {
	return href ? (
		<Link
			href={href}
			onClick={onClick}
			className={`${styles.button} ${className && className}
			${active && styles.active}
			${success && styles.success}`}
			style={{
				width: `${width}px`,
				height: `${height}px`,
				...style,
			}}
			aria-label={ariaLabel}
		>
			{image && (
				<Image
					src={image.src}
					alt="btn image"
					width={image.width}
					height={image.height}
				/>
			)}
			{icon && icon}
			{text && <span className={styles.button_text}>{text}</span>}
		</Link>
	) : (
		<button
			title={title}
			className={`${styles.button} ${className && className}
			${active && styles.active}
			${success && styles.success}`}
			style={{
				width: `${width}px`,
				height: `${height}px`,
				...style,
			}}
			disabled={disabled}
			aria-label={ariaLabel}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			{image && (
				<Image
					src={image.src}
					alt="btn image"
					width={image.width}
					height={image.height}
				/>
			)}
			{icon && icon}
			{text && <span className={styles.button_text}>{text}</span>}
		</button>
	);
};

export default Button;
