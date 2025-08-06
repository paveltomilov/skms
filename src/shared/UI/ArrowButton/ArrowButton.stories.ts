import type { Meta, StoryObj } from '@storybook/react';
import ArrowButton from '.';

const meta: Meta<typeof ArrowButton> = {
	title: 'ArrowButton',
	component: ArrowButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		state: {
			description:
				'Состояния: выкл - белый, вкл - зеленый, нет питания - серый',
			options: ['on', 'off', 'no power'],
			control: {
				type: 'radio',
			},
		},
		disable: {
			description: 'Запрет управления',
			control: { type: 'boolean' },
		},
		transform: {
			description:
				'Поворот иконки: rotate90 - поворот на 90 градусов по часовой стрелке, rotateLeft90 - поворот на 90 градусов против часовой стрелки, rotate180 - поворот на 180 градусов',
			options: ['rotate90', 'rotateLeft90', 'rotate180'],
			control: {
				type: 'radio',
			},
		},
		textTop: {
			description: 'Текст сверху исполнительного механизма',
			control: { type: 'text' },
		},
		textTopLeft: {
			description: 'Текст в верхнем левом углу исполнительного механизма',
			control: { type: 'text' },
		},
		textTopRight: {
			description:
				'Текст в верхнем правом углу исполнительного механизма',
			control: { type: 'text' },
		},
		textBottom: {
			description: 'Текст снизу исполнительного механизма',
			control: { type: 'text' },
		},
		textBottomLeft: {
			description: 'Текст в нижнем левом углу исполнительного механизма',
			control: { type: 'text' },
		},
		textBottomRight: {
			description: 'Текст в нижнем правом углу исполнительного механизма',
			control: { type: 'text' },
		},
		textLeft: {
			description: 'Текст слева исполнительного механизма',
			control: { type: 'text' },
		},
		textRight: {
			description: 'Текст справа исполнительного механизма',
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
