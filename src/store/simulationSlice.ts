import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Malfunction } from '@/shared/types/scheme';

export interface SimulationState {
	simulationId: number | null;
	completedSimulationId: number | null;
	gate: string | null;
	originalMalfunctions: Malfunction[];
	foundMalfunctionIds: string[];
	isManualAbort: boolean;
	isFinishingByStudent: boolean;
}

const initialState: SimulationState = {
	simulationId: null,
	completedSimulationId: null,
	gate: null,
	originalMalfunctions: [],
	foundMalfunctionIds: [],
	isManualAbort: false,
	isFinishingByStudent: false,
};

interface StartSimulationPayload {
	simulationId: string;
	originalMalfunctions: Malfunction[];
}

interface SetSimulationPayload {
	simulationId?: number;
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
			state.isFinishingByStudent = false;
		},
		setSimulation: (state, action: PayloadAction<SetSimulationPayload>) => {
			// Устанавливаем данные симуляции из WebSocket сообщения инициализации
			if (action.payload.simulationId !== undefined) {
				state.simulationId = action.payload.simulationId;
			}
			if (action.payload.gate) {
				state.gate = action.payload.gate;
			}
			// Преобразуем массив с malfunction_id и description в формат Malfunction
			state.originalMalfunctions = action.payload.malfunctions.map(m => ({
				id: m.malfunction_id,
				name: m.description || m.malfunction_id,
				active: true,
			}));
			state.foundMalfunctionIds = [];
			state.isFinishingByStudent = false;
		},
		markMalfunctionAsFound: (state, action: PayloadAction<string>) => {
			const malfunctionId = action.payload;
			// Добавляем ID только если его еще нет в списке
			if (!state.foundMalfunctionIds.includes(malfunctionId)) {
				state.foundMalfunctionIds.push(malfunctionId);
			}
		},
		deactivateSimulationMalfunction: (state, action: PayloadAction<string>) => {
			const malfunctionId = action.payload;
			state.originalMalfunctions = state.originalMalfunctions.map(malfunction =>
				malfunction.id === malfunctionId
					? { ...malfunction, active: false }
					: malfunction,
			);
		},
		setCompletedSimulationId: (state, action: PayloadAction<number>) => {
			state.completedSimulationId = action.payload;
		},
		clearCompletedSimulationId: state => {
			state.completedSimulationId = null;
		},
		setManualAbort(state, action: PayloadAction<boolean>) {
			state.isManualAbort = action.payload;
		},
		setFinishingByStudent(state, action: PayloadAction<boolean>) {
			state.isFinishingByStudent = action.payload;
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
	deactivateSimulationMalfunction,
	setCompletedSimulationId,
	clearCompletedSimulationId,
	setManualAbort,
	setFinishingByStudent,
	resetSimulation,
} = simulationSlice.actions;

export default simulationSlice.reducer;
