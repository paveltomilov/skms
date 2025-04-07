import type { Meta, StoryObj } from '@storybook/react';
import Feedback from '.';

const meta: Meta<typeof Feedback> = {
	title: 'Icons/Feedback',
	component: Feedback,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			description:
				'Цвета иконки: default - черный, disabled - серый, white - белый с прозрачностью',
			options: ['default', 'disabled', 'white'],
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

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		color: 'disabled',
	},
};

export const White: Story = {
	args: {
		color: 'white',
	},
};
