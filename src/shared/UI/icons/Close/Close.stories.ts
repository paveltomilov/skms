import type { Meta, StoryObj } from '@storybook/react';
import Close from '.';

const meta: Meta<typeof Close> = {
	title: 'Icons/Close',
	component: Close,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Размеры иконки: sm - 20x20 px, lg - 28x28 px',
			options: ['sm', 'lg'],
			control: {
				type: 'radio',
			},
		},
		color: {
			description:
				'Цвета иконки: default - черный, disabled - серый, red - красный ',
			options: ['default', 'disabled', 'red'],
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
		size: 'lg',
	},
};

export const Disabled: Story = {
	args: {
		color: 'disabled',
	},
};
