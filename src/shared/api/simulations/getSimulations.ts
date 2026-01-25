import axios, { AxiosError } from 'axios';
import { SimulationGetData } from '@/shared/types/simulation';
import { Role } from '@/shared/types/users';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getSimulations(role: Role): Promise<SimulationGetData[]> {
	if (role === 'student') {
		throw new Error('Студент не имеет данных прав');
	}

	try {
		const response = await axios.get<SimulationGetData[]>(`${urlBase}/simulation/`);
		return response.data;
		
	} catch (error) {
		const axiosError = error as AxiosError;
		const message = axiosError.response?.data
			? JSON.stringify(axiosError.response.data)
			: 'Failed to fetch';
		throw new Error(message);
	}
}


