// SurveyApp.tsx - упрощенная версия
'use client';

import React, { useState } from 'react';

import styles from './styles.module.scss';
import TopCircle from '../IconSvg/topCircle';
import BottomCircle from '../IconSvg/bottomCircle';

const SurveyApp: React.FC = () => {
	return (
		<div className={styles.survey__container}>
			<TopCircle className={styles.svg1} />
			<BottomCircle className={styles.svg2} />
		</div>
	);
};

export default SurveyApp;
