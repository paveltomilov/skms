import type { Meta, StoryObj } from '@storybook/react';
import Error from '.';

const meta: Meta<typeof Error> = {
	title: 'Icons/Error',
	component: Error,
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
