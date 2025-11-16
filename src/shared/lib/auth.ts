import { RefreshResponse, VerifyResponse } from '@/shared/types/typesAuth';
import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { LoginFormData, LoginResponse } from '../types/login';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

interface IPostAuthResponse {
	success: boolean;
	role?: string | undefined;
	errorText?: string;
}

// Глобальная переменная для хранения access token (в памяти)
let accessToken: string | null = null;

// Интерцептор для автоматического обновления токенов
let isRefreshing = false;

interface FailedRequest {
	resolve: (value: string | null) => void;
	reject: (error: unknown) => void;
}

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach(({ resolve, reject }) => {
		if (error) {
			reject(error);
		} else {
			resolve(token);
		}
	});
	failedQueue = [];
};

// Расширяем тип AxiosRequestConfig для добавления кастомного поля
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

axios.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as ExtendedAxiosRequestConfig;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise<string | null>((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						if (token && originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`;
						}
						return axios(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshToken = getCookie('refreshToken');
				if (!refreshToken) {
					throw new Error('Не получен refresh token');
				}

				const refreshRes = await axios.post<RefreshResponse>(
					`${urlBase}/auth/refresh/`,
					{ refresh: refreshToken }
				);

				if (refreshRes.status === 200 && refreshRes.data.access) {
					const newAccessToken = refreshRes.data.access;

					// Сохраняем в памяти
					accessToken = newAccessToken;

					// Обновляем заголовок для оригинального запроса
					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					}

					// Обрабатываем очередь запросов
					processQueue(null, newAccessToken);

					return axios(originalRequest);
				}
				throw new Error('Ошибка получения refresh token');
			} catch (refreshError) {
				processQueue(refreshError, null);
				logout();
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

// Устанавливаем интерцептор для добавления токена в запросы
axios.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);


export async function checkAuth(): Promise<{ valid: boolean }> {
	const access = localStorage.getItem('accessToken');
	// Проверяем refresh-токен в обоих местах (localStorage и cookie)
	const refreshFromStorage = localStorage.getItem('refreshToken');
	const refreshFromCookie = getCookie('refreshToken');
	const refresh = refreshFromStorage || refreshFromCookie;

	if (!access || !refresh) {
		// Очищаем оба хранилища при отсутствии токенов
		logout();
		return { valid: false };
	}

	try {
		// 1. Проверяем валидность accessToken
		const verifyRes = await axios.post<VerifyResponse>(
			`${urlBase}/auth/verify/`,
			{ token: access},
		);


		if (verifyRes.statusText == 'OK' && verifyRes.data.token_valid) {
			return { valid: true }; // AccessToken валиден
		}


		// 2. Если accessToken невалиден, пробуем обновить через refreshToken
		const refreshRes = await axios.post<RefreshResponse>(
			`${urlBase}/auth/refresh/`,
			{refresh},
		);

		if (refreshRes.statusText == 'OK' && refreshRes.data.access) {
			localStorage.setItem('accessToken', refreshRes.data.access);
			return { valid: true };

		}

		if (refreshRes.statusText !== 'OK') {
			throw new Error('Refresh token failed');
		}

		return { valid: false };
	} catch {
		// При любой ошибке очищаем хранилища
		logout();
		return { valid: false };
	}
}

export async function postAuth(
	formData: LoginFormData,
	rememberMe: boolean = false,
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
			accessToken = access;
			localStorage.setItem('accessToken', access);

			// Если "Запомнить" включён — сохраняем refresh в localStorage, иначе в cookie
			if (rememberMe) {
				localStorage.setItem('refreshToken', refresh);
			} else {
				setCookie('refreshToken', refresh);
			}

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
	localStorage.removeItem('refreshToken');
	deleteCookie('refreshToken');
	deleteCookie('first_name');
	deleteCookie('last_name');
	deleteCookie('role');
	accessToken = null;
}
