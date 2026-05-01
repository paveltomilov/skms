import { getApiInstanceWithCredentials } from '@/shared/lib/api';

export async function verifyToken(token: string): Promise<boolean> {
	const api = getApiInstanceWithCredentials();
	try {
		const res = await api.post<{ token_valid: boolean }>('auth/verify/', {
			token,
		});
		return res.data.token_valid;
	} catch (error) {
		console.warn('⚠ Не удалось проверить токен:', error);
		return false;
	}
}
