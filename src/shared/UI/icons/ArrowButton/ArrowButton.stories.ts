import type { Meta, StoryObj } from '@storybook/react';
import ArrowButton from '.';

const meta: Meta<typeof ArrowButton> = {
	title: 'Icons/ArrowButton',
	component: ArrowButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			description: 'Цвета иконки: white - белый, green - зеленый',
			options: ['white', 'green'],
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

export const White: Story = {
	args: {
		color: 'white',
	},
};

export const Disabled: Story = {
	args: {
		color: 'white',
		disable: true,
	},
};
