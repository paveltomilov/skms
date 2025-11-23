import axios, { AxiosError } from 'axios';
import { SimulationFormData } from '@/shared/types/simulation';

export async function postSimulation(
	urlBase: string | undefined,
	simulationData: SimulationFormData
): Promise<boolean> {
	try {
		await axios.post(`${urlBase}/simulation/`, simulationData);
		return true;
	} catch (error) {
		const axiosError = error as AxiosError;
		const message =
			axiosError.response?.data &&
				axios.isAxiosError<{ simulation: string[] }>(axiosError)
				? JSON.stringify(axiosError.response.data.simulation[0])
				: 'Failed to fetch';

		alert(message);
		throw new Error(message);
	};
};