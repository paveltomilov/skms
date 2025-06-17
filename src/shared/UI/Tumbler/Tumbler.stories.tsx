import type { Meta, StoryObj } from '@storybook/react';
import Switch from '.';
import { configureStore } from '@reduxjs/toolkit';
import circuitReducer, { setResistance } from '@/store/circuitSlice';
import { FC, useEffect } from 'react';
import { getInputCircuitBreakerState } from '@/shared/utils/getInputCircuitBreakerState/getInputCircuitBreakerState';
import {
	BASE_RESISTANCE,
	HIGH_RESISTANCE,
	INPUT_CIRCUIT_BREAKER_ID,
} from '@/shared/configs/scheme';
import { Provider } from 'react-redux';
import type { Decorator } from '@storybook/react';

const mockStore = configureStore({
	reducer: {
		circuit: circuitReducer,
	},
});

interface Prop {
	state: 'on' | 'off';
}

const meta: Meta<typeof Switch> = {
	title: 'Switch',
	component: Switch,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story, { args }) => {
			const { state } = args as Prop;
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
	argTypes: {
		state: {
			description: 'Состояния переключателя: on - вкл, off - выкл',
			options: ['on', 'off'],
			control: {
				type: 'radio',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
	args: {
		state: 'open',
	},
};
