export interface FormValues {
	name: string;
	company: string;
	email: string;
	phone: string;
}

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
