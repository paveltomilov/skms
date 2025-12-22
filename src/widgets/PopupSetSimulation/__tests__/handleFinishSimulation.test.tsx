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
				notification: false,
				setSimulation: true,
				studentStatistics: false,
				studentCreate: false,
				studentDelete: false,
				note: false,
				infoStartSimulation: false,
				infoUnfinished: false,
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

describe('SimulationControl', () => {
	describe('кнопка "Задвижка исправна"', () => {
		it('должен открыть модалку infoUnfinished при клике', async () => {
			const store = createMockStore({
				simulationId: 123,
				originalMalfunctions: [],
				foundMalfunctionIds: [],
			});

			renderWithStore(store);

			const button = screen.getByRole('button', {
				name: 'Задвижка исправна',
			});
			fireEvent.click(button);

			await waitFor(() => {
				const state = store.getState();
				expect(state.modal.infoUnfinished).toBe(true);
			});
		});

		it('кнопка должна быть доступна, когда симуляция инициализирована', () => {
			const store = createMockStore({
				simulationId: 123,
				originalMalfunctions: [],
				foundMalfunctionIds: [],
			});

			renderWithStore(store);

			const button = screen.getByRole('button', {
				name: 'Задвижка исправна',
			});

			expect(button).not.toBeDisabled();
		});

		it('кнопка должна быть доступна, когда симуляция не инициализирована', () => {
			const store = createMockStore({
				simulationId: null,
				originalMalfunctions: [],
				foundMalfunctionIds: [],
			});

			renderWithStore(store);

			const button = screen.getByRole('button', {
				name: 'Задвижка исправна',
			});

			expect(button).not.toBeDisabled();
		});
	});
});
