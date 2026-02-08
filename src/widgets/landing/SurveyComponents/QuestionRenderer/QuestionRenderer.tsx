'use client';

import React, { useMemo } from 'react';
import RadioQuest from '../RadioQuest';
import { QuestionRendererProps } from '@/shared/types/question';
import CheckQuest from '../CheckQuest';

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
	question,
	answers,
	otherTexts,
	onRadioChange,
	onCheckboxChange,
	setOtherTexts,
}) => {
	const questionType = useMemo(() => {
		const apiType = question.question_type;

		switch (apiType) {
			case 'choice':
				return 'radio';
			case 'multi':
				return 'checkbox';

			default:
				return question.type || 'radio';
		}
	}, [question.question_type, question.type]);

	const optionsWithIds = useMemo(() => {
		if (question.choices && question.choices.length > 0) {
			return question.choices.map(choice => ({
				id: choice.id,
				label: choice.value,
			}));
		}

		if (question.options && question.options.length > 0) {
			return question.options.map((option, index) => ({
				id: index + 1,
				label: option,
			}));
		}

		return [];
	}, [question.choices, question.options, questionType]);

	const getCheckboxSelectedIds = useMemo(() => {
		const answer = answers[question.id];

		if (!answer || !Array.isArray(answer)) {
			return [];
		}

		const currentAnswers = answer as string[];
		const selectedIds: number[] = [];

		if (question.choices && question.choices.length > 0) {
			question.choices.forEach(choice => {
				const isSelected = currentAnswers.some(answerText => {
					if (choice.value === 'Другое') {
						return (
							answerText === 'Другое' ||
							answerText.startsWith('Другое: ')
						);
					}
					return answerText === choice.value;
				});

				if (isSelected) {
					selectedIds.push(choice.id);
				}
			});
		} else if (question.options && question.options.length > 0) {
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
		}

		return selectedIds;
	}, [answers, question.id, question.choices, question.options]);

	const handleOtherTextChange = (text: string) => {
		setOtherTexts(prev => ({
			...prev,
			[question.id]: text,
		}));
	};

	const handleRadioSelect = (value: string) => {
		onRadioChange(question.id, value);
	};

	const handleCheckboxSelect = (
		selectedIds: number[],
		otherText?: string,
	) => {
		onCheckboxChange(question.id, selectedIds, otherText);
	};

	switch (questionType) {
		case 'radio':
			const answer = answers[question.id];
			const currentAnswer =
				(typeof answer === 'string' ? answer : '') || '';

			return (
				<RadioQuest
					key={`radio-${question.id}`}
					options={optionsWithIds}
					selected={currentAnswer}
					otherText={otherTexts[question.id] || ''}
					setSelected={handleRadioSelect}
					setOtherText={handleOtherTextChange}
				/>
			);

		case 'checkbox':
			return (
				<CheckQuest
					key={`checkbox-${question.id}`}
					options={optionsWithIds}
					maxSelections={question.maxSelections || 3}
					selectedIds={getCheckboxSelectedIds}
					otherText={otherTexts[question.id] || ''}
					onSelectionChange={handleCheckboxSelect}
					initialSelectedIds={getCheckboxSelectedIds}
					initialOtherText={otherTexts[question.id] || ''}
				/>
			);
	}
};

export default QuestionRenderer;
