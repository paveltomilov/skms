'use client';
import React from 'react';
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
	text?: string;
	image?: ImageProps;
	disabled?: boolean;
	success?: boolean;
	onClick?: () => void;
	className?: string;
}

const Button = ({
	id,
	width,
	height,
	text,
	image,
	disabled = false,
	success = false,
	onClick,
	className,
}: ButtonProps) => {
	const isActive = useAppSelector(
		state => state.buttonsReducer.activeButtons[id] || false,
	);

	return (
		<button
			className={`${styles.button} 
			${className && className}
      ${isActive && styles.active}
      ${success && styles.success}`}
			style={{
				width: `${width}px`,
				height: `${height}px`,
			}}
			onClick={onClick}
			disabled={disabled}
		>
			{image && (
				<Image
					src={image.src}
					alt="Button icon"
					width={image.width}
					height={image.height}
				/>
			)}
			{text && <span className={styles.text}>{text}</span>}
		</button>
	);
};

export default Button;
