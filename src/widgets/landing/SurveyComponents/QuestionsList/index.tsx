'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Button from '../../Button';
import Back from '../../IconSvg/back';
import Next from '../../IconSvg/next';
import QuestionRenderer from '../QuestionRenderer/QuestionRenderer';
import { QuestionsListProps } from '@/shared/types/question';
import styles from './styles.module.scss';

// Обновляем интерфейс, чтобы включить questions

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

	const [answers, setAnswers] = useState(initialAnswers);
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
			const checkboxAnswers = Array.isArray(answer) ? answer : [];
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
			setAnswers(prev => ({ ...prev, [questionId]: selectedValue }));
			onRadioChange(questionId, selectedValue);
			setShowError(false);
		},
		[onRadioChange],
	);

	const handleCheckboxChange = useCallback(
		(questionId: number, selectedIds: number[], otherText?: string) => {
			const question = questions.find(q => q.id === questionId);

			const selectedOptions: string[] = [];

			selectedIds.forEach(id => {
				if (question && question.options && question.options[id]) {
					if (question.options[id] === 'Другое' && otherText) {
						selectedOptions.push(`Другое: ${otherText}`);
					} else if (question.options[id]) {
						selectedOptions.push(question.options[id]);
					}
				}
			});

			setAnswers(prev => ({ ...prev, [questionId]: selectedOptions }));

			// Передаем в родительский компонент
			onCheckboxChange(questionId, selectedIds, otherText);
			setShowError(false);

			if (otherText !== undefined) {
				setOtherTexts(prev => ({ ...prev, [questionId]: otherText }));
			}
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
			<header className={styles.header__container}>
				<h2 className={styles.header__title}>
					{currentQuestion?.title || 'Вопрос не найден'}
				</h2>
			</header>

			<div className={styles.question__wrapper}>
				<QuestionRenderer
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
