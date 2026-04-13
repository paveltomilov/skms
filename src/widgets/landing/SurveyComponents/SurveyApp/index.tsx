'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SurveyStart from '../SurveyStart';
import QuestionsList from '../QuestionsList';
import SurveyEnd from '../SurveyEnd';
import {
	Question,
	ServerQuestion,
	AnswerStorage,
	QuestionAnswer,
} from '@/shared/types/question';
import {
	getSurveyQuestions,
	LANDING_SURVEY_QUESTION_GROUP,
} from '@/shared/api/surveys/getSurveyQuestions';
import { SURVEY_ANSWERS_STORAGE_KEY } from '@/shared/configs/surveyStorageKey';
import styles from './SurveyApp.module.scss';

type QuestionsLoadState = 'loading' | 'success' | 'error';

type SurveyAppProps = {
	/** После успешной отправки ответов на сервер (экран «Спасибо» + email). */
	onSurveySubmitted?: () => void;
};

const SurveyApp: React.FC<SurveyAppProps> = ({ onSurveySubmitted }) => {
	const [consent, setConsent] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [showEnd, setShowEnd] = useState(false);
	const [answers, setAnswers] = useState<Record<number, QuestionAnswer>>({});
	const [rawQuestions, setRawQuestions] = useState<ServerQuestion[]>([]);
	const [questionsLoadState, setQuestionsLoadState] =
		useState<QuestionsLoadState>('loading');

	const questions = useMemo((): Question[] => {
		const typeMap: Record<string, 'radio' | 'checkbox'> = {
			choice: 'radio',
			multi: 'checkbox',
		};

		return rawQuestions
			.map((q: ServerQuestion) => {
				const options = q.choices.map(choice => choice.value);
				const questionType = typeMap[q.question_type] || 'radio';

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
	}, [rawQuestions]);

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

	const loadQuestionsFromApi = useCallback(async () => {
		setQuestionsLoadState('loading');
		try {
			const data = await getSurveyQuestions(LANDING_SURVEY_QUESTION_GROUP);
			setRawQuestions(data);
			setQuestionsLoadState('success');
		} catch {
			setQuestionsLoadState('error');
		}
	}, []);

	useEffect(() => {
		const init = async () => {
			try {
				const savedAnswers = localStorage.getItem(
					SURVEY_ANSWERS_STORAGE_KEY,
				);
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
			// Всегда запрашиваем вопросы (актуальные id для submit и видимость в Network).
			await loadQuestionsFromApi();
		};

		void init();
	}, [loadQuestionsFromApi]);

	const handleRestartSurvey = useCallback(() => {
		try {
			localStorage.removeItem(SURVEY_ANSWERS_STORAGE_KEY);
		} catch {
			// ignore
		}
		setShowEnd(false);
		setShowQuestions(false);
		setCurrentQuestion(0);
		setAnswers({});
		setConsent(false);
		void loadQuestionsFromApi();
	}, [loadQuestionsFromApi]);

	const handleStart = () => {
		if (consent && totalQuestions > 0) {
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
				if (!response) return null;

				const { choiceIds, otherText } = response;

				const choicesArray = Array.isArray(choiceIds)
					? choiceIds
					: [choiceIds];

				const answer: AnswerStorage = {
					question: question.id,
					answer_choices: choicesArray,
				};

				if (otherText && otherText.trim() !== '') {
					answer.other_text = otherText;
				}

				return answer;
			})
			.filter((answer): answer is AnswerStorage => answer !== null);

		try {
			const surveyData = {
				answers: answersForStorage,
				totalQuestions: totalQuestions,
			};

			localStorage.setItem(
				SURVEY_ANSWERS_STORAGE_KEY,
				JSON.stringify(surveyData),
			);
		} catch (error) {
			console.error('Ошибка при сохранении в localStorage:', error);
		}

		setShowQuestions(false);
		setShowEnd(true);
	};

	const handleRadioChange = useCallback(
		(questionId: number, selectedValue: string, otherText?: string) => {
			const question = questions.find(q => q.id === questionId);
			if (!question || !question.choices) return;

			const selectedChoice = question.choices.find(
				choice => choice.value === selectedValue,
			);

			if (selectedChoice) {
				setAnswers(prev => {
					const answer: QuestionAnswer = {
						selectedId: selectedChoice.id,
						value: selectedValue,
						choiceIds: selectedChoice.id,
					};

					if (otherText !== undefined) {
						answer.otherText = otherText;
					}

					return {
						...prev,
						[questionId]: answer,
					};
				});
			}
		},
		[questions],
	);

	const handleCheckboxChange = useCallback(
		(questionId: number, selectedIds: number[], otherText?: string) => {
			const question = questions.find(q => q.id === questionId);
			if (!question || !question.choices) return;

			setAnswers(prev => {
				const answer: QuestionAnswer = {
					selectedId: selectedIds.length > 0 ? selectedIds[0] : 0,
					value: selectedIds
						.map(
							id =>
								question.choices?.find(c => c.id === id)
									?.value || '',
						)
						.filter(Boolean),
					choiceIds: selectedIds,
				};

				if (otherText !== undefined) {
					answer.otherText = otherText;
				}

				return {
					...prev,
					[questionId]: answer,
				};
			});
		},
		[questions],
	);

	if (!showEnd && questionsLoadState === 'loading') {
		return (
			<p className={styles.state} role="status">
				Загрузка вопросов…
			</p>
		);
	}

	if (!showEnd && questionsLoadState === 'error') {
		return (
			<div className={styles.state}>
				<p>Не удалось загрузить вопросы опроса. Проверьте соединение.</p>
				<button
					type="button"
					className={styles.retry}
					onClick={() => {
						void loadQuestionsFromApi();
					}}
				>
					Повторить
				</button>
			</div>
		);
	}

	if (
		!showEnd &&
		questionsLoadState === 'success' &&
		totalQuestions === 0
	) {
		return (
			<p className={styles.state} role="status">
				Сейчас нет активных вопросов для этого опроса.
			</p>
		);
	}

	return (
		<>
			{showEnd ? (
				<SurveyEnd
					onStart={handleStart}
					onRestartSurvey={handleRestartSurvey}
					onSurveyAccepted={onSurveySubmitted}
				/>
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
