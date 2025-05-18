'use client';
import { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useAppSelector } from '@/shared/hooks/store';

interface ImageProps {
	src: string;
	width: number;
	height: number;
}

interface ButtonProps {
	id: string;
	width: number;
	height: number;
	text?: ReactNode;
	image?: ImageProps;
	icon?: ReactNode;
	disabled?: boolean;
	success?: boolean;
	className?: string;
	ariaLabel?: string;
	style?: CSSProperties;
	onClick?: () => void;
	onMouseDown?: () => void;
	onMouseUp?: () => void;
}

const Button = ({
	id,
	width,
	height,
	text,
	image,
	icon,
	disabled = false,
	success = false,
	className,
	ariaLabel,
	style,
	onClick,
	onMouseDown,
	onMouseUp,
}: ButtonProps) => {
	const isActive = useAppSelector(
		state => state.buttonsReducer.activeButtons[id] || false,
	);

	return (
		<button
			className={`${styles.button} ${className && className}
				${isActive && !disabled && styles.active}
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
					alt="Button icon"
					width={image.width}
					height={image.height}
				/>
			)}
			{icon && icon}
			{text && <span className={styles.text}>{text}</span>}
		</button>
	);
};

export default Button;
