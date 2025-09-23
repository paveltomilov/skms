import type { Meta, StoryObj } from '@storybook/react';
import Provod from '.';
import { MarkerName } from '@/shared/types/markers';

const meta: Meta<typeof Provod> = {
	title: 'Provod',
	component: Provod,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		rotate: {
			description: 'Расположение провода',
			options: [90, 180, 270, 0],
			control: {
				type: 'radio',
			},
		},
		isBreak: {
			description: 'Наличие прерыва кабеля',
			control: {
				type: 'boolean',
			},
		},
		length: {
			description: 'Длина кабеля',
			control: {
				type: 'number',
			},
		},

		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
			control: {
				type: 'text',
			},
		},
		marker: {
			description: 'Задаем значанени указанные на бирки кабеля',
			options: ['A', 'B', 'N', 'C'] satisfies MarkerName[],
			control: {
				type: 'radio'
			}
		}
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		length: 101,
		isBreak: true,
	},
};
