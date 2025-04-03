import type { Meta, StoryObj } from '@storybook/react';
import Exclamation from '.';

const meta: Meta<typeof Exclamation> = {
	title: 'Icons/Exclamation',
	component: Exclamation,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
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

export const Default: Story = {};

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
