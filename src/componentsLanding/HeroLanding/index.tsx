/* ──────────────────────────────────────────────── */
/* 1️⃣ HeroLanding.tsx                                 */
/* ──────────────────────────────────────────────── */
'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss'; // ваш SCSS‑файл

/* Подключаем два «детского» компонента */
import HeroTitle from './HeroTitle';
import HeroDescr from './HeroDescr';

/**
 * Внутри HeroLanding можно задать любые данные,
 * которые потом передадим в дочерние компоненты.
 *
 * Если понадобится гибкость – добавьте пропы к HeroLanding
 * и просто пересылайте их дальше.
 */
const HeroLanding: FC = () => {
	/* Данные для заголовка (3 строки) */
	const titleLines: [string, string, string] = [
		'Skill ',
		'Management ',
		'System ',
	];

	return (
		<section id="hero" className={styles.hero}>
			<div className={`${styles.hero__container} container`}>
				<div className={styles.hero__title}>
					<HeroTitle titleLines={titleLines} />
				</div>
				<div className={styles.hero__content}>
					<HeroDescr />
				</div>
			</div>
		</section>
	);
};

export default HeroLanding;
