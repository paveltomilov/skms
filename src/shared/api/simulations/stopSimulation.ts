import axios, { AxiosError } from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function stopSimulation(id: number) {
	const access = localStorage.getItem('accessToken');

	if (!access) {
		throw new Error('отсутствует токен');
	}

	if (!urlBase) {
		throw new Error('API базовый URL не настроен');
	}

	try {
		const response = await axios.patch(
			`${urlBase}/simulation/${id}/`,
			{
				active: false,
			},
			{
				headers: {
					Authorization: `Bearer ${access}`,
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<{ detail?: string }>;

		// Если симуляция не найдена (404), это не критично - возможно, она уже была остановлена
		if (axiosError.response?.status === 404) {
			console.warn(
				'[stopSimulation] Симуляция не найдена на бэкенде (возможно, уже остановлена):',
				id,
			);
			// Возвращаем успешный результат, так как цель (остановка) уже достигнута
			return {
				success: true,
				message: 'Симуляция уже остановлена или не найдена',
			};
		}

		const message =
			axiosError.response?.data?.detail ??
			'Не удалось остановить симуляцию';
		console.error('[stopSimulation] Ошибка:', error);
		throw new Error(message);
	}
}
