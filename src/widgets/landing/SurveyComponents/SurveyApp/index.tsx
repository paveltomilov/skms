'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyStart from '../SurveyStart';
import QuestionsList from '../QuestionsList';
import SurveyEnd from '../SurveyEnd';
import { Question } from '@/shared/types/question';

interface ServerQuestion {
	id: number;
	text: string;
	question_type: string;
	choices: Array<{
		id: number;
		value: string;
	}>;
}

interface AnswerStorage {
	question: number;
	answer_choices: number[];
	other_text?: string;
}

const SURVEY_ANSWERS_KEY = 'survey_answers';
const API_URL = process.env.NEXT_PUBLIC_API_SURVEYS_URL as string;

const SurveyApp: React.FC = () => {
	const [consent, setConsent] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [showEnd, setShowEnd] = useState(false);
	const [answers, setAnswers] = useState<Record<number, string | string[]>>(
		{},
	);
	const [otherTexts, setOtherTexts] = useState<Record<number, string>>({});
	const [selectedChoiceIds, setSelectedChoiceIds] = useState<
		Record<number, number | number[]>
	>({});

	const [questions, setQuestions] = useState<Question[]>([]);

	const totalQuestions = questions.length;

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get<ServerQuestion[]>(API_URL, {
					params: {
						question_group: 'lead',
					},
				});

				const formattedQuestions: Question[] = response.data
					.map((q: ServerQuestion) => {
						const options = q.choices.map(choice => choice.value);

						let questionType: 'radio' | 'checkbox';
						if (q.question_type === 'choice') {
							questionType = 'radio';
						} else if (q.question_type === 'multi') {
							questionType = 'checkbox';
						} else {
							questionType = 'radio';
						}

						return {
							id: q.id,
							title: q.text,
							type: questionType,
							question_type: q.question_type,
							options: options,
							choices: q.choices,
						};
					})
					.sort((a, b) => a.id - b.id);
				console.log('Formatted questions:', formattedQuestions);
				setQuestions(formattedQuestions);
			} catch (err) {
				console.error('Ошибка при загрузке вопросов:', err);
				setQuestions([]);
			}
		};

		fetchQuestions();
	}, []);

	useEffect(() => {
		const loadSavedAnswers = () => {
			try {
				const savedAnswers = localStorage.getItem(SURVEY_ANSWERS_KEY);

				if (savedAnswers) {
				}
			} catch (error) {
				console.error(
					'Ошибка при загрузке сохраненных ответов:',
					error,
				);
			}
		};

		loadSavedAnswers();
	}, []);

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
		const answersForStorage: AnswerStorage[] = questions
			.map(question => {
				const choiceIds = selectedChoiceIds[question.id];
				const otherText = otherTexts[question.id] || '';

				if (choiceIds !== undefined && choiceIds !== null) {
					const choicesArray = Array.isArray(choiceIds)
						? choiceIds
						: [choiceIds];

					const answer: AnswerStorage = {
						question: question.id,
						answer_choices: choicesArray,
					};

					if (otherText) {
						answer.other_text = otherText;
					}

					return answer;
				}

				return null;
			})
			.filter((answer): answer is AnswerStorage => answer !== null)
			.filter(
				answer => answer.answer_choices.length > 0 || answer.other_text,
			);

		try {
			const surveyData = {
				answers: answersForStorage,
				timestamp: new Date().toISOString(),
				totalQuestions: totalQuestions,
			};

			localStorage.setItem(
				SURVEY_ANSWERS_KEY,
				JSON.stringify(surveyData),
			);
			console.log('Ответы сохранены в localStorage:', surveyData);
		} catch (error) {
			console.error('Ошибка при сохранении в localStorage:', error);
		}

		setShowQuestions(false);
		setShowEnd(true);
	};

	const handleRadioChange = (questionId: number, selectedValue: string) => {
		const question = questions.find(q => q.id === questionId);

		if (!question || !question.choices) return;

		const selectedChoice = question.choices.find(
			choice => choice.value === selectedValue,
		);

		if (selectedChoice) {
			setSelectedChoiceIds(prev => ({
				...prev,
				[questionId]: selectedChoice.id,
			}));

			setAnswers(prev => ({ ...prev, [questionId]: selectedValue }));

			if (selectedValue === 'Другое') {
				setOtherTexts(prev => ({ ...prev, [questionId]: '' }));
			}
		}
	};

	const handleCheckboxChange = (
		questionId: number,
		selectedIds: number[],
		otherText?: string,
	) => {
		const question = questions.find(q => q.id === questionId);

		if (!question || !question.choices) {
			console.error('Вопрос не найден или нет choices');
			return;
		}

		setSelectedChoiceIds(prev => ({ ...prev, [questionId]: selectedIds }));

		const selectedValues = selectedIds
			.map(choiceId => {
				const choice = question.choices?.find(c => c.id === choiceId);
				if (!choice) return '';

				if (choice.value === 'Другое' && otherText) {
					return `Другое: ${otherText}`;
				}
				return choice.value;
			})
			.filter(Boolean);

		setAnswers(prev => ({ ...prev, [questionId]: selectedValues }));

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
					questions={questions}
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
