import {Meta, type StoryObj} from "@storybook/react";
import Button from "@/shared/UI/Button";
import Micro from "@/shared/UI/icons/Micro";
import {useState} from "react";
import {AutomatButton} from "@/shared/UI/AutomatButton";

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        id: {},
        width: {},
        height: {},
        text: {},
        image: {},
        icon: {},
        disabled: {
            options: [true, false],
        },
        active: {
            options: [true, false],
        },
        success: {
            options: [true, false],
        },
        className: {},
        ariaLabel: {},
        style: {},
        onClick: {},
        onMouseDown: {},
        onMouseUp: {},
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
        text: 'simple text',
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