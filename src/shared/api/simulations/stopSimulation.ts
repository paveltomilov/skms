import axios, { AxiosError } from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function stopSimulation(id: number) {
	const access = localStorage.getItem('accessToken');

	if (!access) {
		throw new Error('отсутствует токен');
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
		const message =
			axiosError.response?.data?.detail ??
			'Не удалось остановить симуляцию';
		console.log(error);
		throw new Error(message);
	}
}


