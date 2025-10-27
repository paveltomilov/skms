'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import AboutBottom from './AboutBottom';
import AboutTop from './AboutTop';

const About: FC = () => {
	return (
		<section id="about" className={styles.about}>
			<AboutTop />
			<AboutBottom />
		</section>
	);
};

export default About;
