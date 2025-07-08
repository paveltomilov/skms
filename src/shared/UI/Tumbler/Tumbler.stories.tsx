import type { Meta, StoryObj } from '@storybook/react';
import Tumbler from '.';
import { configureStore } from '@reduxjs/toolkit';
import circuitReducer from '@/store/circuitSlice';
import { Provider } from 'react-redux';
import { FC } from 'react';

const mockStore = configureStore({
	reducer: {
		circuit: circuitReducer,
	},
});

const meta: Meta<typeof Tumbler> = {
	title: 'Tumbler',
	component: Tumbler,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		Story => {
			const StoreUpdater: FC = () => <Story />;

			return (
				<Provider store={mockStore}>
					<StoreUpdater />
				</Provider>
			);
		},
	],
	argTypes: {
		mode: {
			description: 'Режимы тумблера: on - вкл, off - выкл',
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
		mode: 'on',
	},
};

export const Off: Story = {
	args: {
		mode: 'off',
	},
};
