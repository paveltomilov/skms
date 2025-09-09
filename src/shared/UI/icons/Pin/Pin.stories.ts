import type { Meta, StoryObj } from '@storybook/react';
import Pin from '.';

const meta: Meta<typeof Pin> = {
	title: 'Icons/Pin',
	component: Pin,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
