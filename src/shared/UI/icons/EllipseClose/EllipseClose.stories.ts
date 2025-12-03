import type { Meta, StoryObj } from '@storybook/react';
import EllipseClose from '.';

const meta: Meta<typeof EllipseClose> = {
	title: 'Icons/EllipseClose',
	component: EllipseClose,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			description:
				'Размеры иконки: sm - 20x20 px, lg - 28x28 px, xs - 16x16 px',
			options: ['sm', 'lg', 'xs'],
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
		typeWidth: {
			description: 'Ширина линий иконуи: fat - жирная, thin - тонкая',
			options: ['thin', 'fat'],
			control: {
				type: 'radio',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {};

export const Large: Story = {
	args: {
		size: 'lg',
	},
};

export const Disabled: Story = {
	args: {
		color: 'disabled',
	},
};

export const SmallThin: Story = {
	args: {
		typeWidth: 'thin',
	}
};

export const LargeThin: Story = {
	args: {
		typeWidth: 'thin',
		size: 'lg',
	},
};

