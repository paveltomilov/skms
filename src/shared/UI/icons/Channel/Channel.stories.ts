import type { Meta, StoryObj } from '@storybook/react';
import Channel from '.';

const meta: Meta<typeof Channel> = {
	title: 'Icons/Channel',
	component: Channel,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
		size: {
			description: 'Размер иконки',
			options: ['ls', 'md'],
			control: {
				type: 'radio',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LS: Story = {
	args: {
		size: 'ls',
	},
};

export const MD: Story = {
	args: {
		size: 'md',
	},
};
