import type { Meta, StoryObj } from '@storybook/react';
import Rectangle from '.';

const meta: Meta<typeof Rectangle> = {
	title: 'Icons/Rectangle',
	component: Rectangle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			description:
				'Цвета иконки: white - белый, green - зеленый, disabled - серый, electric_green - кислотно-зеленый',
			options: ['white', 'green', 'disabled', 'electric_green'],
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

export const Default: Story = {};

export const Outlined: Story = {
	args: {
		outlined: true,
	},
};

export const White: Story = {
	args: {
		color: 'white',
	},
};
