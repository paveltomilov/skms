// SurveyApp.tsx - упрощенная версия
'use client';

import React, { useState } from 'react';
import Question1 from '../Question1';
import Question2 from '../Question2';
import styles from './styles.module.scss';

const SurveyApp: React.FC = () => {
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [answers, setAnswers] = useState<Record<string, string | null>>({});

	const steps = [
		{
			id: 1,
			component: Question1,
			questions: { id: 'q1' },
		},
		{
			id: 2,
			component: Question2,
			questions: [
				{
					id: 'q2',
					title: 'Сколько лет вы работаете в IT?',
					required: true,
				},
			],
		},
		{
			id: 3,
			title: 'Формат работы',
			// component: SurveyQuestions3,
			questions: [
				{
					id: 'q3',
					title: 'Какой формат работы вам больше нравится?',
				},
			],
		},
		{
			id: 4,
			title: 'Размер команды',
			// component: SurveyQuestions4,
			questions: [
				{
					id: 'q4',
					title: 'В команде какого размера вам комфортнее работать?',
					required: false,
				},
			],
		},
	];

	const CurrentComponent = steps[currentStep].component;

	const handleAnswerChange = (
		questionId: string,
		answerId: string | null,
	) => {
		setAnswers(prev => ({ ...prev, [questionId]: answerId }));
	};

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(prev => prev + 1);
		// } else {
		// 	// Отправка опроса при последнем шаге
		// 	const surveyResults = steps.flatMap(step =>
		// 		step.questions.map(q => ({
		// 			question: q.title,
		// 			answer: answers[q.id] || 'Не отвечено',
		// 		})
		// 	),
		// 	);
		// 	console.log('Результаты:', surveyResults);
		// 	alert('Спасибо за опрос!');
		// }
	};

	const handlePrev = () => {
		if (currentStep > 0) {
			setCurrentStep(prev => prev - 1);
		}
	};

	return (
		<div className={styles.survey__container}>
			{/* Текущий шаг */}
			<CurrentComponent
				questions={steps[currentStep].questions}
				answers={answers}
				onAnswerChange={handleAnswerChange}
			/>

			{/* Кнопки навигации */}
			<div>
				{currentStep > 0 && <button onClick={handlePrev}>Назад</button>}

				<button onClick={handleNext}>
					{currentStep < steps.length - 1 ? 'Далее' : 'Завершить'}
				</button>
			</div>
		</div>
	);
};

export default SurveyApp;
