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
			simulationData
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
		const axiosError = error as AxiosError<{ detail?: string }>;
		const message =
			axiosError.response?.data?.detail ??
			'Не удалось остановить симуляцию';
		return {
			success: false,
			errors: message,
			data: null,
		};
	}
}


