import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '@/widgets/Sidebar';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import simulationReducer, {
	type SimulationState,
} from '@/store/simulationSlice';
import modalReducer, { type ModalState } from '@/store/modalSlice';
import gateReducer from '@/store/gateSlice';
import trainingReducer from '@/store/trainingSlice';
import circuitReducer from '@/store/circuitSlice';
import { Malfunction } from '@/shared/types/scheme';

// Мокаем зависимости
jest.mock('@/shared/hooks/useUserCookies', () => ({
	useUserCookies: () => ({
		firstName: 'Test',
		lastName: 'User',
		role: 'student',
	}),
}));

jest.mock('@/shared/UI/Toast', () => ({
	__esModule: true,
	default: ({ message }: { message: string }) => (
		<div data-testid="toast">{message}</div>
	),
}));

jest.mock('@/shared/UI/icons/Chevron', () => ({
	__esModule: true,
	default: () => <div data-testid="chevron">Chevron</div>,
}));

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
		[key: string]: unknown;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

const createMockStore = (
	simulationState: Partial<SimulationState>,
	modalState: Partial<ModalState> = {},
) => {
	return configureStore({
		reducer: {
			simulation: simulationReducer,
			modal: modalReducer,
			gate: gateReducer,
			training: trainingReducer,
			circuit: circuitReducer,
		},
		preloadedState: {
			simulation: simulationState as SimulationState,
			modal: {
				automatic: false,
				gateControl: false,
				diagnostic: false,
				gateValves: false,
				lamps: false,
				block_switches: false,
				starter: false,
				motor: false,
				fusible_insert: false,
				starter_coil: false,
				blocking_activation: false,
				button: false,
				input_circuit_breaker: false,
				clamp: false,
				notification: false,
				setSimulation: true,
				studentStatistics: false,
				studentCreate: false,
				studentDelete: false,
				note: false,
				simulationComplete: false,
				startSimulation: false,
				abortSimulation: false,
				...modalState,
			} as ModalState,
			gate: {
				gates: {},
				activeGateId: null,
			},
			circuit: circuitReducer(undefined, { type: 'unknown' }),
		},
	});
};

const renderWithStore = (store: ReturnType<typeof createMockStore>) => {
	const result = render(
		<Provider store={store}>
			<Sidebar />
		</Provider>,
	);
	// Открываем Sidebar, чтобы кнопка была видна
	const openButton = result.container.querySelector(
		'button[class*="openButton"]',
	);
	if (openButton) {
		fireEvent.click(openButton);
	}
	return result;
};

describe('handleFinishSimulation', () => {
	const mockMalfunctions: Malfunction[] = [
		{ id: 'm1', name: 'Неисправность 1', active: true },
		{ id: 'm2', name: 'Неисправность 2', active: true },
	];

	describe('полный набор → успех', () => {
		it('должен вызвать completeSimulation и openModal при полном решении', async () => {
			const store = createMockStore({
				simulationId: 'sim-123',
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1', 'm2'],
				isCompleted: false,
				isInitialized: true,
			});

			renderWithStore(store);

			const finishButton = screen.getByRole('button', {
				name: 'Завершить',
			});
			fireEvent.click(finishButton);

			await waitFor(() => {
				const state = store.getState();
				expect(state.simulation.isCompleted).toBe(true);
				expect(state.modal.simulationComplete).toBe(true);
			});

			// Кнопка должна быть заблокирована
			expect(finishButton).toBeDisabled();
		});

		it('не должен показывать toast при успешном завершении', async () => {
			const store = createMockStore({
				simulationId: 'sim-123',
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1', 'm2'],
				isCompleted: false,
				isInitialized: true,
			});

			renderWithStore(store);

			const finishButton = screen.getByRole('button', {
				name: 'Завершить',
			});
			fireEvent.click(finishButton);

			await waitFor(() => {
				// Toast не должен появиться при успешном завершении
				const toasts = screen.queryAllByTestId('toast');
				expect(toasts.length).toBe(0);
			});
		});
	});

	describe('неполный → попап', () => {
		it('должен открыть попап при неполном решении', async () => {
			const store = createMockStore({
				simulationId: 'sim-123',
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1'], // Найдена только одна из двух
				isCompleted: false,
				isInitialized: true,
			});

			renderWithStore(store);

			const finishButton = screen.getByRole('button', {
				name: 'Завершить',
			});
			fireEvent.click(finishButton);

			await waitFor(() => {
				const state = store.getState();
				expect(state.simulation.isCompleted).toBe(true);
				expect(state.modal.simulationComplete).toBe(true);
			});
		});

		it('кнопка остается заблокированной после клика', async () => {
			const store = createMockStore({
				simulationId: 'sim-123',
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1'],
				isCompleted: false,
				isInitialized: true,
			});

			renderWithStore(store);

			const finishButton = screen.getByRole('button', {
				name: 'Завершить',
			});
			fireEvent.click(finishButton);

			// Кнопка должна быть заблокирована после клика
			expect(finishButton).toBeDisabled();
		});

		it('должен вызывать completeSimulation при любом решении', async () => {
			const store = createMockStore({
				simulationId: 'sim-123',
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1'],
				isCompleted: false,
				isInitialized: true,
			});

			renderWithStore(store);

			const finishButton = screen.getByRole('button', {
				name: 'Завершить',
			});
			fireEvent.click(finishButton);

			await waitFor(() => {
				const state = store.getState();
				expect(state.simulation.isCompleted).toBe(true);
				expect(state.modal.simulationComplete).toBe(true);
			});
		});
	});

	describe('блокировка кнопки', () => {
		it('должен заблокировать кнопку после клика', () => {
			const store = createMockStore({
				simulationId: 'sim-123',
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: ['m1', 'm2'],
				isCompleted: false,
				isInitialized: true,
			});

			renderWithStore(store);

			const finishButton = screen.getByRole('button', {
				name: 'Завершить',
			});
			expect(finishButton).not.toBeDisabled();

			fireEvent.click(finishButton);

			expect(finishButton).toBeDisabled();
		});

		it('должен заблокировать кнопку, если симуляция не инициализирована', () => {
			const store = createMockStore({
				simulationId: null,
				originalMalfunctions: [],
				foundMalfunctionIds: [],
				isCompleted: false,
				isInitialized: false,
			});

			renderWithStore(store);

			const finishButton = screen.getByRole('button', {
				name: 'Завершить',
			});

			// Кнопка должна быть заблокирована, когда симуляция не инициализирована
			expect(finishButton).toBeDisabled();

			// Состояние не должно измениться, так как обработчик не вызывается для заблокированной кнопки
			const state = store.getState();
			expect(state.simulation.isCompleted).toBe(false);
			expect(state.modal.simulationComplete).toBe(false);
		});

		it('должен открыть попап, даже если не найдено ни одной неисправности', async () => {
			const store = createMockStore({
				simulationId: 'sim-123',
				originalMalfunctions: mockMalfunctions,
				foundMalfunctionIds: [],
				isCompleted: false,
				isInitialized: true,
			});

			renderWithStore(store);

			const finishButton = screen.getByRole('button', {
				name: 'Завершить',
			});
			fireEvent.click(finishButton);

			await waitFor(() => {
				const state = store.getState();
				expect(state.simulation.isCompleted).toBe(true);
				expect(state.modal.simulationComplete).toBe(true);
			});
		});
	});
});
