import axios, { AxiosError } from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface UserLogData {
	malfunction_id?: string;
	answer_correct: boolean;
}

export interface UserLogResponse {
	id: number;
	user: number;
	created_at: string;
	simulation: number;
	answer_correct: boolean;
	malfunction_id?: string | null;
}

/**
 * Создает лог действия студента
 * @param data Данные лога (malfunction_id, answer_correct)
 * @returns Promise с данными созданного лога
 */
export async function postUserLog(data: UserLogData): Promise<UserLogResponse> {
	const access = localStorage.getItem('accessToken');

	if (!access) {
		throw new Error('Отсутствует токен доступа');
	}

	if (!urlBase) {
		throw new Error('Отсутствует базовый URL API');
	}

	try {
		const response = await axios.post<UserLogResponse>(
			`${urlBase}/userlog/`,
			data,
			{
				headers: {
					Authorization: `Bearer ${access}`,
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<{ detail?: string }>;
		const message =
			axiosError.response?.data?.detail ??
			'Не удалось создать лог действия';
		throw new Error(message);
	}
}
