import type { Meta, StoryObj } from '@storybook/react';
import Fire from '.';

const meta: Meta<typeof Fire> = {
	title: 'Icons/Fire',
	component: Fire,
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
