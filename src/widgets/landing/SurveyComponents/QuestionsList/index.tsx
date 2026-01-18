'use client';

import React from 'react';
import Button from '../../Button'; // Импортируем вашу кнопку
import Question1 from '../Question1';
import Question2 from '../Question2';
import styles from './styles.module.scss';
import Back from '../back';
import Next from '../next';
import Question3 from '../Question3';

export interface QuestionsListProps {
	currentIndex: number;
	onNext: () => void;
	onPrev: () => void;
	onFinish?: () => void;
}

const questions = [
	<Question1 key="q1" />,
	<Question2 key="q2" />,
	<Question3 key="q3" />,
	// ... другие вопросы
];

const QuestionsList: React.FC<QuestionsListProps> = ({
	currentIndex,
	onNext,
	onPrev,
	onFinish,
}) => {
	const isLastQuestion = currentIndex === questions.length - 1;
	const isFirstQuestion = currentIndex === -1;

	return (
		<div className={styles.questions__container}>
			<div className={styles.question__wrapper}>
				{questions[currentIndex]}
			</div>
			<div className={styles.bottom}>
				<div className={styles.counter}>
					Шаг: {currentIndex + 1}/{questions.length}
				</div>
				{/* Навигационные кнопки */}
				<div className={styles.navigation}>
					{!isFirstQuestion && (
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
					)}

					{isLastQuestion ? (
						<Button
							text="Завершить"
							onClick={onFinish || onNext}
							width={116}
							height={46}
							radius={4}
						/>
					) : (
						<Button
							icon={<Next />}
							text=""
							onClick={onNext}
							width={116}
							height={46}
							radius={4}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuestionsList;
