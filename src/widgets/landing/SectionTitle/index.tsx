import React, { FC } from 'react';
import styles from './styles.module.scss';

const SectionTitle: FC<{
	title: string;
	width?: number | string;
	className?: string;
}> = ({ title, width, className }) => {
	const resolvedWidth =
		typeof width === 'number' ? `${width}px` : width ?? 'auto';

	return (
		<h2
			className={`${styles.title} ${className ?? ''}`.trim()}
			style={{ width: resolvedWidth }}
		>
			{title}
		</h2>
	);
};

export default SectionTitle;
