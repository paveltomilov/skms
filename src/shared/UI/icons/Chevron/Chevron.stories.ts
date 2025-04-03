import type { Meta, StoryObj } from '@storybook/react';
import Chevron from '.';

const meta: Meta<typeof Chevron> = {
	title: 'Icons/Chevron',
	component: Chevron,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Размеры иконки: xs - 16x16 px, sm - 20x20 px',
			options: ['xs', 'sm'],
			control: {
				type: 'radio',
			},
		},
		color: {
			description: 'Цвета иконки: default - черный, disabled - серый',
			options: ['default', 'disabled'],
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

export const Small: Story = {};

export const Large: Story = {
	args: {
		size: 'sm',
	},
};

export const Disabled: Story = {
	args: {
		color: 'disabled',
	},
};
