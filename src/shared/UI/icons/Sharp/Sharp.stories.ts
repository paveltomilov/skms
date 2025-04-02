import type { Meta, StoryObj } from '@storybook/react';
import Sharp from '.';

const meta: Meta<typeof Sharp> = {
	title: 'Icons/Sharp',
	component: Sharp,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
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

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		color: 'disabled',
	},
};
