import type { Meta, StoryObj } from '@storybook/react';
import Screw from '.';
import { MarkerName } from '@/shared/types/markers';

const meta: Meta<typeof Screw> = {
	title: 'Icons/Screw',
	component: Screw,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		isOpen: {
			description: 'Состояние винта: откручен / закручен',
			control: { type: 'boolean' },
		},
		className: {
			description:
				'Для передачи дополнительных стилей (например, позиционирование)',
			control: { type: 'text' },
		},
		textTop: {
			description: 'Подпись сверху',
			options: ['A', 'B', 'N', 'C'] satisfies MarkerName[],
		},
		textRight: {
			description: 'Подпись справа',
			options: ['A', 'B', 'N', 'C'] satisfies MarkerName[],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	args: {
		isOpen: true,
		textTop: 'A',
	},
};

export const Close: Story = {
	args: {
		isOpen: false,
		textRight: 'N',
	},
};
