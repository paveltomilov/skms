import type { Meta, StoryObj } from '@storybook/react';
import ProvodLine from './index';

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
		isPin: {
			description: 'Нужно ли контактное кольцо',
			control: {
				type: 'boolean',
			},
		},
		rotate: {
			description: 'Поворт компонета',
			options: [90, 180, 270, 0],
			control: {
				type: 'radio',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		length: 20,
		isPin: true,
	},
};
