'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Button from '../../Button';
import Back from '../../IconSvg/back';
import Next from '../../IconSvg/next';
import QuestionRenderer from '../QuestionRenderer/QuestionRenderer';
import { QuestionsListProps, QuestionAnswer } from '@/shared/types/question';
import styles from './styles.module.scss';

type Answers = Record<number, QuestionAnswer>;

const QuestionsList: React.FC<QuestionsListProps> = ({
	questions,
	currentIndex,
	onNext,
	onPrev,
	onFinish,
	initialAnswers,
	initialOtherTexts,
	onRadioChange,
	onCheckboxChange,
}) => {
	const isLastQuestion = currentIndex === questions.length - 1;
	const currentQuestion = questions[currentIndex];

	const [answers, setAnswers] = useState<Answers>(initialAnswers);
	const [otherTexts, setOtherTexts] = useState(initialOtherTexts);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		setAnswers(initialAnswers);
		setOtherTexts(initialOtherTexts);
	}, [initialAnswers, initialOtherTexts]);

	const isCurrentAnswerValid = useMemo(() => {
		if (!currentQuestion) return false;

		const answer = answers[currentQuestion.id];
		if (!answer) return false;

		if (currentQuestion.type === 'radio') {
			const radioAnswer =
				typeof answer === 'string' ? answer : String(answer);
			if (radioAnswer.trim() === '') return false;
			if (radioAnswer === 'Другое') {
				const otherText = otherTexts[currentQuestion.id];
				return !!(otherText && otherText.trim());
			}
			return true;
		}

		if (currentQuestion.type === 'checkbox') {
			const checkboxAnswers = Array.isArray(answer)
				? answer
				: answer.value && Array.isArray(answer.value)
					? answer.value
					: [];
			if (checkboxAnswers.length === 0) return false;

			const hasOther = checkboxAnswers.some(
				a => a === 'Другое' || a.startsWith('Другое: '),
			);

			if (hasOther) {
				const otherText = otherTexts[currentQuestion.id];
				return !!(otherText && otherText.trim());
			}
			return true;
		}

		return false;
	}, [answers, otherTexts, currentQuestion]);

	const handleRadioChange = useCallback(
		(questionId: number, selectedValue: string) => {
			// Находим вопрос и выбранный вариант
			const question = questions.find(q => q.id === questionId);
			if (!question || !question.choices) return;

			const selectedChoice = question.choices.find(
				choice => choice.value === selectedValue,
			);

			if (selectedChoice) {
				// Создаем полный объект QuestionAnswer
				const answer: QuestionAnswer = {
					selectedId: selectedChoice.id,
					value: selectedValue,
					choiceIds: selectedChoice.id,
					...(selectedValue === 'Другое' && { otherText: '' }),
				};

				// Обновляем состояние с полным объектом
				setAnswers(prev => ({
					...prev,
					[questionId]: answer,
				}));

				// Вызываем родительский обработчик
				onRadioChange(questionId, selectedValue);
				setShowError(false);
			}
		},
		[onRadioChange, questions], // Добавлена зависимость questions
	);

	const handleCheckboxChange = useCallback(
		(questionId: number, selectedIds: number[], otherText?: string) => {
			const question = questions.find(q => q.id === questionId);

			if (!question || !question.choices) return;

			// Получаем значения для выбранных ID
			const selectedValues: string[] = [];

			selectedIds.forEach(id => {
				const choice = question.choices?.find(c => c.id === id);
				if (choice) {
					if (choice.value === 'Другое' && otherText) {
						selectedValues.push(`Другое: ${otherText}`);
					} else {
						selectedValues.push(choice.value);
					}
				}
			});

			// Создаем объект QuestionAnswer
			const answer: QuestionAnswer = {
				selectedId: selectedIds.length > 0 ? selectedIds[0] : 0, // Для чекбоксов можно использовать первый ID или сделать поле опциональным
				value: selectedValues,
				choiceIds: selectedIds,
			};

			// Добавляем otherText если есть
			if (otherText !== undefined) {
				answer.otherText = otherText;
				setOtherTexts(prev => ({ ...prev, [questionId]: otherText }));
			} else {
				// Очищаем otherText если его нет
				setOtherTexts(prev => {
					const newState = { ...prev };
					delete newState[questionId];
					return newState;
				});
			}

			// Обновляем answers с полным объектом
			setAnswers(prev => ({
				...prev,
				[questionId]: answer,
			}));

			onCheckboxChange(questionId, selectedIds, otherText);
			setShowError(false);
		},
		[onCheckboxChange, questions],
	);

	const handleNextOrFinish = useCallback(() => {
		if (!isCurrentAnswerValid) {
			setShowError(true);
			return;
		}

		setShowError(false);

		if (isLastQuestion) {
			onFinish?.();
		} else {
			onNext();
		}
	}, [isCurrentAnswerValid, isLastQuestion, onFinish, onNext]);

	const handlePrev = useCallback(() => {
		setShowError(false);
		onPrev();
	}, [onPrev]);

	return (
		<div className={styles.questions__container}>
			<div className={styles.header__container}>
				<h2 className={styles.header__title}>
					{currentQuestion?.title}
				</h2>
			</div>

			<div className={styles.question__wrapper}>
				<QuestionRenderer
					key={currentQuestion.id}
					question={currentQuestion}
					answers={answers}
					otherTexts={otherTexts}
					onRadioChange={handleRadioChange}
					onCheckboxChange={handleCheckboxChange}
					setOtherTexts={setOtherTexts}
				/>
			</div>

			<div className={styles.footer}>
				<div className={styles.footer__counter}>
					Шаг: {currentIndex + 1}/{questions.length}
				</div>

				<div className={styles.footer__navigation}>
					{showError && (
						<div className={styles.footer__navigation_explanation}>
							Вы не выбрали ответ — можно вернуться позже
						</div>
					)}

					<Button
						className={styles.footer__button_back}
						icon={<Back />}
						text=""
						onClick={handlePrev}
						radius={4}
						border="1px solid var(--lan-grey)"
						type="button"
					/>

					<Button
						className={styles.footer__button_next}
						icon={<Next />}
						text={''}
						onClick={handleNextOrFinish}
						width={118}
						height={48}
						radius={4}
						type="button"
					/>
				</div>
			</div>
		</div>
	);
};

export default QuestionsList;
