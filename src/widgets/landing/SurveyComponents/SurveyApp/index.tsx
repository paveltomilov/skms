'use client';

import React, { useState } from 'react';
import SurveyStart from '../SurveyStart';
import QuestionsList from '../QuestionsList';
// import styles from './styles.module.scss';

const SurveyApp: React.FC = () => {
	const [consent, setConsent] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);

	const handleStart = () => {
		if (consent) {
			setShowQuestions(true);
		}
	};

	const handleNextQuestion = () => {
		setCurrentQuestion(prev => (prev + 1) % 10);
	};

	const handlePrevQuestion = () => {
		setCurrentQuestion(prev => (prev - 1) % 10);
	};

	return (
		<>
			{showQuestions ? (
				<QuestionsList
					key={currentQuestion}
					currentIndex={currentQuestion}
					onNext={handleNextQuestion}
					onPrev={handlePrevQuestion}
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
