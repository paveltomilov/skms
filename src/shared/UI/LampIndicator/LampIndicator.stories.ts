import type { Meta, StoryObj } from '@storybook/react';
import LampIndicator from '.';

const meta: Meta<typeof LampIndicator> = {
	title: 'LampIndicator',
	component: LampIndicator,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		color: {
			description:
				'Цвет верхней части лампы: `white` — выкл, `lamp_green` — вкл, `red` — авария',
			options: ['white', 'lamp_green', 'red'],
			control: { type: 'radio' },
		},
		className: {
			description: 'Для передачи дополнительных стилей/позиционирования',
			control: false,
		},
		style: {
			description: 'Inline-стили контейнера SVG',
			control: false,
		},
	},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Green: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_green',
	},
	parameters: {
		docs: {
			description: {
				story: 'Лампа в состоянии **вкл**.',
			},
		},
	},
};

export const White: Story = {
	args: {
		type: 'lamp',
		color: 'white',
	},
	parameters: {
		docs: {
			description: {
				story: 'Лампа в состоянии **выкл**.',
			},
		},
	},
};

export const Red: Story = {
	args: {
		type: 'lamp',
		color: 'red',
	},
	parameters: {
		docs: {
			description: {
				story: 'Лампа в состоянии **авария**.',
			},
		},
	},
};
