import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import {deleteCookie} from 'cookies-next';
import {RefreshResponse} from '@/shared/types/typesAuth';

export let accessToken: string | null = null;

axios.defaults.withCredentials = true;

// Интерцептор для автоматического обновления токенов
let isRefreshing = false;

interface FailedRequest {
    resolve: (value: string | null) => void;
    reject: (error: unknown) => void;
}

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({resolve, reject}) => {
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

// Функция для выхода (перенесена из auth.ts для разрыва циклической зависимости)
const clearAuthData = (): void => {
    localStorage.removeItem('accessToken');
    deleteCookie('first_name');
    deleteCookie('last_name');
    deleteCookie('role');
    setAccessToken(null);
};

const setupResponseInterceptor = (urlBase: string) => {
    axios.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as ExtendedAxiosRequestConfig;
            if (originalRequest.url?.includes('/auth/refresh')) {
                clearAuthData();
                return Promise.reject(error);
            }
            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise<string | null>((resolve, reject) => {
                        failedQueue.push({resolve, reject});
                    })
                        .then(token => {
                            if (token && originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
							return axios({
								...originalRequest,
								headers: {
									...originalRequest.headers,
									Authorization: `Bearer ${token}`
								}
							});
                        })
                        .catch(err => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshRes = await axios.post<RefreshResponse>(
                        `${urlBase}/auth/refresh/`,
                        {},
                        {withCredentials: true},
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

						return axios({
							...originalRequest,
							headers: {
								...originalRequest.headers,
								Authorization: `Bearer ${newAccessToken}`
							}
						});
                    }
                    throw new Error('Ошибка получения refresh token');
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    clearAuthData();
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
const setupRequestInterceptor = () => {
    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            if (accessToken &&
				config.headers &&
				!config.url?.includes('/auth/')) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
			config.withCredentials = true;
            return config;
        },
        (error: AxiosError) => Promise.reject(error),
    );
};

export const initializeInterceptors = (urlBase: string): void => {
    setupRequestInterceptor();
    setupResponseInterceptor(urlBase);
};
