'use client';

import React, { useState } from 'react';
import SurveyStart from '../SurveyStart';
import { questionnaireConfig } from '@/shared/configs/questions';
import QuestionsList from '../QuestionsList';
// import styles from './styles.module.scss';

const SurveyApp: React.FC = () => {
	const [consent, setConsent] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);

	const questions = questionnaireConfig.questions;
	const totalQuestions = questions.length;

	const handleStart = () => {
		if (consent) {
			setShowQuestions(true);
		}
	};

	const handleNextQuestion = () => {
		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion(prev => prev + 1);
		}
	};

	const handlePrevQuestion = () => {
		if (currentQuestion === 0) {
			// Если это первый вопрос - возвращаемся к SurveyStart
			setShowQuestions(false);
		} else if (currentQuestion > 0) {
			setCurrentQuestion(prev => prev - 1);
		}
	};

	const handleFinishSurvey = () => {
		console.log('Опрос завершен!');
		// Можно добавить дополнительные действия
	};

	return (
		<>
			{showQuestions ? (
				<QuestionsList
					key={currentQuestion}
					currentIndex={currentQuestion}
					onNext={handleNextQuestion}
					onPrev={handlePrevQuestion}
					onFinish={handleFinishSurvey}
				/>
			) : (
				<SurveyStart
					onStart={handleStart}
					consent={consent}
					setConsent={setConsent}
				/>
			)}
		</>
	);
};

export default SurveyApp;
