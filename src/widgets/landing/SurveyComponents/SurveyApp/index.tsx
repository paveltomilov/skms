'use client';

import React, { useState } from 'react';
import SurveyStart from '../SurveyStart';
import { questionnaireConfig } from '@/shared/configs/questions';
import QuestionsList from '../QuestionsList';
import SurveyEnd from '../SurveyEnd';

const SurveyApp: React.FC = () => {
	const [consent, setConsent] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [showEnd, setShowEnd] = useState(false);
	const [answers, setAnswers] = useState<Record<number, string | string[]>>(
		{},
	);
	const [otherTexts, setOtherTexts] = useState<Record<number, string>>({});

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
			setShowQuestions(false);
		} else if (currentQuestion > 0) {
			setCurrentQuestion(prev => prev - 1);
		}
	};

	const handleFinishSurvey = () => {
		setShowQuestions(false);
		setShowEnd(true);
	};

	const updateAnswers = (questionId: number, answer: string | string[]) => {
		setAnswers(prev => ({ ...prev, [questionId]: answer }));
	};

	const handleRadioChange = (questionId: number, selectedValue: string) => {
		updateAnswers(questionId, selectedValue);
	};

	const handleCheckboxChange = (
		questionId: number,
		selectedIds: number[],
		otherText?: string,
	) => {
		const question = questions.find(q => q.id === questionId);

		const selectedOptions = selectedIds
			.map(id => {
				if (question && question.options[id - 1]) {
					if (question.options[id - 1] === 'Другое' && otherText) {
						return `Другое: ${otherText}`;
					}
					return question.options[id - 1];
				}
				return '';
			})
			.filter(Boolean);

		setAnswers(prev => ({ ...prev, [questionId]: selectedOptions }));

		if (otherText !== undefined) {
			setOtherTexts(prev => ({ ...prev, [questionId]: otherText }));
		}
	};

	return (
		<>
			{showEnd ? (
				<SurveyEnd onStart={handleStart} />
			) : showQuestions ? (
				<QuestionsList
					key={`question-${currentQuestion}`}
					currentIndex={currentQuestion}
					onNext={handleNextQuestion}
					onPrev={handlePrevQuestion}
					onFinish={handleFinishSurvey}
					initialAnswers={answers}
					initialOtherTexts={otherTexts}
					onRadioChange={handleRadioChange}
					onCheckboxChange={handleCheckboxChange}
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
