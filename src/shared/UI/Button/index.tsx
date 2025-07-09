'use client';
import { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
/* import { useAppSelector } from '@/shared/hooks/store'; */

interface ImageProps {
	src: string;
	width: number;
	height: number;
}

interface ButtonProps {
	href?: string;
	id: string;
	width: number;
	height: number;
	text?: ReactNode;
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
	href,
	id,
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
	// уточнить необходимость сохранять состояние кнопок в редакс, если что удалить
	/* const isActive = useAppSelector(
		state => state.buttonsReducer.activeButtons[id] || false,
	); */

	return href ? (
		<Link
			href={href}
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
					alt={id}
					width={image.width}
					height={image.height}
				/>
			)}
			{icon && icon}
			{text && <span className={styles.button_text}>{text}</span>}
		</Link>
	) : (
		<button
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
					alt={id}
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
