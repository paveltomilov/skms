import { getApiInstanceWithCredentials } from '@/shared/lib/api';
import { RefreshResponse } from '@/shared/types/typesAuth';

/**
 * Вспомогательная функция: попытка рефреша токена
 */
export async function tryRefreshToken(): Promise<string | null> {
	const api = getApiInstanceWithCredentials();
	try {
		const { data } = await api.post<RefreshResponse>('/auth/refresh/');
		if (data.access) {
			localStorage.setItem('accessToken', data.access);
			return data.access;
		}
		return null;
	} catch (error) {
		console.warn('⚠ Не удалось обновить токен:', error);
		return null;
	}
}
