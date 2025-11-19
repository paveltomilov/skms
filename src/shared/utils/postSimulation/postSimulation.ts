import axios, { AxiosError } from 'axios';
import { SimulationFormData } from '@/shared/types/simulation';

export interface ResponseData {
	status: number;
	statusText: string;
}

export interface IResponse {
	errors: string | null;
	success: boolean;
	data: ResponseData | null;
}

export async function postSimulation(
	urlBase: string | undefined,
	access: string | null,
	simulationData: SimulationFormData,
): Promise<IResponse> {
	if (!access || !urlBase) {
		const error = !access
			? 'Отсутствует Access токен'
			: 'Отсутствует базовый URL';
		return {
			success: false,
			errors: error,
			data: null,
		};
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

		return {
			success: true,
			errors: null,
			data: {
				status: response.status,
				statusText: response.statusText,
			},
		};
	} catch (error) {
		const axiosError = error as AxiosError;
		const message =
			axiosError.response?.data &&
			axios.isAxiosError<{ simulation: string[] }>(axiosError)
				? JSON.stringify(axiosError.response.data.simulation[0])
				: 'Ошибка запроса';

		return {
			success: false,
			errors: message,
			data: null,
		};
	}
}
