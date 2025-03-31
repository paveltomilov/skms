import type { Meta, StoryObj } from '@storybook/react';
import Arrow from '.';

const meta: Meta<typeof Arrow> = {
	title: 'Icons/Arrow',
	component: Arrow,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			description:
				'Тип иконки: filled - закрашенная, outlined - обведенная, chevron_color - угловая скобка',
			options: ['filled', 'outlined', 'chevron_color'],
			control: {
				type: 'radio',
			},
		},
		color: {
			description:
				'Цвета иконки: default - черный, magenta - розовый, red - красный, orange - оранжевый, green - зеленый, electric_green - зеленый (кислотный), dark_green - темно-зеленый',
			options: [
				'default',
				'magenta',
				'red',
				'orange',
				'blue',
				'green',
				'electric_green',
				'dark_green',
			],
			control: {
				type: 'radio',
			},
		},
		transform: {
			description:
				'Поворот иконки: rotate90 - поворот на 90 градусов по часовой стрелке, rotateLeft90 - поворот на 90 градусов против часовой стрелки, rotate180 - поворот на 180 градусов',
			options: ['rotate90', 'rotateLeft90', 'rotate180'],
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

export const Filled: Story = {
	args: {
		color: 'magenta',
	},
};

export const Outlined: Story = {
	args: {
		type: 'outlined',
		color: 'orange',
	},
};

export const Chevron: Story = {
	args: {
		type: 'chevron_color',
		color: 'red',
	},
};
