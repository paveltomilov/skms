import { Meta, StoryObj } from '@storybook/react';
import ShapeComponent from '.';

const meta: Meta<typeof ShapeComponent> = {
	title: 'Icons/ShapeComponent',
	component: ShapeComponent,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		text: {
			control: 'text',
			description: 'Текст внутри формы',
		},
		className: {
			control: 'text',
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
		trapezoidColor: {
			control: 'color',
			description: 'Цвет трапеции/прямоугольника',
		},
		textColor: {
			control: 'color',
			description: 'Цвет текста внутри формы',
		},
		shape: {
			control: 'radio',
			options: ['trapezoid', 'rectangle'],
			description: 'Тип формы (трапеция или прямоугольник)',
		},
		width: {
			control: { type: 'number', min: 20, max: 300, step: 5 },
			description: 'Ширина формы',
		},
		height: {
			control: { type: 'number', min: 10, max: 200, step: 5 },
			description: 'Высота формы',
		},
	},
};

export default meta;

type Story = StoryObj<typeof ShapeComponent>;

export const Default: Story = {
	args: {
		text: 'БСУ',
		className: 'trapezoid-container',
		trapezoidColor: '#8A8A8A',
		textColor: 'white',
		shape: 'trapezoid',
		width: 72,
		height: 32,
	},
};

export const CustomText: Story = {
	args: {
		text: 'ПСУ',
		className: 'custom-trapezoid',
		trapezoidColor: '#4A90E2',
		textColor: '#F0F0F0',
		shape: 'rectangle',
		width: 120,
		height: 40,
	},
};
