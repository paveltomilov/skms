import axios from 'axios';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import { LoginFormData, LoginResponse } from '@/shared/types/login';
import {
	accessToken,
	initializeInterceptors,
	setAccessToken,
} from '@/shared/api/config/interceptors';
import {deleteRefreshToken} from '@/shared/api/auth/deleteRefreshToken';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

// Ленивая инициализация интерцепторов для избежания циклической зависимости
let interceptorsInitialized = false;
const ensureInterceptorsInitialized = () => {
	if (!interceptorsInitialized && urlBase) {
		initializeInterceptors(urlBase);
		interceptorsInitialized = true;
	}
};

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
	ensureInterceptorsInitialized();
	const access = localStorage.getItem('accessToken');

	if (!access) {
		logout();
		return { valid: false };
	}

	return { valid: true };
}

export async function postAuth(
	formData: LoginFormData,
	remember: boolean,
): Promise<IPostAuthResponse> {
	if (!urlBase) {
		return {
			success: false,
			errorText:
				'API сервер не настроен. Проверьте переменную окружения NEXT_PUBLIC_API_BASE_URL',
		};
	}

	ensureInterceptorsInitialized();
	try {
		const response = await axios.post<LoginResponse>(
			`${urlBase}/auth/`,
			{
					email: formData.email,
					password: formData.password,
					remember: remember,
			},
			{withCredentials: true}
			)
		;

		const { access, first_name, last_name, role } = response.data;

		if (!access) {
			throw new Error('Access token не получен');
		}

		if (response.statusText == 'OK') {
			setAccessToken(access);
			localStorage.setItem('accessToken', access);
			setCookie('first_name', first_name);
			setCookie('last_name', last_name);
			setCookie('role', role);
			setCookie('remember', remember);

			return { success: true, role };
		}

		return { success: false };
	} catch (err: unknown) {
		let errorText: string | undefined;
		if (axios.isAxiosError(err)) {
			// Обработка ошибок подключения
			const errorMessage = err.message || '';
			const isConnectionError =
				err.code === 'ECONNREFUSED' ||
				err.code === 'ERR_FAILED' ||
				err.code === 'ERR_NETWORK' ||
				errorMessage.includes('ERR_CONNECTION_REFUSED') ||
				errorMessage.includes('ERR_FAILED') ||
				errorMessage.includes('ERR_NETWORK') ||
				errorMessage.includes('Network Error');

			// Обработка CORS ошибок
			const isCorsError =
				errorMessage.includes('CORS') ||
				errorMessage.includes('Access-Control-Allow-Origin') ||
				errorMessage.includes('blocked by CORS policy');

			if (isCorsError) {
				errorText =
					'Ошибка CORS: бэкенд не разрешает запросы с этого домена. Проверьте настройки CORS на сервере (должен быть разрешён http://localhost:3000)';
			} else if (isConnectionError) {
				errorText =
					'Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен на http://localhost:8000';
			} else if (err.response) {
				// Ошибка от сервера
				const data = err.response.data as unknown;
				if (data && typeof data === 'object') {
					const d = data as Record<string, unknown>;
					const detail =
						typeof d.detail === 'string' ? d.detail : undefined;
					const error =
						typeof d.error === 'string' ? d.error : undefined;
					errorText = detail || error;
				} else {
					errorText = `Ошибка сервера: ${err.response.status} ${err.response.statusText}`;
				}
			} else if (err.request) {
				// Запрос отправлен, но ответа нет
				errorText =
					'Сервер не отвечает. Проверьте подключение к сети и убедитесь, что бэкенд запущен.';
			} else {
				errorText = err.message || 'Произошла ошибка при авторизации';
			}
		} else {
			errorText = 'Произошла неизвестная ошибка';
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
	const rememberUser = getCookie('remember');

	localStorage.removeItem('accessToken');
	deleteCookie('first_name');
	deleteCookie('last_name');
	deleteCookie('role');
	setAccessToken(null);

	if (rememberUser === 'true') {
		deleteRefreshToken();
		deleteCookie('remember');
	}
}
