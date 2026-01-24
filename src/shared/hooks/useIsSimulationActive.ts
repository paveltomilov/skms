import { useAppSelector } from '@/shared/hooks/store';

export const useIsSimulationActive = (): boolean => {
	const simulationId = useAppSelector(state => state.simulation.simulationId);

	return simulationId !== null;
};
