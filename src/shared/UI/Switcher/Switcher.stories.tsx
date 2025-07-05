import { Meta, type StoryObj } from '@storybook/react';
import Switcher from './index';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import circuitReducer from '@/store/circuitSlice';
import { SwitchMode } from '@/shared/types/switch';

const mockStore = configureStore({
	reducer: {
		circuit: circuitReducer,
	},
});

const meta: Meta<typeof Switcher> = {
	title: 'Switcher',
	component: Switcher,
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
	argTypes: {
		mode: {
			description: 'Варианты переключения',
			options: ['on', 'off'],
			control: {
				type: 'radio',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

type CoverProps = {
	children: React.ReactNode;
};

/** Обёртка для позиционирования компонента */
const PositionContainer = ({ children }: CoverProps) => <div style={{
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	position: 'relative',
	padding: '19px 0 0 111px',
}}>{children}</div>;

export const Default: Story = {
	args: {
		id: 'default-switcher',
		name: 'default',
	},
	render: (args) =>
		<PositionContainer>
			<Switcher mode={args.mode} />
		</PositionContainer>,
};

export const OnSwitcher: Story = {
	args: {
		id: 'default-switcher',
		name: 'default',
		mode: 'on',
	},
	render: (args) =>
		<PositionContainer>
			<Switcher mode={args.mode} />
		</PositionContainer>,
};

export const OffSwitcher: Story = {
	args: {
		id: 'default-switcher',
		name: 'default',
		mode: 'off',
	},
	render: (args) =>
		<PositionContainer>
			<Switcher mode={args.mode} />
		</PositionContainer>,
};