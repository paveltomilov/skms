import type { Meta, StoryObj } from '@storybook/react';
import ProvodLine from '.';

const meta: Meta<typeof ProvodLine> = {
	title: 'Icons/ProvodLine',
	component: ProvodLine,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
		length: {
			description: 'Длина провода в px',
			control: {
				type: 'number',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		length: 111,
	},
};
