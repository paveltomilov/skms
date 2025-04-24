import type { Meta, StoryObj } from '@storybook/react';
import SchemeIcon from '.';

const meta: Meta<typeof SchemeIcon> = {
	title: 'Icons/SchemeIcon',
	component: SchemeIcon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			description:
				'Тип элемента схемы: (позже добавить осмысленные названия)',
			options: ['yb08', 'xb10', 'cabinet', 'lamp'],
			control: {
				type: 'radio',
			},
		},
		color: {
			description: 'Цвета иконки: default - черный, disabled - серый',
			options: ['default', 'disabled'],
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

export const Yb08: Story = {
	args: {
		type: 'yb08',
	},
};

export const Xb10: Story = {
	args: {
		type: 'xb10',
	},
};

export const Cabinet: Story = {
	args: {
		type: 'cabinet',
	},
};

export const Lamp: Story = {
	args: {
		type: 'lamp',
	},
};
