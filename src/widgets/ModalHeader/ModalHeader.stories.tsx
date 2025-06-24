import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ModalHeader from '.';

interface ModalHeaderProps {
	title: string;
	onClose: () => void;
	headerWidthPx?: number;
	headerHeightPx?: number;
	buttonWidthPx?: number;
	buttonHeightPx?: number;
	iconWidthPx?: number;
	iconHeightPx?: number;
	className?: string;
}

const meta: Meta<ModalHeaderProps> = {
	title: 'Components/ModalHeader',
	component: ModalHeader,
	argTypes: {
		title: { control: 'text' },
		onClose: { action: 'onClose' },
		headerWidthPx: {
			control: { type: 'number', min: 100, max: 1000, step: 10 },
		},
		headerHeightPx: {
			control: { type: 'number', min: 20, max: 200, step: 5 },
		},
		buttonWidthPx: {
			control: { type: 'number', min: 10, max: 100, step: 1 },
		},
		buttonHeightPx: {
			control: { type: 'number', min: 10, max: 100, step: 1 },
		},
		iconWidthPx: { control: { type: 'number', min: 5, max: 50, step: 1 } },
		iconHeightPx: { control: { type: 'number', min: 5, max: 50, step: 1 } },
		className: { control: 'text' },
	},
};

export default meta;

type Story = StoryObj<ModalHeaderProps>;

export const Default: Story = {
	args: {
		title: 'Заголовок модального окна',
		onClose: () => alert('Закрыто'),
		headerWidthPx: 400,
		headerHeightPx: 60,
		buttonWidthPx: 26,
		buttonHeightPx: 26,
		iconWidthPx: 20,
		iconHeightPx: 20,
		className: '',
	},
};
