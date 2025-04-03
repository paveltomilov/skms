import type { Meta, StoryObj } from '@storybook/react';
import Search from '.';

const meta: Meta<typeof Search> = {
	title: 'Icons/Search',
	component: Search,
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
