import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Malfunction } from '@/shared/types/scheme';

export interface SimulationState {
	simulationId: string | null;
	originalMalfunctions: Malfunction[];
	foundMalfunctionIds: string[];
	isCompleted: boolean;
	isInitialized: boolean;
}

const initialState: SimulationState = {
	simulationId: null,
	originalMalfunctions: [],
	foundMalfunctionIds: [],
	isCompleted: false,
	isInitialized: false,
};

interface StartSimulationPayload {
	simulationId: string;
	originalMalfunctions: Malfunction[];
}

const simulationSlice = createSlice({
	name: 'simulation',
	initialState,
	reducers: {
		startSimulation: (
			state,
			action: PayloadAction<StartSimulationPayload>,
		) => {
			state.simulationId = action.payload.simulationId;
			// Создаем глубокую копию массива, чтобы предотвратить мутацию
			state.originalMalfunctions =
				action.payload.originalMalfunctions.map(malfunction => ({
					...malfunction,
				}));
			state.foundMalfunctionIds = [];
			state.isCompleted = false;
			state.isInitialized = true;
		},
		markMalfunctionAsFound: (state, action: PayloadAction<string>) => {
			const malfunctionId = action.payload;
			// Добавляем ID только если его еще нет в списке
			if (!state.foundMalfunctionIds.includes(malfunctionId)) {
				state.foundMalfunctionIds.push(malfunctionId);
			}
		},
		completeSimulation: state => {
			state.isCompleted = true;
		},
	},
});

export const { startSimulation, markMalfunctionAsFound, completeSimulation } =
	simulationSlice.actions;

export default simulationSlice.reducer;
