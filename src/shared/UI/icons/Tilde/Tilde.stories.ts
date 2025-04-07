import type { Meta, StoryObj } from '@storybook/react';
import Tilde from '.';

const meta: Meta<typeof Tilde> = {
	title: 'Icons/Tilde',
	component: Tilde,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Размеры иконки: sm - 20x20 px, md - 26x26 px',
			options: ['sm', 'md'],
			control: {
				type: 'radio',
			},
		},
		color: {
			description: 'Цвета иконки: white - белый, green - зеленый',
			options: ['white', 'green'],
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
		size: 'md',
	},
};

export const Disabled: Story = {
	args: {
		disable: true,
	},
};

export const White: Story = {
	args: {
		color: 'white',
	},
};
