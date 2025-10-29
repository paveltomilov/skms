// src/components/IconLink.tsx
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './styles.module.scss';

export interface IconLinkProps {
	href: string;
	/** Путь к изображению из /public/... или импорт через SVGR */
	iconSrc: string | StaticImageData;
	width?: number; // default 16
	height?: number; // default 16
	label?: string;
	className?: string;
	targetBlank?: boolean;
}

export const IconLink: React.FC<IconLinkProps> = ({
	href,
	iconSrc,
	width = 16,
	height = 16,
	label,
	className,
	targetBlank = true,
}) => {
	return (
		<a
			href={href}
			className={`${styles.link} ${className ?? ''}`}
			target={targetBlank ? '_blank' : undefined}
			rel="noopener noreferrer"
		>
			<span className={styles.icon}>
				<Image
					src={iconSrc as never}
					alt=""
					width={width}
					height={height}
				/>
			</span>
			{label && <span>{label}</span>}
		</a>
	);
};

export default IconLink;
