import type { Meta, StoryObj } from '@storybook/react';
import Pump from '.';

const meta: Meta<typeof Pump> = {
	title: 'Icons/Pump',
	component: Pump,
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

export const Default: Story = {};

export const Second: Story = {
	args: {
		second: true,
	},
};
