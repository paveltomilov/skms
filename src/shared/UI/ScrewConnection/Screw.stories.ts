import type { Meta, StoryObj } from '@storybook/react';
import { MarkerName } from '@/shared/types/markers';
import ScrewConnectionPlayground from './ScrewConnectionPlayground';

const meta: Meta<typeof ScrewConnectionPlayground> = {
	title: 'ScrewConnection',
	component: ScrewConnectionPlayground,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		screwStatus: {
			description: 'Состояние винта: откручен / закручен',
			options: ['close', 'open'],
		},
		className: {
			description:
				'Для передачи дополнительных стилей (например, позиционирование)',
			control: { type: 'text' },
			table: {
				disable: true, // Полностью скрывает из Controls
			},
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
		pointId: {
			description: 'Идентификатор точки на схеме',
			type: 'string',
			table: {
				disable: true, // Полностью скрывает из Controls
			},
		},
		provodLocation: {
			description: 'Сторона подключенрия провода',
			options: ['left', 'top', 'right', 'bottom'],
		},
		onToggle: {
			table: {
				disable: true, // Полностью скрывает из Controls
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	args: {
		screwStatus: 'open',
		textTop: 'A',
	},
};

export const Close: Story = {
	args: {
		screwStatus: 'close',
		textRight: 'N',
	},
};
