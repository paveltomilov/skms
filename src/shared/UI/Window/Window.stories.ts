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
		top: {
			description:
				'Булевое значения для отображения текста сверху окошка',
			control: {
				type: 'boolean',
			},
		},
		bottom: {
			description: 'Булевое значения для отображения текста снизу окошка',
			control: {
				type: 'boolean',
			},
		},
		left: {
			description: 'Булевое значения для отображения текста слева окошка',
			control: {
				type: 'boolean',
			},
		},
		right: {
			description:
				'Булевое значения для отображения текста справа окошка',
			control: {
				type: 'boolean',
			},
		},
		color: {
			description: 'Цвет окошка',
			options: ['blue', 'yellow', 'transparent'],
			control: {
				type: 'radio',
			},
		},
		data: {
			description: 'Данные передоваемые компоненту',
			control: { type: 'object' },
		},
		textTop: {
			description: 'единицы измерения или подписи сверху окошка',
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
			description: 'единицы измерения или подписи снизу окошка',
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
			description: 'единицы измерения или подписи слева окошка',
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
			description: 'единицы измерения или подписи справа окошка',
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
			control: {
				type: 'text',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Yellow: Story = {
	args: {
		color: 'yellow',
		right: 'true',
		data: {
			currentValue: 0,
			minValue: 100,
			maxValue: 0,
			unitsMeasurement: 'А',
		},
	},
};

export const TextTop: Story = {
	args: {
		top: 'true',
		textTop: 'текст сверху',
		data: {
			currentValue: 7.7,
			minValue: 100,
			maxValue: 0,
			unitsMeasurement: 'А',
		},
		color: 'blue',
	},
};

export const BlueWithAllTexts: Story = {
	args: {
		top: true,
		bottom: true,
		left: true,
		right: true,
		textTop: 'Температура',
		textBottom: 'Давление',
		textLeft: 'Вход',
		data: {
			currentValue: 25.5,
			minValue: -10,
			maxValue: 50,
			unitsMeasurement: '°С',
		},
		color: 'blue',
		colorText: 'white',
	},
};
