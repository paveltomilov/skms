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
			description: 'единицы измерения сверху окошка',
			options: [
				'°С',
				'МПа',
				'кПа',
				'т/ч',
				'об.мин',
				'А',
				'мм',
				'%',
				'мг/м3',
				'Гкал/ч',
			],
			control: {
				type: 'radio',
			},
		},
		textBottom: {
			description: 'единицы измерения снизу окошка',
			options: [
				'°С',
				'МПа',
				'кПа',
				'т/ч',
				'об.мин',
				'А',
				'мм',
				'%',
				'мг/м3',
				'Гкал/ч',
			],
			control: {
				type: 'radio',
			},
		},
		textLeft: {
			description: 'единицы измерения слева окошка',
			options: [
				'°С',
				'МПа',
				'кПа',
				'т/ч',
				'об.мин',
				'А',
				'мм',
				'%',
				'мг/м3',
				'Гкал/ч',
			],
			control: {
				type: 'radio',
			},
		},
		textRight: {
			description: 'единицы измерения справа окошка',
			options: [
				'°С',
				'МПа',
				'кПа',
				'т/ч',
				'об.мин',
				'А',
				'мм',
				'%',
				'мг/м3',
				'Гкал/ч',
			],
			control: {
				type: 'radio',
			},
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
