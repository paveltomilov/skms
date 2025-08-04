import type { Meta, StoryObj } from '@storybook/react';
import Gate from '.';

const meta: Meta<typeof Gate> = {
	title: 'Gate',
	component: Gate,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		state: {
			description:
				'Состояния задвижки: open - открытая, close - закрытая, noPower - нет питания, intermediate - промежуточное состояние, toOpen - идет на открытие, toClose - идет на закрытие, magenta - розовая задвижка (пока не знаю что она означает)',
			options: [
				'open',
				'close',
				'noPower',
				'intermediate',
				'toOpen',
				'toClose',
				'magenta',
			],
			control: {
				type: 'radio',
			},
		},
		textTop: {
			description: 'Текст сверху задвижки',
			control: { type: 'text' },
		},
		textBottom: {
			description: 'Текст снизу задвижки',
			control: { type: 'text' },
		},
		textLeft: {
			description: 'Текст слева задвижки',
			control: { type: 'text' },
		},
		textRight: {
			description: 'Текст справа задвижки',
			control: { type: 'text' },
		},
		className: {
			description:
				'Для передачи дополнительных стилей (для позиционирования)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	args: {
		state: 'open',
	},
};

export const Close: Story = {
	args: {
		state: 'close',
	},
};

export const NoPower: Story = {
	args: {
		state: 'noPower',
	},
};

export const Intermediate: Story = {
	args: {
		state: 'intermediate',
	},
};

export const ToOpen: Story = {
	args: {
		state: 'toOpen',
	},
};

export const ToClose: Story = {
	args: {
		state: 'toClose',
	},
};

export const Vertical: Story = {
	args: {
		state: 'open',
		position: 'vertical',
	},
};

export const Disabled: Story = {
	args: {
		state: 'open',
		disable: true,
	},
};

export const Powered: Story = {
	args: {
		state: 'open',
		power: true,
	},
};
