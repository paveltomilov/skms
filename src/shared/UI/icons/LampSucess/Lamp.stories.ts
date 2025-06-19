import type { Meta, StoryObj } from '@storybook/react';
import Lamp from '.';

const meta: Meta<typeof Lamp> = {
	title: 'Icons/LampSucess',
	component: Lamp,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sucess: Story = {};
