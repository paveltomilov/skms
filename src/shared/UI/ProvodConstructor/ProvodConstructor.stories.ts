import type { Meta, StoryObj } from '@storybook/react';
import ProvodConstructor from '.';

const meta: Meta<typeof ProvodConstructor> = {
	title: 'ProvodConstructor',
	component: ProvodConstructor,
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
		turn_A: {
			description: 'Расположение изгиба провода A',
			options: ['90', '180', '270', '0', false],
			control: {
				type: 'radio',
			},
		},
		turn_B: {
			description: 'Расположение изгиба провода B',
			options: ['90', '180', '270', '0', false],
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
		isBreak_end: {
			description: 'Наличие прерыва кабеля в конце',
			control: {
				type: 'boolean',
			},
		},
		provod_A: {
			description:
				'При указании длины кабеля А, будет отабражен кабель А в соответствии с переданными значениями',
			control: {
				type: 'number',
			},
		},
		provod_B: {
			description:
				'При указании длины кабеля В, будет отабражен кабель В в соответствии с переданными значениями',
			control: {
				type: 'number',
			},
		},
		provod_C: {
			description:
				'При указании длины кабеля С, будет отабражен кабель С в соответствии с переданными значениями',
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
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		turn_A: '180',
		turn_B: '90',
		provod_B: 86,
	},
};
