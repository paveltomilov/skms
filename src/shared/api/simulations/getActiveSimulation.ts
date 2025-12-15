import axios, { AxiosError } from 'axios';
import { SimulationGetData } from '@/shared/types/simulation';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Получает активную симуляцию для текущего пользователя
 * @returns Promise с ID активной симуляции или null, если активной симуляции нет
 */
export async function getActiveSimulation(): Promise<number | null> {
	try {
		const response = await axios.get<SimulationGetData[]>(
			`${urlBase}/simulation/`,
		);
		const simulations = response.data;

		// Находим активную симуляцию
		const activeSimulation = simulations.find(sim => sim.active === true);

		return activeSimulation ? activeSimulation.id : null;
	} catch (error) {
		const axiosError = error as AxiosError;

		// Если 403 или 404 - это нормальная ситуация (нет активной симуляции или нет доступа)
		// Возвращаем null, чтобы продолжить с локальной очисткой состояния
		if (
			axiosError.response?.status === 403 ||
			axiosError.response?.status === 404
		) {
			return null;
		}

		// Для других ошибок пробрасываем исключение
		const message = axiosError.response?.data
			? typeof axiosError.response.data === 'string'
				? axiosError.response.data
				: JSON.stringify(axiosError.response.data)
			: 'Failed to fetch simulations';
		throw new Error(message);
	}
}
