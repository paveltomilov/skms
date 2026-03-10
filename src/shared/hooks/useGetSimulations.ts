import { useCallback, useState } from 'react';
import { getSimulations } from '../api';
import { SimulationGetData } from '../types/simulation';
import { Role } from '../types/users';

export const useGetSimulations = (role: Role) => {
	const [simulations, setSimulations] = useState<SimulationGetData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchSimulations = useCallback(async () => {
		if (role === 'student') return;
		setIsLoading(true);
		setError(null);
		try {
			const data = await getSimulations(role);
			setSimulations(data);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to fetch simulations';
			setError(errorMessage);
			setSimulations([]);
		} finally {
			setIsLoading(false);
		}
	}, [role]);

	return { simulations, isLoading, error, refetch: fetchSimulations };
};
