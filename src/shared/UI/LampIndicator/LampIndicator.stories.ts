import type { Meta, StoryObj } from '@storybook/react';
import LampIndicator from '.';

const meta: Meta<typeof LampIndicator> = {
	title: 'LampIndicator',
	component: LampIndicator,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		color: {
			description:
				'Состояния верхней части лампы: белая — lamp_white_off / lamp_white_on, зелёная — lamp_green_off / lamp_green_on.',
			options: ['lamp_white_off', 'lamp_white_on', 'lamp_green_off', 'lamp_green_on'],
			control: { type: 'radio' },
		},
		className: {
			description: 'Дополнительный CSS-класс контейнера. Обычно не требуется.',
			control: false,
		},
		style: {
			description: 'Inline-стили для SVG.',
			control: false,
		},
	},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const WhiteOff: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_white_off',
	},
};

export const WhiteOn: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_white_on',
	},
};

export const GreenOff: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_green_off',
	},
};

export const GreenOn: Story = {
	args: {
		type: 'lamp',
		color: 'lamp_green_on',
	},
};
