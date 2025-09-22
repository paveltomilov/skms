import type { Meta, StoryObj } from '@storybook/react';
import ScrewConnection from './index';
import { MarkerName } from '@/shared/types/markers';

const meta: Meta<typeof ScrewConnection> = {
	title: 'UI/ScrewConnection',
	component: ScrewConnection,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		isOpen: {
			description: 'Состояние винта: откручен / закручен',
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
		textLeft: {
			description: 'Подпись слева',
			options: ['A', 'B', 'N', 'C'] satisfies MarkerName[],
		},
		provodLocation: {
			description: 'Расположение провода',
			options: ['left', 'right', 'top', 'bottom'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	args: {
		isOpen: true,
		textTop: 'A',
		provodLocation: 'bottom',
	},
};

export const Close: Story = {
	args: {
		isOpen: false,
		textRight: 'N',
		provodLocation: 'top',
	},
};
