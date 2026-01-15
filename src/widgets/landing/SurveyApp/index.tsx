'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TopCircle from '../IconSvg/topCircle';
import BottomCircle from '../IconSvg/bottomCircle';
import Button from '../Button';
import ConsentCheckbox from '../ConsentCheckbox';
import styles from './styles.module.scss';

const SurveyApp: React.FC = () => {
	const [consent, setConsent] = useState(false);

	return (
		<div className={`${styles.survey__container} container`}>
			<TopCircle className={styles.survey__svg1} />
			<Image
				className={styles.survey__img}
				src="/images/survey_img.png"
				alt="Картинка"
				width={512}
				height={223}
			/>
			<h2 className={styles.survey__title}>
				Помогите нам сделать обучение лучше
			</h2>
			<p className={styles.survey__description}>
				Вместе создадим сильный и удобный симулятор
			</p>
			<Button
				className={styles.survey__button}
				radius={4}
				width={515}
				height={48}
				text="Начать"
				href="/questions"
			/>
			<ConsentCheckbox value={consent} onChange={setConsent} />
			<BottomCircle className={styles.survey__svg2} />
		</div>
	);
};

export default SurveyApp;
