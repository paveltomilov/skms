import type { Meta, StoryObj } from '@storybook/react';
import WindowRectCard from '.';

const meta: Meta<typeof WindowRectCard> = {
	title: 'WindowRectCard',
	component: WindowRectCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			description: 'Цвет емкости',
			options: ['blue', 'yellow', 'red'],
			control: {
				type: 'radio',
			},
		},
		size: {
			description: 'размер емкости',
			options: ['sm', 'lg'],
			control: {
				type: 'radio',
			},
		},
		title: {
			description: 'Название емкости',
			control: { type: 'text' },
		},
		value: {
			description: 'Значение в окошке',
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
		value: 70,
		maxValue: 100,
		title: 'ПВД-7',
	},
};

export const Large: Story = {
	args: {
		color: 'red',
		value: 20,
		maxValue: 100,
		title: 'ПВД-7',
		size: 'lg',
	},
};
