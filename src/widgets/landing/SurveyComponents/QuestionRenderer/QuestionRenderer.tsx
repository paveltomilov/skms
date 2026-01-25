'use client';

import React, { useMemo } from 'react';
import CheckQuest from '../CheckQuest';
import RadioQuest from '../RadioQuest';
import { QuestionRendererProps } from '@/shared/types/question';

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
	question,
	answers,
	otherTexts,
	onRadioChange,
	onCheckboxChange,
	setOtherTexts,
}) => {
	const optionsWithIds = useMemo(() => {
		return question.options.map((option, index) => ({
			id: index + 1,
			label: option,
		}));
	}, [question.options]);

	const getCheckboxSelectedIds = useMemo(() => {
		const answer = answers[question.id];

		if (!answer || !Array.isArray(answer)) {
			return [];
		}

		const currentAnswers = answer as string[];
		const selectedIds: number[] = [];

		question.options.forEach((option, index) => {
			const isSelected = currentAnswers.some(answerText => {
				if (option === 'Другое') {
					return (
						answerText === 'Другое' ||
						answerText.startsWith('Другое: ')
					);
				}
				return answerText === option;
			});

			if (isSelected) {
				selectedIds.push(index + 1);
			}
		});

		return selectedIds;
	}, [answers, question.id, question.options]);

	const handleOtherTextChange = (text: string) => {
		setOtherTexts(prev => ({
			...prev,
			[question.id]: text,
		}));
	};

	if (question.type === 'radio') {
		const answer = answers[question.id];
		const currentAnswer = (typeof answer === 'string' ? answer : '') || '';

		return (
			<RadioQuest
				key={question.id}
				options={optionsWithIds}
				selected={currentAnswer}
				setSelected={(value: string) =>
					onRadioChange(question.id, value)
				}
				otherText={otherTexts[question.id] || ''}
				setOtherText={handleOtherTextChange}
			/>
		);
	}

	if (question.type === 'checkbox') {
		return (
			<CheckQuest
				key={question.id}
				options={optionsWithIds}
				maxSelections={3}
				initialSelectedIds={getCheckboxSelectedIds}
				initialOtherText={otherTexts[question.id] || ''}
				onSelectionChange={(selectedIds, otherText) =>
					onCheckboxChange(question.id, selectedIds, otherText)
				}
			/>
		);
	}

	return null;
};

export default QuestionRenderer;
