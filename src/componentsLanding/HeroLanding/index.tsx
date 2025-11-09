import React, { FC } from 'react';
import styles from './styles.module.scss'; // ваш SCSS‑файл
import HeroTitle from './HeroTitle';
import HeroDescr from './HeroDescr';
import { Inter } from 'next/font/google';

const inter = Inter({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
});

const HeroLanding: FC = () => {
	const titleLines: [string, string, string] = [
		'Skill ',
		'Management ',
		'System ',
	];

	return (
		<section id="hero" className={styles.hero}>
			<div className={`${styles.hero__container} container`}>
				<div className={`${styles.hero__title} ${inter.className}`}>
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
