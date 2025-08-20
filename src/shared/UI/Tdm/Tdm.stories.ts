import type { Meta, StoryObj } from '@storybook/react';
import Tdm from '.';

const meta: Meta<typeof Tdm> = {
	title: 'Tdm',
	component: Tdm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		direction: {
			description: 'направление ТДМ',
			options: ['toRight', 'toLeft'],
			control: {
				type: 'radio',
			},
		},
		state: {
			description: 'состояние ТДМ',
			options: ['on', 'off'],
			control: {
				type: 'radio',
			},
		},
		title: {
			description: 'название ТДМ',
			control: { type: 'text' },
		},
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Second: Story = {
	args: {
		second: true,
	},
};
