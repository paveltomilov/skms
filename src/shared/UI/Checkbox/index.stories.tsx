import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './index';

const meta = {
	title: 'UI/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Размеры: sm - 20x20 px, lg - 24x24 px',
			options: ['sm', 'lg'],
			control: {
				type: 'radio',
			},
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: 'default-checkbox',
		name: 'default',
	},
};

export const Checked: Story = {
	args: {
		id: 'checked-checkbox',
		name: 'checked',
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		id: 'disabled-checkbox',
		name: 'disabled',
		disabled: true,
	},
};

export const DisabledChecked: Story = {
	args: {
		id: 'disabled-checked-checkbox',
		name: 'disabled-checked',
		disabled: true,
		checked: true,
	},
};

export const Small: Story = {
	args: { id: 'small', name: 'small', size: 'sm' },
};

export const Large: Story = {
	args: {
		id: 'large',
		name: 'large',
		size: 'lg',
	},
};
