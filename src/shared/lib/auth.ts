import { RefreshResponse, VerifyResponse } from '@/shared/types/typesAuth';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { LoginFormData, LoginResponse } from '../types/login';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function checkAuth(): Promise<{ valid: boolean }> {
	const access = localStorage.getItem('accessToken');
	const refresh = getCookie('refreshToken');

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

		// Properly typed response
		const verifyData = (await verifyRes.json()) as VerifyResponse;

		if (verifyData.token_valid) {
			return { valid: true };
		}

		if (!refresh) {
			return { valid: false };
		}

		const refreshRes = await fetch(`${urlBase}/auth/refresh/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh }),
		});

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

export async function postAuth(formData: LoginFormData): Promise<boolean> {
	try {
		const response = await axios.post<LoginResponse>(
			`${urlBase}/auth/`,
			{ email: formData.email, password: formData.password },
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);

		const { access, refresh, first_name, last_name, role } = response.data;

		if (!access || !refresh || !first_name || !last_name || !role) {
			// throw new Error('Токены не получены');
			throw new Error('Данные некорректны');
		}
		if (response.status == 200) {
			// Опции для cookies
			// const cookieOptions = {
			// 	maxAge: 60 * 60 * 24 * 7, // 7 дней
			// 	path: '/',
			// 	sameSite: 'lax' as const,
			// 	secure: process.env.NODE_ENV === 'production',
			// };

			localStorage.setItem('accessToken', access);
			setCookie('refreshToken', refresh); // ← с опциями!
			setCookie('userFirstName', first_name);
			setCookie('userLastName', last_name);
			setCookie('userRole', role); // ← сохраняем как есть: "admin" или "student"

			return true;
		}
		return false;
	} catch {
		return false;
	}
}
