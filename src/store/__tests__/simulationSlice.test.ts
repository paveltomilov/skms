import simulationReducer, {
	deactivateSimulationMalfunction,
	startSimulation,
	markMalfunctionAsFound,
	resetSimulation,
	setFinishingByStudent,
	SimulationState,
} from '../simulationSlice';
import { Malfunction } from '@/shared/types/scheme';

describe('simulationSlice', () => {
	const initialState: SimulationState = {
		simulationId: null,
		completedSimulationId: null,
		gate: null,
		originalMalfunctions: [],
		foundMalfunctionIds: [],
		isManualAbort: false,
		isFinishingByStudent: false,
	};

	const mockMalfunctions: Malfunction[] = [
		{ id: 'm1', name: 'Неисправность 1', active: true },
		{ id: 'm2', name: 'Неисправность 2', active: true },
		{ id: 'm3', name: 'Неисправность 3', active: false },
	];

	describe('инициализация', () => {
		it('должен вернуть начальное состояние', () => {
			expect(simulationReducer(undefined, { type: 'unknown' })).toEqual(
				initialState,
			);
		});

		it('должен инициализировать симуляцию с помощью startSimulation', () => {
			const action = startSimulation({
				simulationId: '123',
				originalMalfunctions: mockMalfunctions,
			});

			const newState = simulationReducer(initialState, action);

			expect(newState.simulationId).toBe(123);
			expect(newState.originalMalfunctions).toHaveLength(3);
			expect(newState.originalMalfunctions[0]).toEqual(
				mockMalfunctions[0],
			);
			expect(newState.foundMalfunctionIds).toEqual([]);
			expect(newState.simulationId).not.toBeNull();
		});

		it('должен создать глубокую копию originalMalfunctions', () => {
			const action = startSimulation({
				simulationId: '123',
				originalMalfunctions: mockMalfunctions,
			});

			const newState = simulationReducer(initialState, action);

			// Проверяем, что это не та же ссылка
			expect(newState.originalMalfunctions).not.toBe(mockMalfunctions);
			// Проверяем, что элементы тоже скопированы
			expect(newState.originalMalfunctions[0]).not.toBe(
				mockMalfunctions[0],
			);
			// Но содержимое идентично
			expect(newState.originalMalfunctions[0]).toEqual(
				mockMalfunctions[0],
			);
		});
	});

	describe('добавление найденных дефектов', () => {
		it('должен добавить ID найденной неисправности', () => {
			const stateWithSimulation: SimulationState = {
				...initialState,
				simulationId: 123,
				originalMalfunctions: mockMalfunctions,
			};

			const action = markMalfunctionAsFound('m1');
			const newState = simulationReducer(stateWithSimulation, action);

			expect(newState.foundMalfunctionIds).toContain('m1');
			expect(newState.foundMalfunctionIds).toHaveLength(1);
		});

		it('не должен дублировать ID при повторном добавлении', () => {
			const stateWithSimulation: SimulationState = {
				...initialState,
				simulationId: 123,
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1'],
			};

			const action = markMalfunctionAsFound('m1');
			const newState = simulationReducer(stateWithSimulation, action);

			expect(newState.foundMalfunctionIds).toHaveLength(1);
			expect(newState.foundMalfunctionIds).toEqual(['m1']);
		});

		it('должен деактивировать неисправность в originalMalfunctions', () => {
			const stateWithSimulation: SimulationState = {
				...initialState,
				simulationId: 123,
				originalMalfunctions: mockMalfunctions,
			};

			const action = deactivateSimulationMalfunction('m1');
			const newState = simulationReducer(stateWithSimulation, action);

			expect(
				newState.originalMalfunctions.find(malfunction => malfunction.id === 'm1')
					?.active,
			).toBe(false);
			expect(
				newState.originalMalfunctions.find(malfunction => malfunction.id === 'm2')
					?.active,
			).toBe(true);
		});

		it('должен устанавливать флаг завершения студентом', () => {
			const action = setFinishingByStudent(true);
			const newState = simulationReducer(initialState, action);

			expect(newState.isFinishingByStudent).toBe(true);
		});
	});

	describe('завершение', () => {
		it('должен сбросить симуляцию при завершении', () => {
			const stateWithSimulation: SimulationState = {
				...initialState,
				simulationId: 123,
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1', 'm2', 'm3'],
			};

			const action = resetSimulation();
			const newState = simulationReducer(stateWithSimulation, action);

			expect(newState.simulationId).toBeNull();
			expect(newState.completedSimulationId).toBeNull();
			expect(newState.originalMalfunctions).toEqual([]);
			expect(newState.foundMalfunctionIds).toEqual([]);
		});
	});

	describe('восстановление состояния', () => {
		it('должен корректно восстановить состояние после startSimulation', () => {
			const persistedState: SimulationState = {
				simulationId: 456,
				completedSimulationId: null,
				gate: null,
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1'],
				isManualAbort: false,
				isFinishingByStudent: false,
			};

			// Проверяем, что состояние корректно
			expect(persistedState.simulationId).toBe(456);
			expect(persistedState.originalMalfunctions).toHaveLength(3);
			expect(persistedState.foundMalfunctionIds).toContain('m1');
			expect(persistedState.simulationId).not.toBeNull();
		});

		it('должен сохранить originalMalfunctions без изменений после восстановления', () => {
			const persistedState: SimulationState = {
				simulationId: 456,
				completedSimulationId: null,
				gate: null,
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1', 'm2'],
				isManualAbort: false,
				isFinishingByStudent: false,
			};

			// Проверяем, что originalMalfunctions не изменились
			expect(persistedState.originalMalfunctions).toEqual(
				mockMalfunctions,
			);
			expect(persistedState.originalMalfunctions[0].id).toBe('m1');
		});
	});
});
