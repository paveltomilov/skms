import type { Meta, StoryObj } from '@storybook/react';
import Triangle from '.';

const meta: Meta<typeof Triangle> = {
	title: 'Icons/Triangle',
	component: Triangle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			description:
				'Цвета иконки: green - зеленая заливка и темно-зеленый контур, grey - серая заливка и черный контур, black_white - челный контур и белая заливка, magenta_white - розовый контур и белая заливка',
			options: ['green', 'grey', 'black_white', 'magenta_white'],
			control: {
				type: 'radio',
			},
		},
		transform: {
			description:
				'Поворот иконки: rotate90 - поворот на 90 градусов по часовой стрелке, rotateLeft90 - поворот на 90 градусов против часовой стрелки, rotate180 - поворот на 180 градусов',
			options: ['rotate90', 'rotateLeft90', 'rotate180'],
			control: {
				type: 'radio',
			},
		},
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Green: Story = {};

export const Grey: Story = {
	args: {
		color: 'grey',
	},
};

export const BlackWhite: Story = {
	args: {
		color: 'black_white',
	},
};

export const MagentaWhite: Story = {
	args: {
		color: 'magenta_white',
	},
};

export const Rotated: Story = {
	args: {
		transform: 'rotate90',
	},
};
