import axios from 'axios';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {LoginFormData, LoginResponse} from '../types/login';
import {accessToken, initializeInterceptors, setAccessToken} from '@/shared/lib/authInterceptors';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

if (urlBase) {
	initializeInterceptors(urlBase);
}

interface IPostAuthResponse {
	success: boolean;
	role?: string | undefined;
	errorText?: string;
}

export function initAccessFromStorage() {
	const stored = localStorage.getItem('accessToken');
	if (stored) setAccessToken(stored);
}

export async function checkAuth(): Promise<{ valid: boolean }> {
	const access = localStorage.getItem('accessToken');
	const refreshFromCookie = getCookie('refreshToken');

	if (!access || !refreshFromCookie) {
		logout();
		return { valid: false };
	}

	return { valid: true };
}

export async function postAuth(
	formData: LoginFormData,
): Promise<IPostAuthResponse> {
	try {
		const response = await axios.post<LoginResponse>(
			`${urlBase}/auth/`,
			{ email: formData.email, password: formData.password },
		);

		const { access, refresh, first_name, last_name, role } = response.data;

		if (!access || !refresh) {
			throw new Error('Токены не получены');
		}

		if (response.statusText == 'OK') {
			setAccessToken(access);
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
	return accessToken;
}

// Функция для выхода
export function logout(): void {
	localStorage.removeItem('accessToken');
	deleteCookie('refreshToken');
	deleteCookie('first_name');
	deleteCookie('last_name');
	deleteCookie('role');
	setAccessToken(null);
}
