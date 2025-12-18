import axios, { AxiosError } from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function stopSimulation(id: number) {
	if (!urlBase) {
		throw new Error('Отсутствует базовый URL API');
	}

	const access = localStorage.getItem('accessToken');

	if (!access) {
		throw new Error('Отсутствует токен доступа');
	}

	try {
		// Используем interceptors для добавления Authorization заголовка
		// Это обеспечивает консистентность с остальными запросами (как при входе)
		// Interceptors автоматически добавят Authorization из accessToken
		const response = await axios.patch(
			`${urlBase}/simulation/${id}/`,
			{
				active: false,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<{ detail?: string }>;

		// Обработка Network Error
		if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
			console.error('Network Error при прерывании симуляции:', {
				url: `${urlBase}/simulation/${id}/`,
				error: axiosError.message,
			});
			throw new Error(
				'Ошибка сети. Проверьте подключение к серверу и попробуйте снова.',
			);
		}

		// Обработка ошибок от сервера
		const message =
			axiosError.response?.data?.detail ??
			axiosError.response?.statusText ??
			'Не удалось остановить симуляцию';

		console.error('Ошибка при прерывании симуляции:', {
			status: axiosError.response?.status,
			message,
		});

		throw new Error(message);
	}
}
