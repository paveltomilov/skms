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
import { useAppSelector } from '@/shared/hooks/store';

const mockStore = configureStore({
	reducer: {
		multimeter: multimeterReducer,
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
			const { displayValue, currentMode } = args as Prop;

			const StoreUpdater: React.FC = () => {
				const state = useAppSelector(state => state.multimeter);

				useEffect(() => {
					if (state.displayValue !== displayValue) {
						mockStore.dispatch(setMeasurementResult(displayValue));
					}

					if (state.currentMode !== currentMode) {
						mockStore.dispatch(setCurrentMode(currentMode));
					}
				}, [displayValue, currentMode]);

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
		displayValue: {
			control: 'text',
			defaultValue: '0.00',
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
			options: [
				'OFF',
				'ACV_750',
				'ACV_200',
				'DCA_200u',
				'DCA_2000u',
				'DCA_20m',
				'DCA_200m',
				'DCA_10A',
				'HFE',
				'DIODE',
				'OHM_2000k',
				'OHM_200k',
				'OHM_20k',
				'OHM_2000',
				'OHM_200',
				'DCV_1000',
				'DCV_200',
				'DCV_20',
				'DCV_2000m',
				'DCV_200m',
			],
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
