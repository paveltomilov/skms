import { AxiosError } from 'axios';
import type { ServerQuestion } from '@/shared/types/question';
import { getApiInstanceWithoutCredentials } from '@/shared/lib/api';

export type SurveyQuestionGroup = 'lead' | 'survey' | 'other';

/** Группа вопросов лендингового блока (SurveyQuestion.question_group на бэке). */
export const LANDING_SURVEY_QUESTION_GROUP: SurveyQuestionGroup = 'survey';

/**
 * Активные вопросы опроса с бэка (id вопросов и вариантов совпадают с БД для submit).
 */
export async function getSurveyQuestions(
	questionGroup: SurveyQuestionGroup,
): Promise<ServerQuestion[]> {
	const api = getApiInstanceWithoutCredentials();
	try {
		const response = await api.get<ServerQuestion[]>('/surveys/questions/', {
			params: { question_group: questionGroup },
		});
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError;
		const message = axiosError.response?.data
			? JSON.stringify(axiosError.response.data)
			: 'Не удалось загрузить вопросы опроса';
		throw new Error(message);
	}
}
