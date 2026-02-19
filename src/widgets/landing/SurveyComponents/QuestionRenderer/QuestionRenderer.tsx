'use client';

import React, { useMemo, useCallback } from 'react';
import RadioQuest from '../RadioQuest';
import CheckQuest from '../CheckQuest';
import { QuestionRendererProps, Option } from '@/shared/types/question';

const QUESTION_TYPES = {
	CHOICE: 'choice',
	MULTI: 'multi',
} as const;

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
	question,
	answers,
	onRadioChange,
	onCheckboxChange,
}) => {
	const questionType = useMemo((): 'radio' | 'checkbox' => {
		const apiType = question.question_type;

		switch (apiType) {
			case QUESTION_TYPES.CHOICE:
				return 'radio';
			case QUESTION_TYPES.MULTI:
				return 'checkbox';
			default:
				return question.type || 'radio';
		}
	}, [question.question_type, question.type]);

	const optionsWithIds = useMemo((): Option[] => {
		if (question.choices?.length) {
			return question.choices.map(choice => ({
				id: choice.id,
				label: choice.value,
				isOther: choice.value === 'Другое' || choice.value === 'Other',
			}));
		}

		if (question.options?.length) {
			return question.options.map((option, index) => ({
				id: index + 1,
				label: option,
				isOther: option === 'Другое' || option === 'Other',
			}));
		}

		return [];
	}, [question.choices, question.options]);

	const currentRadioAnswer = useMemo((): string => {
		const answer = answers[question.id];
		if (answer && typeof answer === 'object' && 'value' in answer) {
			return typeof answer.value === 'string' ? answer.value : '';
		}
		return '';
	}, [answers, question.id]);

	const currentOtherText = useMemo((): string => {
		const answer = answers[question.id];
		return answer?.otherText || '';
	}, [answers, question.id]);

	const handleOtherTextChange = useCallback(
		(text: string) => {
			if (questionType === 'radio' && currentRadioAnswer) {
				onRadioChange(question.id, currentRadioAnswer, text);
			}
		},
		[question.id, questionType, currentRadioAnswer, onRadioChange],
	);

	const handleRadioSelect = useCallback(
		(value: string) => {
			onRadioChange(question.id, value, currentOtherText);
		},
		[question.id, onRadioChange, currentOtherText],
	);

	const handleCheckboxSelect = useCallback(
		(selectedIds: number[], otherText?: string) => {
			onCheckboxChange(question.id, selectedIds, otherText);
		},
		[question.id, onCheckboxChange],
	);

	switch (questionType) {
		case 'radio':
			return (
				<RadioQuest
					options={optionsWithIds}
					selected={currentRadioAnswer}
					otherText={currentOtherText}
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
					otherText={currentOtherText}
					onSelectionChange={handleCheckboxSelect}
				/>
			);

		default:
			return null;
	}
};

export default QuestionRenderer;
