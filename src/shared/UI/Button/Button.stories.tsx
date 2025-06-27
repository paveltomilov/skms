import {Meta, type StoryObj} from "@storybook/react";
import Button from "@/shared/UI/Button";
import Micro from "@/shared/UI/icons/Micro";
import {useState} from "react";

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        id: {
            description: "Вроде как, это id, но используется как alt",
        },
        width: {
            description: "Ширина компонента",
        },
        height: {
            description: "Высота компонента",
        },
        text: {
            description: "Текст поверх кнопки (передаётся в виде узла)",
        },
        image: {
            description: "Объект для установки изображения поверх кнопки",
        },
        icon: {
            description: "Компонент с иконкой",
        },
        disabled: {
            options: [true, false],
        },
        active: {
            options: [true, false],
        },
        success: {
            options: [true, false],
        },
        className: {
            description: 'Имена классов'
        },
        ariaLabel: {
            description: 'Метка',
        },
        style: {
            description: 'Стили',
        },
        onClick: {
            description: 'Функция при клике по клавише',
        },
        onMouseDown: {
            description: 'Функция при нажатии клавиши',
        },
        onMouseUp: {
            description: 'Функция при отпуске клавиши',
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

    return <Button id='demo' height={50} width={50} active={isActive} success={isSuccess}
                   onClick={onClick} onMouseUp={onMouseUp} onMouseDown={onMouseDown}/>;
};

export const Demo: Story = {
    args: {
        name: 'demo',
    },
    render: () => <DemoBtn />
};

export const Default: Story = {
    args: {
        name: 'default',
        id: 'default-button',
    },
};

export const RequiredOptions: Story = {
    args: {
        name: 'required',
        id: 'required-button',
        width: 50,
        height: 50,
    },
};

export const WithText: Story = {
    args: {
        name: 'text',
        id: 'text-button',
        width: 150,
        height: 50,
        text: <p>simple text</p>,
    },
};

export const WithImg: Story = {
    args: {
        name: 'img',
        id: 'img-button',
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
        name: 'icon',
        id: 'icon-button',
        width: 50,
        height: 50,
        icon: <Micro/>,
    },
};

export const Disabled: Story = {
    args: {
        name: 'disabled',
        id: 'disabled-button',
        width: 50,
        height: 50,
        disabled: true,
    },
};

export const Active: Story = {
    args: {
        name: 'active',
        id: 'active-button',
        width: 50,
        height: 50,
        active: true,
    },
};

export const Success: Story = {
    args: {
        name: 'success',
        id: 'success-button',
        width: 50,
        height: 50,
        success: true,
    },
};