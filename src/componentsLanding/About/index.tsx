import React, { FC } from 'react';
import styles from './styles.module.scss';
import AboutBottom from './AboutBottom';
import AboutTop from './AboutTop';

const About: FC = () => {
	return (
		<section id="about" className={styles.about}>
			<section>
				<AboutTop />
			</section>
			<section>
				<AboutBottom />
			</section>
		</section>
	);
};

export default About;
