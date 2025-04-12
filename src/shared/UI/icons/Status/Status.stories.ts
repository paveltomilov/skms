import type { Meta, StoryObj } from '@storybook/react';
import Status from '.';

const meta: Meta<typeof Status> = {
	title: 'Icons/Status',
	component: Status,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			description:
				'Тип иконки: longWave - длинная волна, shortWave - короткая волна, crash - авария',
			options: ['longWave', 'shortWave', 'crash'],
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

export const LongWave: Story = {};

export const ShortWave: Story = {
	args: {
		type: 'shortWave',
	},
};

export const Crash: Story = {
	args: {
		type: 'crash',
	},
};

export const Colored: Story = {
	args: {
		color: 'magenta',
	},
};
