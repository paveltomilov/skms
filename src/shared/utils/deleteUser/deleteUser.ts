import axios, { AxiosError } from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function deleteUser(id: number) {
	const access =
		typeof window !== 'undefined'
			? localStorage.getItem('accessToken')
			: null;

	if (!access) {
		throw new Error('отсутствует токен');
	}
	if (!urlBase) {
		throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
	}

	try {
		const response = await axios.delete(`${urlBase}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		});
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError;
		const message =
			axiosError.response?.data &&
			axios.isAxiosError<{ detail: string }>(axiosError)
				? axiosError.response.data.detail
				: 'Failed to fetch';

		throw new Error(message);
	}
}
