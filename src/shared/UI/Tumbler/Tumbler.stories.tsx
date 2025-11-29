import type { Meta, StoryObj } from '@storybook/react';
import Switch from '.';
import { configureStore } from '@reduxjs/toolkit';
import circuitReducer, { setResistance } from '@/store/circuitSlice';
import { FC, useEffect } from 'react';
import { getInputCircuitBreakerState } from '@/shared/utils/getInputCircuitBreakerState/getInputCircuitBreakerState';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';
import { INPUT_CIRCUIT_BREAKER_ID } from '@/shared/configs/powerCircuit/constants';
import { HIGH_RESISTANCE } from '@/shared/configs/elementKind';
import { Provider } from 'react-redux';

interface SwitchProps {
	mode: 'open' | 'close';
}

const mockStore = configureStore({
	reducer: {
		circuit: circuitReducer,
	},
});

const meta: Meta<typeof Switch> = {
	title: 'Switch',
	component: Switch,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story, { context }) => {
			const { state } = context.parameters as { state: 'on' | 'off' };
			const StoreUpdater: FC = () => {
				const mode = getInputCircuitBreakerState();

				useEffect(() => {
					if (state === 'on' && state !== mode) {
						for (const id of INPUT_CIRCUIT_BREAKER_ID) {
							mockStore.dispatch(
								setResistance({
									id,
									value: BASE_RESISTANCE[id],
								}),
							);
						}
					} else if (state === 'off' && state !== mode) {
						for (const id of INPUT_CIRCUIT_BREAKER_ID) {
							mockStore.dispatch(
								setResistance({
									id,
									value: HIGH_RESISTANCE,
								}),
							);
						}
					}
				}, [mode, state]);

				return <Story />;
			};

			return (
				<Provider store={mockStore}>
					<StoreUpdater />
				</Provider>
			);
		},
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
	parameters: {
		state: 'on',
	},
};

export const Off: Story = {
	args: {
		state: 'off',
	},
};
