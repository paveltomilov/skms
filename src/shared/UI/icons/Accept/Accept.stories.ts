import type { Meta, StoryObj } from '@storybook/react';
import Accept from '.';

const meta: Meta<typeof Accept> = {
	title: 'Icons/Accept',
	component: Accept,
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
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
	args: {
		size: 'xs',
		color: 'default',
	},
};

export const Large: Story = {
	args: {
		size: 'sm',
		color: 'default',
	},
};

export const Disabled: Story = {
	args: {
		size: 'sm',
		color: 'disabled',
	},
};
