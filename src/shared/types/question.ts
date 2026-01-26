export interface Question {
	id: number;
	type: 'radio' | 'checkbox';
	title: string;
	options: string[];
}

export interface QuestionRendererProps {
	question: Question;
	answers: Record<number, string | string[]>;
	otherTexts: Record<number, string>;
	onRadioChange: (questionId: number, selectedValue: string) => void;
	onCheckboxChange: (
		questionId: number,
		selectedIds: number[],
		otherText?: string,
	) => void;
	setOtherTexts: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

export interface QuestionsListProps {
	currentIndex: number;
	onNext: () => void;
	onPrev: () => void;
	onFinish?: () => void;
	initialAnswers: Record<number, string | string[]>;
	initialOtherTexts: Record<number, string>;
	onRadioChange: (questionId: number, selectedValue: string) => void;
	onCheckboxChange: (
		questionId: number,
		selectedIds: number[],
		otherText?: string,
	) => void;
}

export type Option = {
	id: number;
	label: string;
};

export interface CheckQuestProps {
	options: Option[];
	maxSelections?: number;
	selectedIds?: number[];
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
	options?: Option[];
	selected?: string;
	otherText?: string;
	setSelected?: (value: string) => void;
	setOtherText?: (text: string) => void;
}
