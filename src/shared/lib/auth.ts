import {RefreshResponse, VerifyResponse} from '@/shared/types/typesAuth';
import axios from 'axios';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {LoginFormData, LoginResponse} from '../types/login';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

// Вспомогательная функция для сохранения accessToken с timestamp
export function saveAccessToken(token: string): void {
	setCookie('accessToken', token, {maxAge: 900});
}

// Вспомогательная функция для сохранения refreshToken с timestamp
export function saveRefreshToken(token: string): void {
	setCookie('refreshToken', token, { maxAge: 1800});
}

// Вспомогательная функция для извлечения и проверки refreshToken (30 минут)
export function getRefreshToken(): string | null {
	return getCookie('refreshToken') as string | null;
}

export function getAccessToken(): string | null {
	return getCookie('accessToken') as string | null;
}

export async function checkAuth(): Promise<{ valid: boolean }> {
	const access = getAccessToken();
	const refresh = getRefreshToken();

	if (!access || !refresh) {
		return { valid: false };
	}

	try {
		const verifyRes = await fetch(`${urlBase}/auth/verify/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: access }),
		});

		if (!verifyRes.ok) {
			return { valid: false };
		}

		const verifyData = (await verifyRes.json()) as VerifyResponse;

		if (verifyData.token_valid) {
			return { valid: true };
		}

		const refreshRes = await fetch(`${urlBase}/auth/refresh/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh }),
		});

		if (!refreshRes.ok) {
			return { valid: false };
		}

		const refreshData = (await refreshRes.json()) as RefreshResponse;

		if (refreshData.access) {
			saveAccessToken(refreshData.access);
			return { valid: true };
		}

		return { valid: false };
	} catch {
		// Очищаем токены при ошибке для безопасности
		deleteCookie('accessToken');
		deleteCookie('refreshToken');
		return { valid: false };
	}
}

export async function postAuth(formData: LoginFormData): Promise<boolean> {
	try {
		const response = await axios.post<LoginResponse>(
			`${urlBase}/auth/`,
			{ email: formData.email, password: formData.password },
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);

		const { access, refresh } = response.data;

		if (!access || !refresh) {
			throw new Error('Токены не получены');
		}
		if (response.status == 200) {
			saveAccessToken(access);
			saveRefreshToken(refresh);
			return true;
		}
		return false;
	} catch {
		return false;
	}
}
