import axios, { AxiosInstance } from 'axios';

/**
 * Создает и настраивает axios instance для работы с API
 * @param baseURL - базовый URL API
 * @param withCredentials - использовать ли credentials (для работы с HTTP-only cookies)
 * @returns настроенный axios instance
 */
export const createApiInstance = (
	baseURL: string,
	withCredentials = false,
): AxiosInstance => {
	const apiInstance = axios.create({
		baseURL,
		timeout: 30000,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		// Включаем credentials только для запросов, где это необходимо
		// (например, для refresh token endpoint, где нужны HTTP-only cookies)
		// Для авторизации credentials не нужны, так как refresh token еще не установлен
		withCredentials,
	});

	return apiInstance;
};

/**
 * Глобальный axios instance БЕЗ credentials (для авторизации и публичных запросов)
 * Используется для запросов, где не нужны cookies
 */
let apiInstanceWithoutCredentials: AxiosInstance | null = null;

/**
 * Глобальный axios instance С credentials (для авторизованных запросов)
 * Используется для запросов, где нужны HTTP-only cookies (например, refresh token)
 */
let apiInstanceWithCredentials: AxiosInstance | null = null;

/**
 * Инициализирует глобальные axios instances
 * @param baseURL - базовый URL API из переменных окружения
 */
export const initializeApi = (baseURL: string): void => {
	if (!apiInstanceWithoutCredentials) {
		apiInstanceWithoutCredentials = createApiInstance(baseURL, false);
	}
	if (!apiInstanceWithCredentials) {
		apiInstanceWithCredentials = createApiInstance(baseURL, true);
	}
};

/**
 * Получает axios instance БЕЗ credentials
 * Используется для авторизации и публичных запросов
 * @returns axios instance без credentials
 */
export const getApiInstanceWithoutCredentials = (): AxiosInstance => {
	if (!apiInstanceWithoutCredentials) {
		const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
		if (!baseURL) {
			throw new Error(
				'API instance не инициализирован. Убедитесь, что NEXT_PUBLIC_API_BASE_URL установлен.',
			);
		}
		apiInstanceWithoutCredentials = createApiInstance(baseURL, false);
	}
	return apiInstanceWithoutCredentials;
};

/**
 * Получает axios instance С credentials
 * Используется для авторизованных запросов, где нужны HTTP-only cookies
 * @returns axios instance с credentials
 */
export const getApiInstanceWithCredentials = (): AxiosInstance => {
	if (!apiInstanceWithCredentials) {
		const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
		if (!baseURL) {
			throw new Error(
				'API instance не инициализирован. Убедитесь, что NEXT_PUBLIC_API_BASE_URL установлен.',
			);
		}
		apiInstanceWithCredentials = createApiInstance(baseURL, true);
	}
	return apiInstanceWithCredentials;
};

/**
 * Получает axios instance (по умолчанию БЕЗ credentials)
 * Для обратной совместимости
 * @returns axios instance без credentials
 * @deprecated Используйте getApiInstanceWithoutCredentials или getApiInstanceWithCredentials
 */
export const getApiInstance = (): AxiosInstance => {
	return getApiInstanceWithoutCredentials();
};
