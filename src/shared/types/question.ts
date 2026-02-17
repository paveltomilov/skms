export interface Question {
	question_type: 'choice' | 'multi' | string;
	id: number;
	title: string;
	text?: string;
	type: 'radio' | 'checkbox';
	options: string[];
	choices?: Choice[];
	maxSelections?: number;
	description?: string;
}

export interface QuestionRendererProps {
	question: Question;
	answers: Record<number, QuestionAnswer>;
	otherTexts: OtherTexts;
	onRadioChange: (questionId: number, selectedValue: string) => void;
	onCheckboxChange: (
		questionId: number,
		selectedIds: number[],
		otherText?: string,
	) => void;
	setOtherTexts: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

export interface QuestionsListProps {
	questions: Question[];
	currentIndex: number;
	onNext: () => void;
	onPrev: () => void;
	onFinish?: () => void;
	initialAnswers: Record<number, QuestionAnswer>;
	initialOtherTexts: Record<number, string>;
	onRadioChange: (questionId: number, selectedValue: string) => void;
	onCheckboxChange: (
		questionId: number,
		selectedIds: number[],
		otherText?: string,
	) => void;
	showError?: boolean;
	onShowErrorChange?: (questionId: number, show: boolean) => void;
}

export type Option = {
	id: number;
	label: string;
};

export interface CheckQuestProps {
	options: OptionWithId[];
	maxSelections?: number;
	otherText?: string;
	onSelectionChange: (selectedIds: number[], otherText?: string) => void;
	initialSelectedIds?: number[];
	initialOtherText?: string;
}

export interface ConfirmDialogProps {
	className: string;
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export interface RadioQuestProps {
	options?: OptionWithId[];
	selected?: string;
	otherText?: string;
	setSelected?: (value: string) => void;
	setOtherText?: (text: string) => void;
	otherOptionLabel: string;
}

export interface Choice {
	id: number;
	value: string;
}

export type AnswerValue = string | string[] | null;

export interface Answers {
	[questionId: number]: AnswerValue;
}

export interface OtherTexts {
	[questionId: number]: string;
}

export interface OptionWithId {
	id: number;
	label: string;
}

export interface ServerQuestion {
	id: number;
	text: string;
	question_type: string;
	choices: Array<{
		id: number;
		value: string;
	}>;
}

export interface AnswerStorage {
	question: number;
	answer_choices: number[];
	other_text?: string;
}

export interface QuestionAnswer {
	value: string | string[];
	choiceIds: number | number[];
	otherText?: string;
	selectedId: number;
}
