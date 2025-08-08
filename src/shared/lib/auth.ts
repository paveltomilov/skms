import { VerifyResponse, RefreshResponse } from '@/shared/types/typesAuth';

export async function checkAuth(): Promise<{ valid: boolean }> {
	const access = localStorage.getItem('accessToken');
	const refresh = localStorage.getItem('refreshToken');

	if (!access || !refresh) {
		return { valid: false };
	}

	try {
		const verifyRes = await fetch(
			'http://localhost:8000/api/auth/verify/',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: access }),
			},
		);

		if (!verifyRes.ok) {
			return { valid: false };
		}

		// Properly typed response
		const verifyData = (await verifyRes.json()) as VerifyResponse;

		if (verifyData.token_valid) {
			return { valid: true };
		}

		if (!refresh) {
			return { valid: false };
		}

		const refreshRes = await fetch(
			'http://localhost:8000/api/auth/refresh/',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refresh }),
			},
		);

		if (!refreshRes.ok) {
			return { valid: false };
		}

		// Properly typed response
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
