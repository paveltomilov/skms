import { AxiosError } from 'axios';
import { getApiInstanceWithoutCredentials } from '@/shared/lib/api';

export type SurveySubmissionAnswer = {
	question: number;
	answer_text?: string;
	answer_choices?: number[];
	other_text?: string;
};

export type SurveySubmissionPayload = {
	lead_email: string;
	answers: SurveySubmissionAnswer[];
};

export type SurveySubmissionSuccessResponse = {
	status: 'success';
	submission_id: number;
};

/**
 * Отправка ответов лендингового опроса (публичный endpoint, без cookies).
 */
export async function postSurveySubmission(
	payload: SurveySubmissionPayload,
): Promise<SurveySubmissionSuccessResponse> {
	const api = getApiInstanceWithoutCredentials();
	try {
		const { data } = await api.post<SurveySubmissionSuccessResponse>(
			'/surveys/submit/',
			payload,
		);
		return data;
	} catch (error) {
		const axiosError = error as AxiosError;
		const message = axiosError.response?.data
			? JSON.stringify(axiosError.response.data)
			: 'Не удалось отправить ответы';
		throw new Error(message);
	}
}
