import type { Meta, StoryObj } from '@storybook/react';
import Provod from '.';

const meta: Meta<typeof Provod> = {
	title: 'Provod',
	component: Provod,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		rotate: {
			description: 'Расположение провода',
			options: [90, 180, 270],
			control: {
				type: 'radio',
			},
		},
		isBreak: {
			description: 'Наличие прерыва кабеля',
			control: {
				type: 'boolean',
			},
		},
		length: {
			description: 'Длина кабеля',
			control: {
				type: 'number',
			},
		},

		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
			control: {
				type: 'text',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		length: 101,
		isBreak: true,
	},
};
