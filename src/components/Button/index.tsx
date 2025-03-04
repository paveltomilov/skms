"use client";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
// import { buttonClicked } from '@/store/buttonsSlice';
import {
  // useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

interface ImageProps {
	src: string;
	width: number;
	height: number;
}

interface ButtonProps {
	id: string; // Добавляем обязательный идентификатор
	width: number;
	height: number;
	text?: string;
	image?: ImageProps;
	disabled?: boolean;
	success?: boolean;
	onClick?: () => void;
	style?: React.CSSProperties;
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
	style,
}: ButtonProps) => {
	// const dispatch = useAppDispatch();
	const isActive = useAppSelector(
		state => state.buttonsReducer.activeButtons[id] || false,
	);

	const handleClick = () => {
		if (!disabled) {
			onClick?.();
			// dispatch(buttonClicked(id));
		}
	};

	return (
		<button
			className={`${styles.button} 
      ${isActive && styles.active}
      ${success && styles.success}`}
			style={{
				width: `${width}px`,
				height: `${height}px`,
				...style,
			}}
			onClick={handleClick}
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
