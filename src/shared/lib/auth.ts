import { RefreshResponse, VerifyResponse } from '@/shared/types/typesAuth';
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { LoginFormData, LoginResponse } from '../types/login';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function checkAuth(): Promise<{ valid: boolean }> {
	const access = localStorage.getItem('accessToken');
	const refresh = getCookie('refreshToken');

	if (!access || !refresh) {
		// Очищаем оба хранилища при отсутствии токенов
		localStorage.removeItem('accessToken');
		deleteCookie('refreshToken');
		return { valid: false };
	}

	try {
		// 1. Проверяем валидность accessToken
		const verifyRes = await fetch(`${urlBase}/auth/verify/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: access }),
		});

		if (verifyRes.ok) {
			const verifyData = (await verifyRes.json()) as VerifyResponse;
			if (verifyData.token_valid) {
				return { valid: true }; // AccessToken валиден
			}
		}

		// 2. Если accessToken невалиден, пробуем обновить через refreshToken
		const refreshRes = await fetch(`${urlBase}/auth/refresh/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh }),
		});

		if (!refreshRes.ok) {
			throw new Error('Refresh token failed');
		}

		const refreshData = (await refreshRes.json()) as RefreshResponse;

		if (refreshData.access) {
			// Сохраняем новый accessToken
			localStorage.setItem('accessToken', refreshData.access);
			return { valid: true };
		}

		return { valid: false };
	} catch {
		// При любой ошибке очищаем хранилища
		localStorage.removeItem('accessToken');
		deleteCookie('refreshToken');
		return { valid: false };
	}
}

export async function postAuth(
	formData: LoginFormData,
): Promise<{
	success: boolean;
	role?: string | undefined;
	errorText?: string;
}> {
	try {
		const response = await axios.post<LoginResponse>(
			`${urlBase}/auth/`,
			{ email: formData.email, password: formData.password },
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);

		const { access, refresh, first_name, last_name, role } = response.data;

		if (!access || !refresh) {
			throw new Error('Токены не получены');
		}

		if (response.status === 200) {
			localStorage.setItem('accessToken', access);
			setCookie('refreshToken', refresh);
			setCookie('first_name', first_name);
			setCookie('last_name', last_name);
			setCookie('role', role);

			return { success: true, role };
		}
		return { success: false };
	} catch (err: unknown) {
		let errorText: string | undefined;
		if (axios.isAxiosError(err)) {
			const data = err.response?.data as unknown;
			if (data && typeof data === 'object') {
				const d = data as Record<string, unknown>;
				const detail =
					typeof d.detail === 'string' ? d.detail : undefined;
				const error = typeof d.error === 'string' ? d.error : undefined;
				errorText = detail || error;
			}
		}
		return { success: false, errorText };
	}
}

// Вспомогательная функция для получения accessToken
export function getAccessToken(): string | null {
	return localStorage.getItem('accessToken');
}

// Функция для выхода
export function logout(): void {
	localStorage.removeItem('accessToken');
	deleteCookie('refreshToken');
}
