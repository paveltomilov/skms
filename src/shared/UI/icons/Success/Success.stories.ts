import type { Meta, StoryObj } from '@storybook/react';
import Success from '.';

const meta: Meta<typeof Success> = {
	title: 'Icons/Success',
	component: Success,
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
