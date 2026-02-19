'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SurveyStart from '../SurveyStart';
import QuestionsList from '../QuestionsList';
import SurveyEnd from '../SurveyEnd';
import {
	Question,
	ServerQuestion,
	AnswerStorage,
	QuestionAnswer,
} from '@/shared/types/question';

const SURVEY_ANSWERS_KEY = 'survey_answers';
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const SurveyApp: React.FC = () => {
	const [consent, setConsent] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [showEnd, setShowEnd] = useState(false);
	const [answers, setAnswers] = useState<Record<number, QuestionAnswer>>({});

	const [questions, setQuestions] = useState<Question[]>([]);

	const totalQuestions = questions.length;

	const getOtherTextsFromAnswers = useCallback((): Record<number, string> => {
		const otherTexts: Record<number, string> = {};
		Object.entries(answers).forEach(([questionId, answer]) => {
			if (answer.otherText) {
				otherTexts[Number(questionId)] = answer.otherText;
			}
		});
		return otherTexts;
	}, [answers]);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get<ServerQuestion[]>(
					`${API_URL}/surveys/questions/`,
					{
						params: {
							question_group: 'lead',
						},
					},
				);

				const typeMap: Record<string, 'radio' | 'checkbox'> = {
					choice: 'radio',
					multi: 'checkbox',
				};

				const formattedQuestions: Question[] = response.data
					.map((q: ServerQuestion) => {
						const options = q.choices.map(choice => choice.value);

						const questionType =
							typeMap[q.question_type] || 'radio';

						return {
							id: q.id,
							title: q.text,
							text: q.text,
							type: questionType,
							question_type: q.question_type,
							options: options,
							choices: q.choices,
						};
					})
					.sort((a, b) => a.id - b.id);
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
					setShowEnd(true);
					setShowQuestions(false);
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
				const response = answers[question.id];
				const { choiceIds, otherText = '' } = response;

				if (response !== undefined && response !== null) {
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
				totalQuestions: totalQuestions,
			};

			localStorage.setItem(
				SURVEY_ANSWERS_KEY,
				JSON.stringify(surveyData),
			);
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
			setAnswers(prev => ({
				...prev,
				[questionId]: {
					selectedId: selectedChoice.id,
					value: selectedValue,
					choiceIds: selectedChoice.id,
					...(selectedValue === 'Другое' && { otherText: '' }),
				},
			}));
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

		const selectedValues = selectedIds
			.map(choiceId => {
				const choice = question.choices?.find(c => c.id === choiceId);
				if (!choice) return '';
				return choice.value;
			})
			.filter(Boolean);

		setAnswers(prev => ({
			...prev,
			[questionId]: {
				selectedId: selectedIds.length > 0 ? selectedIds[0] : 0,
				value: selectedValues,
				choiceIds: selectedIds,
				...(otherText !== undefined && { otherText }),
			},
		}));
	};

	return (
		<>
			{showEnd ? (
				<SurveyEnd onStart={handleStart} />
			) : showQuestions ? (
				<QuestionsList
					questions={questions}
					currentIndex={currentQuestion}
					onNext={handleNextQuestion}
					onPrev={handlePrevQuestion}
					onFinish={handleFinishSurvey}
					initialOtherTexts={getOtherTextsFromAnswers()}
					initialAnswers={answers}
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
