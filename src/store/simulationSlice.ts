import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Malfunction } from '@/shared/types/scheme';

export interface SimulationState {
	simulationId: number | null;
	gate: string | null;
	originalMalfunctions: Malfunction[];
	foundMalfunctionIds: string[];
}

const initialState: SimulationState = {
	simulationId: null,
	gate: null,
	originalMalfunctions: [],
	foundMalfunctionIds: [],
};

interface StartSimulationPayload {
	simulationId: string;
	originalMalfunctions: Malfunction[];
}

interface SetSimulationPayload {
	simulation_id?: number;
	gate?: string;
	malfunctions: Array<{
		malfunction_id: string;
		description?: string;
	}>;
}

const simulationSlice = createSlice({
	name: 'simulation',
	initialState,
	reducers: {
		startSimulation: (
			state,
			action: PayloadAction<StartSimulationPayload>,
		) => {
			state.simulationId = Number(action.payload.simulationId);
			// Создаем глубокую копию массива, чтобы предотвратить мутацию
			state.originalMalfunctions =
				action.payload.originalMalfunctions.map(malfunction => ({
					...malfunction,
				}));
			state.foundMalfunctionIds = [];
		},
		setSimulation: (state, action: PayloadAction<SetSimulationPayload>) => {
			// Устанавливаем данные симуляции из WebSocket сообщения инициализации
			if (action.payload.simulation_id !== undefined) {
				state.simulationId = action.payload.simulation_id;
			}
			if (action.payload.gate !== undefined) {
				state.gate = action.payload.gate || null;
			}
			// Преобразуем массив с malfunction_id и description в формат Malfunction
			state.originalMalfunctions = action.payload.malfunctions.map(m => ({
				id: m.malfunction_id,
				name: m.description || m.malfunction_id,
				active: true,
			}));
			state.foundMalfunctionIds = [];
		},
		markMalfunctionAsFound: (state, action: PayloadAction<string>) => {
			const malfunctionId = action.payload;
			// Добавляем ID только если его еще нет в списке
			if (!state.foundMalfunctionIds.includes(malfunctionId)) {
				state.foundMalfunctionIds.push(malfunctionId);
			}
		},
		resetSimulation: () => {
			// Сброс/завершение симуляции - возвращаем начальное состояние
			return initialState;
		},
	},
});

export const {
	startSimulation,
	setSimulation,
	markMalfunctionAsFound,
	resetSimulation,
} = simulationSlice.actions;

export default simulationSlice.reducer;
