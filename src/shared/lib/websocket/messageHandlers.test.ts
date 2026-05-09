import { createMessageHandler } from './messageHandlers';
import { openModal } from '@/store/modalSlice';
import type { RootState } from '@/store/store';
import type { SimulationFinishedStudentMessage } from '@/shared/types/websocket';

describe('messageHandlers simulation_finished', () => {
	const finishedMessage: SimulationFinishedStudentMessage = {
		type: 'simulation_finished',
		simulation_id: 42,
		time_spent: 120,
	};

	const createState = (
		isFinishingByStudent: boolean,
		isManualAbort = false,
	): RootState =>
		({
			simulation: {
				simulationId: 42,
				completedSimulationId: null,
				gate: null,
				originalMalfunctions: [],
				foundMalfunctionIds: [],
				isManualAbort,
				isFinishingByStudent,
			},
		}) as RootState;

	it('не открывает simulationInterrupted при локальном завершении студентом', () => {
		const dispatch = jest.fn();
		const getState = () => createState(true);
		const handler = createMessageHandler(dispatch, getState);

		handler(finishedMessage);

		expect(dispatch).not.toHaveBeenCalledWith(openModal('simulationInterrupted'));
	});

	it('открывает simulationInterrupted при внешнем завершении', () => {
		const dispatch = jest.fn();
		const getState = () => createState(false, false);
		const handler = createMessageHandler(dispatch, getState);

		handler(finishedMessage);

		expect(dispatch).toHaveBeenCalledWith(openModal('simulationInterrupted'));
	});
});
