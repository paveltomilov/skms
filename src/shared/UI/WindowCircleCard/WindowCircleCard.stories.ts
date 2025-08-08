import type { Meta, StoryObj } from '@storybook/react';
import WindowCircleCard from '.';

const meta: Meta<typeof WindowCircleCard> = {
	title: 'WindowCircleCard',
	component: WindowCircleCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			description: 'Цвет емкости',
			options: ['blue', 'yellow'],
			control: {
				type: 'radio',
			},
		},
		value1: {
			description: 'Значение в верхнем окошке',
			control: { type: 'number' },
		},
		value2: {
			description: 'Значение в нижнем окошке',
			control: { type: 'number' },
		},
		minValue: {
			description: 'Минимальное значение в окошке',
			control: { type: 'number' },
		},
		maxValue: {
			description: 'Максимальное значение в окошке',
			control: { type: 'number' },
		},
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Yellow: Story = {
	args: {
		color: 'yellow',
		value1: 10,
		value2: 70,
	},
};

export const Blue: Story = {
	args: {
		color: 'blue',
		value1: 10,
		value2: 70,
	},
};
