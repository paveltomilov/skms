import type { Meta, StoryObj } from '@storybook/react';
import Marker from '.';

const meta: Meta<typeof Marker> = {
	title: 'Marker',
	component: Marker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		text: {
			description: 'Маркировка кабеля (бирка)',
			options: [
				'A1',
				'A11',
				'A19',
				'A',
				'B',
				'C',
				'L1',
				'L2',
				'L3',
				'A13',
				'A21',
				'T1',
				'T2',
				'T3',
				'N',
			],
			control: {
				type: 'radio',
			},
		},

		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
			control: {
				type: 'text',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const A21: Story = {
	args: {
		text: 'A21',
	},
};
