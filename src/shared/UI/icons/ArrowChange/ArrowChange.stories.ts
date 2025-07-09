import type { Meta, StoryObj } from '@storybook/react';
import ArrowChange from '.';

const meta: Meta<typeof ArrowChange> = {
	title: 'Icons/ArrowChange',
	component: ArrowChange,
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
				'Поворот иконки: rotate90 - поворот на 90 градусов по часовой стрелке, rotateLeft90 - поворот на 90 градусов против часовой стрелки, rotate180 - поворот на 180 градусов, mirror - зеркальный поворот',
			options: ['rotate90', 'rotateLeft90', 'rotate180', 'mirror'],
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

export const ToTheLeft: Story = {};

export const ToTheRight: Story = {
	args: {
		transform: 'mirror',
	},
};

export const Disabled: Story = {
	args: {
		color: 'disabled',
	},
};
