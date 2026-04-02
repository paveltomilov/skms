import { AxiosError } from 'axios';
import { getApiInstanceWithoutCredentials } from '@/shared/lib/api';

export type LeadPayload = {
	full_name: string;
	company: string;
	email: string;
	phone: string;
};

/**
 * Заявка с лендинга (публичный create, без cookies).
 * Путь относительно NEXT_PUBLIC_API_BASE_URL (например …/api/leads/).
 */
export async function postLead(payload: LeadPayload): Promise<void> {
	const api = getApiInstanceWithoutCredentials();
	try {
		await api.post('/leads/', payload);
	} catch (error) {
		const axiosError = error as AxiosError;
		const message = axiosError.response?.data
			? JSON.stringify(axiosError.response.data)
			: 'Не удалось отправить заявку';
		throw new Error(message);
	}
}
