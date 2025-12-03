import type { Meta, StoryObj } from '@storybook/react';
import LampIndicator from '.';

const meta: Meta<typeof LampIndicator> = {
	title: 'LampIndicator',
	component: LampIndicator,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		color: {
			description:
				'Цвет верхней части лампы. Доступные значения: `lamp_white_off`, `lamp_white_on`, `lamp_green_off`, `lamp_green_on`.',
			options: [
				'lamp_white_off',
				'lamp_white_on',
				'lamp_green_off',
				'lamp_green_on',
			],
			control: { type: 'radio' },
		},
		className: {
			description:
				'Дополнительные классы для позиционирования или кастомного стайлинга.',
			control: false,
		},
		style: {
			description: 'Inline-стили для SVG-элемента.',
			control: false,
		},
	},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const WhiteActive: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_white_on',
	},
	parameters: {
		docs: {
			description: {
				story: 'Состояние: **Активна**.',
			},
		},
	},
};

export const WhiteInactive: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_white_off',
	},
	parameters: {
		docs: {
			description: {
				story: 'Состояние: **Отключена**.',
			},
		},
	},
};

export const GreenActive: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_green_on',
	},
	parameters: {
		docs: {
			description: {
				story: 'Состояние: **Активна**.',
			},
		},
	},
};

export const GreenInactive: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_green_off',
	},
	parameters: {
		docs: {
			description: {
				story: 'Состояние: **Неактивна**.',
			},
		},
	},
};
