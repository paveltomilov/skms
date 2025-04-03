import type { Meta, StoryObj } from '@storybook/react';
import Side from '.';

const meta: Meta<typeof Side> = {
	title: 'Icons/Side',
	component: Side,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			description: 'Цвета иконки: default - черный, disabled - серый',
			options: ['default', 'disabled'],
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

export const ToTheRight: Story = {};

export const ToTheLeft: Story = {
	args: {
		transform: 'rotate180',
	},
};

export const Disabled: Story = {
	args: {
		color: 'disabled',
	},
};
