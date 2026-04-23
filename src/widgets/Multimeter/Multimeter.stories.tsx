import type { Meta, StoryObj } from '@storybook/react';
import Multimeter from '.';
import { configureStore } from '@reduxjs/toolkit';
import multimeterReducer, {
	setCurrentMode,
	setMeasurementResult,
} from '@/store/multimeterSlice';
import { Provider } from 'react-redux';
import { MultimeterMode } from '@/shared/types/multimeter';
import { useEffect } from 'react';
import pointsReducer from '@/store/pointsSlice';
import { MULTIMETER_MODE_IDS } from '@/shared/configs/multimeterModes';

const mockStore = configureStore({
	reducer: {
		multimeter: multimeterReducer,
		points: pointsReducer,
	},
});

interface Prop {
	displayValue: number | null;
	currentMode: MultimeterMode;
}

const meta: Meta<typeof Multimeter> = {
	title: 'Multimeter',
	component: Multimeter,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],

	decorators: [
		(Story, { args }) => {
			const StoreUpdater: React.FC<Prop> = ({
				displayValue,
				currentMode,
			}) => {
				const dispatch = mockStore.dispatch;

				useEffect(() => {
					dispatch(setCurrentMode(currentMode));
				}, [currentMode, dispatch]);

				useEffect(() => {
					dispatch(setMeasurementResult(displayValue));
				}, [displayValue, dispatch]);

				return <Story />;
			};

			return (
				<Provider store={mockStore}>
					<StoreUpdater {...(args as Prop)} />
				</Provider>
			);
		},
	],

	argTypes: {
		displayValue: {
			control: 'text',
			defaultValue: null,
			description: 'Результаты измерения выводятся на дисплей',
		},
		currentMode: {
			control: 'radio',
			defaultValue: 'OFF',
			description: `Режимы мультиметра: OFF - выключен, 
				ACV - alternating current voltage (напряжение переменного тока), 
				DCA - direct current amperage (сила постоянного тока),
				HFE - тестирование транзисторов,
				DIODE -  проверка диодов,
				OHM - сопротивление,
				DCV - direct current voltage (напряжение постоянного тока)`,
			options: MULTIMETER_MODE_IDS,
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		displayValue: null,
		currentMode: 'OFF',
	},
};
