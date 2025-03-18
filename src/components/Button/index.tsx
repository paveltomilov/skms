'use client';
import { ReactNode } from 'react';
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
	image?: ImageProps;
	disabled?: boolean;
	success?: boolean;
	onClick?: () => void;
	className?: string;
	children?: ReactNode;
	'aria-label'?: string;
}

const Button = ({
	id,
	width,
	height,
	image,
	disabled = false,
	success = false,
	onClick,
	className,
	children,
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
			}}
			onClick={onClick}
			disabled={disabled}
			aria-label={id}
		>
			{image && (
				<Image
					src={image.src}
					alt="Button icon"
					width={image.width}
					height={image.height}
				/>
			)}
			{children}
		</button>
	);
};

export default Button;
