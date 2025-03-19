'use client';
import { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';

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
	onClick?: () => void;
	className?: string;
	ariaLabel?: string;
	style?: CSSProperties;
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
	onClick,
	className,
	ariaLabel,
	style,
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
					onClick={onClick}
					disabled={disabled}
					aria-label={ariaLabel}
				>
			{image && (
				<Image
					src={image.src}
					alt="Button icon"
					width={image.width}
					height={image.height}
				/>
			)}
			{icon && <span className={styles.icon}>{icon}</span>}
			{text && <span className={styles.text}>{text}</span>}
		</button>
	);
};

export default Button;
