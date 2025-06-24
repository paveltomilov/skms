import {Meta, type StoryObj} from "@storybook/react";
import {AutomatButton} from "./index";
import {useState} from "react";

const meta: Meta<typeof AutomatButton> = {
    title: 'UI/AutomatButton',
    component: AutomatButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            description: 'Состояние (вкл/выкл)',
            options: ['on', 'off'],
            control: {
                type: 'radio',
            },
        },
        type: {
            description: 'Тип (закрыто/открыто)',
            options: ['open', 'close'],
            control: {
                type: 'radio',
            },
        },
        disabled: {
            description: 'Активна/неактивна',
            options: [true, false],
            control: {
                type: 'radio',
            },
        },
        onMouseDown: {
            description: 'Функция при надавливании',
        },
        onMouseUp: {
            description: 'Функция при отпускании клавиши',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const DemoBtn = ({state = 'off', type = 'close'}) => {
    const [demoState, setDemoState] = useState(state);
    const [demoType, setDemoType] = useState(type)

    const demoOnMouseDown = (): void => {
        setDemoState(oldState => oldState === 'off' ? 'on' : 'off');
    };

    const demoOnMouseUp = (): void => {
        setDemoType(oldType => oldType === 'close' ? 'open' : 'close');
    };

    return <AutomatButton state={demoState as "on" | "off"}
                          type={demoType as "open" | "close"}
                          onMouseUp={demoOnMouseUp}
                          onMouseDown={demoOnMouseDown}/>;
};

export const Demo: Story = {
    args: {
        id: 'demo-automat-button',
        name: 'demo',
    },
    render: () => <DemoBtn/>,
};

export const Default: Story = {
    args: {
        id: 'default-automat-button',
        name: 'default',
    },
};

export const Opened: Story = {
    args: {
        id: 'opened-automat-button',
        name: 'opened',
    },
    render: () => <DemoBtn state='on' type='open'/>,
};

export const Closed: Story = {
    args: {
        id: 'closed-automat-button',
        name: 'closed',
    },
    render: () => <DemoBtn state='off' type='close'/>,
};

export const Inactive: Story = {
    args: {
        id: 'inactive-automat-button',
        name: 'inactive',
        state: 'off',
        type: 'close',
        disabled: true,
    },
}