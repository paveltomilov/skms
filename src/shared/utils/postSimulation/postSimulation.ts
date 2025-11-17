import axios, { AxiosError } from 'axios';
import { SimulationFormData } from '@/shared/types/simulation';

export async function postSimulation(
	urlBase: string | undefined,
	access: string | null,
	simulationData: SimulationFormData,
): Promise<{ status: number; statusText: string }> {
	if (!access) {
		throw new Error('отсутствует токен');
	}

	try {
		const response = await axios.post(
			`${urlBase}/simulation/`,
			simulationData,
			{
				headers: {
					Authorization: `Bearer ${access}`,
					'Content-Type': 'application/json',
				},
			},
		);

		return { status: response.status, statusText: response.statusText };
	} catch (error) {
		const axiosError = error as AxiosError;
		const message =
			axiosError.response?.data &&
			axios.isAxiosError<{ simulation: string[] }>(axiosError)
				? JSON.stringify(axiosError.response.data.simulation[0])
				: 'Failed to fetch';

		alert(message);
		throw new Error(message);
	}
}
