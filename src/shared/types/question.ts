export type QuestionType = 'radio' | 'checkbox';

export interface Question {
	id: number;
	title: string;
	type: QuestionType;
	options: string[];
	required?: boolean;
}
