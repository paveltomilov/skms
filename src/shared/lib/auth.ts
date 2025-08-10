import { VerifyResponse, RefreshResponse } from '@/shared/types/typesAuth';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function checkAuth(): Promise<{ valid: boolean }> {
	const access = localStorage.getItem('accessToken');
	const refresh = localStorage.getItem('refreshToken');

	if (!access || !refresh) return { valid: false };

	try {
		// Проверка текущего токена
		const verifyRes = await fetch(`${urlBase}auth/verify/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: access }),
		});

		const verifyData = (await verifyRes.json()) as VerifyResponse;
		if (verifyData.token_valid) return { valid: true };

		// Обновление токена
		const refreshRes = await fetch(`${urlBase}auth/refresh/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh }),
		});

		if (!refreshRes.ok) return { valid: false };

		const refreshData = (await refreshRes.json()) as RefreshResponse;
		if (refreshData.access) {
			localStorage.setItem('accessToken', refreshData.access);
			return { valid: true };
		}

		return { valid: false };
	} catch {
		return { valid: false };
	}
}
