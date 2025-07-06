import { Meta, type StoryObj } from '@storybook/react';
import { Automatic } from '@/widgets/Automatic/index';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import circuitReducer from '@/store/circuitSlice';
import gateReducer from '@/store/gateSlice';

const mockStore = configureStore({
	reducer: {
		circuit: circuitReducer,
		gate: gateReducer,
	},
});

const meta: Meta<typeof Automatic> = {
	title: 'Automatic',
	component: Automatic,
	decorators: [
		(Story, { args }) => {
			const StoreUpdater: React.FC = () => <Story />;

			return (
				<Provider store={mockStore}>
					<StoreUpdater />
				</Provider>
			);
		},
	],
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

type CoverProps = {
	children: React.ReactNode;
};

/** Обёртка для позиционирования компонента */
const PositionContainer = ({ children }: CoverProps) =>
	<div style={{
		padding: '4px 10px'
	}}>{children}</div>;

export const Default: Story = {
	args: {
		id: 'default-automatic',
		name: 'default',
	},
	render: (args) =>
		<PositionContainer><Automatic /></PositionContainer>,
};