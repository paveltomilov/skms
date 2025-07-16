import { Meta, type StoryObj } from '@storybook/react';
import Button from '@/shared/UI/Button';
import Micro from '@/shared/UI/icons/Micro';
import { useState } from 'react';

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		href: {
			description:
				'Ссылка (есди кнопка используется в качестве компонента Link)',
			control: { type: 'text' },
		},
		width: {
			description: 'Ширина кнопки',
			control: { type: 'number' },
		},
		height: {
			description: 'Высота кнопки',
			control: { type: 'number' },
		},
		text: {
			description: 'Текст кнопки',
			control: { type: 'text' },
		},
		image: {
			description: 'Объект для установки изображения кнопке',
			control: { type: 'object' },
		},
		icon: {
			description: 'Компонент с иконкой',
			control: { type: 'object' },
		},
		disabled: {
			control: { type: 'boolean' },
		},
		active: {
			control: { type: 'boolean' },
		},
		success: {
			control: { type: 'boolean' },
		},
		className: {
			description: 'Имена классов',
			control: { type: 'text' },
		},
		ariaLabel: {
			description: 'Метка',
			control: { type: 'text' },
		},
		style: {
			description: 'Стили инлайновые',
			control: { type: 'object' },
		},
		onClick: {
			description: 'Функция-обработчик клика по кнопке',
		},
		onMouseDown: {
			description: 'Функция-обработчик нажатия на кнопку',
		},
		onMouseUp: {
			description: 'Функция-обработчик отпускания кнопки',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const DemoBtn = () => {
	const [isActive, setIsActive] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [tmpSuccess, setTmpSuccess] = useState(false);

	const onClick = () => {
		setIsSuccess(old => !old);
	};

	const onMouseDown = (): void => {
		setTmpSuccess(isSuccess);
		setIsSuccess(false);
		setIsActive(true);
	};

	const onMouseUp = (): void => {
		setIsActive(false);
		setIsSuccess(tmpSuccess);
	};

	return (
		<Button
			height={50}
			width={50}
			active={isActive}
			success={isSuccess}
			onClick={onClick}
			onMouseUp={onMouseUp}
			onMouseDown={onMouseDown}
		/>
	);
};
export const WithText: Story = {
	args: {
		width: 150,
		height: 50,
		text: <p>simple text</p>,
	},
};

export const WithImg: Story = {
	args: {
		width: 50,
		height: 50,
		image: {
			src: '/images/operator.webp',
			width: 40,
			height: 40,
		},
	},
};

export const WithIcon: Story = {
	args: {
		width: 50,
		height: 50,
		icon: <Micro />,
	},
};

export const Disabled: Story = {
	args: {
		width: 50,
		height: 50,
		disabled: true,
	},
};

export const Active: Story = {
	args: {
		width: 50,
		height: 50,
		active: true,
	},
};

export const Success: Story = {
	args: {
		width: 50,
		height: 50,
		success: true,
	},
};
