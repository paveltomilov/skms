import type { Meta, StoryObj } from '@storybook/react';
import Screw from '.';

const meta: Meta<typeof Screw> = {
	title: 'Icons/Screw',
	component: Screw,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		isOpen: {
			description: 'Соостояние винта откручен/закручен',
			control: {
				type: 'boolean',
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

export const Open: Story = {
	args: {
		isOpen: true,
	},
};

export const Close: Story = {
	args: {
		isOpen: '',
	},
};
