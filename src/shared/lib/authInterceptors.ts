import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { getCookie } from 'cookies-next';
import { RefreshResponse } from '@/shared/types/typesAuth';
import { logout } from '@/shared/lib/auth';

export let accessToken: string | null = null;

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

export const setAccessToken = (token: string | null): void => {
	accessToken = token;
};

export const setupResponseInterceptor = (urlBase: string) => {
	axios.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			const originalRequest = error.config as ExtendedAxiosRequestConfig;

			if (originalRequest.url?.includes('/auth/refresh')) {
				logout();
				return Promise.reject(error);
			}

			if (error.response?.status === 401 && !originalRequest._retry) {
				if (isRefreshing) {
					return new Promise<string | null>((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					})
						.then(token => {
							if (token && originalRequest.headers) {
								originalRequest.headers.Authorization = `Bearer ${token}`;
							}
							return axios(originalRequest);
						})
						.catch(err => Promise.reject(err));
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
						{ refresh: refreshToken },
					);

					if (refreshRes.status === 200 && refreshRes.data.access) {
						const newAccessToken = refreshRes.data.access;

						// Сохраняем в памяти
						setAccessToken(newAccessToken);
						localStorage.setItem('accessToken', newAccessToken);

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
					window.location.href = '/login';
					return Promise.reject(refreshError);
				} finally {
					isRefreshing = false;
				}
			}
			return Promise.reject(error);
		},
	);
};

// Устанавливаем интерцептор для добавления токена в запросы
export const setupRequestInterceptor = () => {
	axios.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			if (accessToken && config.headers) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		(error: AxiosError) => Promise.reject(error),
	);
};

export const initializeInterceptors = (urlBase: string): void => {
	setupRequestInterceptor();
	setupResponseInterceptor(urlBase);
};
