'use client';

import React, { FC } from 'react';
import styles from './styles.module.scss';

/**
 * SectionTitle – заголовок секции.
 *
 * @param title   Текст заголовка (обязательный).
 * @param width   Ширина заголовка в пикселях или процентах. Если не передано – ширина будет авто.
 * @param className Дополнительный CSS‑класс, который можно передать из родительского компонента.
 */
const SectionTitle: FC<{
	title: string;
	width?: number | string;
	/** Кастомный класс для заголовка. Принимается строкой. */
	className?: string;
}> = ({ title, width, className }) => {
	// Преобразуем число в строку с единицей измерения
	const resolvedWidth =
		typeof width === 'number' ? `${width}px` : width ?? 'auto';

	return (
		<h2
			/* объединяем стили из модуля и переданный класс */
			className={`${styles.title} ${className ?? ''}`.trim()}
			style={{ width: resolvedWidth }}
		>
			{title}
		</h2>
	);
};

export default SectionTitle;
