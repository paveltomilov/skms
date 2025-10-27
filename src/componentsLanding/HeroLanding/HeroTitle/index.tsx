/* ──────────────────────────────────────────────── */
/* 2️⃣ HeroTitle.tsx                                 */
/* ──────────────────────────────────────────────── */
'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss'; // стили для заголовка
export interface HeroTitleProps {
	/** Три строки заголовка – массив из трёх элементов. */
	titleLines: [string, string, string];
}

const HeroTitle: FC<HeroTitleProps> = ({ titleLines }) => {
	const [topLine, centerLine, bottomLine] = titleLines;

	return (
		<h1 className={styles.title}>
			<span className={styles.lineLeft}>{topLine}</span>
			<span className={styles.lineCenter}>{centerLine}</span>
			<span className={styles.lineRight}>{bottomLine}</span>
		</h1>
	);
};

export default HeroTitle;
