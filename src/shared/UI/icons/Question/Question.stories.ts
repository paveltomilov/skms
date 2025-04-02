import type { Meta, StoryObj } from '@storybook/react';
import Question from '.';

const meta: Meta<typeof Question> = {
	title: 'Icons/Question',
	component: Question,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Размеры иконки: xs - 16x16 px, sm - 20x20 px',
			options: ['xs', 'sm'],
			control: {
				type: 'radio',
			},
		},
		color: {
			description:
				'Цвета иконки: default - черный, disabled - серый, white_opacity - белый с прозрачностью',
			options: ['default', 'disabled', 'white_opacity'],
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

export const Small: Story = {};

export const Large: Story = {
	args: {
		size: 'sm',
	},
};

export const Disabled: Story = {
	args: {
		color: 'disabled',
	},
};

export const White: Story = {
	args: {
		color: 'white_opacity',
	},
};
