'use client';

import React, { useState } from 'react';
import Button from '../../Button';
import { questionnaireConfig } from '@/shared/configs/questions';
import styles from './styles.module.scss';
import Back from '../../IconSvg/back';
import Next from '../../IconSvg/next';
import CheckQuest from '../CheckQuest';
import RadioQuest from '../RadioQuest';

export interface QuestionsListProps {
	currentIndex: number;
	onNext: () => void;
	onPrev: () => void;
	onFinish?: () => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
	currentIndex,
	onNext,
	onPrev,
	onFinish,
}) => {
	const questions = questionnaireConfig.questions;
	const isLastQuestion = currentIndex === questions.length - 1;

	const [answers, setAnswers] = useState<Record<number, string | string[]>>(
		{},
	);
	const [otherTexts, setOtherTexts] = useState<Record<number, string>>({});

	const currentQuestion = questions[currentIndex];

	const handleRadioChange = (questionId: number, selectedValue: string) => {
		setAnswers(prev => ({ ...prev, [questionId]: selectedValue }));
	};

	const handleCheckboxChange = (
		questionId: number,
		selectedIds: number[],
		otherText?: string,
	) => {
		const selectedOptions = selectedIds
			.map(id => {
				const question = questions.find(q => q.id === questionId);
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

	const handleNextOrFinish = () => {
		if (isLastQuestion) {
			const finalData = {
				answers,
				otherTexts,
				completedAt: new Date().toISOString(),
			};
			console.log('Финальные данные:', finalData);

			if (onFinish) onFinish();
		} else {
			onNext();
		}
	};

	const renderQuestion = () => {
		const question = currentQuestion;

		const optionsWithIds = question.options.map((option, index) => ({
			id: index + 1,
			label: option,
		}));

		if (question.type === 'radio') {
			return (
				<RadioQuest
					key={question.id}
					options={optionsWithIds}
					selected={(answers[question.id] as string) || ''}
					setSelected={(value: string) =>
						handleRadioChange(question.id, value)
					}
					otherText={otherTexts[question.id] || ''}
					setOtherText={(text: string) =>
						setOtherTexts(prev => ({
							...prev,
							[question.id]: text,
						}))
					}
				/>
			);
		} else if (question.type === 'checkbox') {
			const selectedIds: number[] = [];
			const currentAnswers = (answers[question.id] as string[]) || [];

			currentAnswers.forEach(answer => {
				const cleanAnswer = answer.replace('Другое: ', '');
				const index = question.options.findIndex(
					opt => opt === cleanAnswer || opt === 'Другое',
				);
				if (index !== -1) {
					selectedIds.push(index + 1);
				}
			});

			return (
				<CheckQuest
					key={question.id}
					options={optionsWithIds}
					maxSelections={3}
					allowOther={question.options.includes('Другое')}
					onSelectionChange={(selectedIds, otherText) =>
						handleCheckboxChange(
							question.id,
							selectedIds,
							otherText,
						)
					}
				/>
			);
		}

		return null;
	};

	return (
		<div className={styles.questions__container}>
			<header className={styles.header__container}>
				<h2 className={styles.header__title}>
					{currentQuestion.title}
				</h2>
			</header>
			<div className={styles.question__wrapper}>{renderQuestion()}</div>

			<div className={styles.bottom}>
				<div className={styles.counter}>
					Шаг: {currentIndex + 1}/{questions.length}
				</div>

				<div className={styles.navigation}>
					<Button
						className={styles.button__back}
						icon={<Back />}
						text=""
						onClick={onPrev}
						width={48}
						height={46}
						radius={4}
						border="1px solid var(--lan-grey)"
					/>

					<Button
						className={styles.button__next}
						icon={<Next />}
						text={''}
						onClick={handleNextOrFinish}
						width={116}
						height={46}
						radius={4}
					/>
				</div>
			</div>
		</div>
	);
};

export default QuestionsList;
