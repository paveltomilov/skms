import { useEffect, useState } from 'react';
import { useUserCookies } from './useUserCookies';
import { getSimulations, stopSimulation } from '../api';
import { AxiosError } from 'axios';

interface IUseSimulation {
	hasActiveSimulation: boolean;
	allSimulationsById: number[];
	deleteSimulation: () => Promise<void>;
	error: string | null;
}

export function useSimulationByIdStudent(
	idStudent: number | null,
): IUseSimulation {
	const [hasActiveSimulation, setHasActiveSimulation] =
		useState<boolean>(false);
	const [allSimulationsById, setAllSimulationsById] = useState<number[]>([]);
	const [error, setError] = useState<string | null>(null);

	const { role } = useUserCookies();

	useEffect(() => {
		if (idStudent === null) {
			setHasActiveSimulation(false);
			setAllSimulationsById([]);
			setError(null);
			return;
		}

		const fetchSimulations = async () => {
			setError(null);
			try {
				const simulations = await getSimulations(role);
				const idSimulations = simulations
					.filter(sim => sim.user === idStudent)
					.map(item => item.id);
				const activeSimulation = simulations
					.filter(sim => sim.user === idStudent && sim.active)
					.map(item => item.id);

				setAllSimulationsById(idSimulations);
				setHasActiveSimulation(activeSimulation.length > 0);
			} catch (err) {
				const errorMessage =
					err instanceof Error
						? err.message
						: 'Failed to fetch users';
				setError(errorMessage);
				setHasActiveSimulation(false);
				setAllSimulationsById([]);
			}
		};
		fetchSimulations();
	}, [idStudent, role]);

	async function deleteSimulation() {
		try {
			for (const simId of allSimulationsById) {
				await stopSimulation(simId);
			}
			setHasActiveSimulation(false);
			setAllSimulationsById([]);
		} catch (error) {
			const axiosError = error as AxiosError;
			const message = axiosError.response?.data
				? typeof axiosError.response.data === 'string'
					? axiosError.response.data
					: JSON.stringify(axiosError.response.data)
				: 'Не удалось остановить симуляцию';
			console.log(error);
			setError(message);
		}
	}
	return {
		deleteSimulation,
		hasActiveSimulation,
		allSimulationsById,
		error,
	};
}
