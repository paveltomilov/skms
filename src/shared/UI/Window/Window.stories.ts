import type { Meta, StoryObj } from '@storybook/react';
import Window from '.';

const meta: Meta<typeof Window> = {
	title: 'Window',
	component: Window,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			description: 'Цвет окошка',
			options: ['blue', 'yellow', 'white'],
			control: {
				type: 'radio',
			},
		},
		value: {
			description: 'Значение в окошке',
			control: { type: 'text' },
		},
		textTop: {
			description: 'Текст сверху окошка',
			control: { type: 'text' },
		},
		textBottom: {
			description: 'Текст снизу окошка',
			control: { type: 'text' },
		},
		textLeft: {
			description: 'Текст слева окошка',
			control: { type: 'text' },
		},
		textRight: {
			description: 'Текст справа окошка',
			control: { type: 'text' },
		},
		colorText: {
			description: 'Цвет текста вне окошка(сверху, снизу, справа, слева)',
			options: ['black', 'white'],
			control: {
				type: 'radio',
			},
		},
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Yellow: Story = {
	args: {
		color: 'yellow',
		value: 0,
	},
};

export const TextTop: Story = {
	args: {
		textTop: 'текст сверху',
		value: 0,
		color: 'blue',
	},
};
