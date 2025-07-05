import {Meta, type StoryObj} from "@storybook/react";
import SwitchHandle from "./index";
import {useRef, useState} from "react";

const meta: Meta<typeof SwitchHandle> = {
    title: 'Icons/SwitchHandle',
    component: SwitchHandle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        ref: {
            description: 'Ссылка на текущий компонент',
        },
        onMouseDown: {
            description: 'Функция по нажатию клавиши',
        },
        onMouseUp: {
            description: 'Функция при отпуске клавиши',
        },
        angle: {
            description: 'Угол поворота',
        },
        className: {
            description: 'Имена классов',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const DemoSwitchHandle = () => {
    const switchRef = useRef(null);
    const [angle, setAngle] = useState(0);

    const onMouseDown = () => {setAngle(old => old === 0 ? 330 : 0)};
    const onMouseUp = () => {};

    return <SwitchHandle ref={switchRef}
                         onMouseDown={onMouseDown}
                         onMouseUp={onMouseUp}
                         angle={angle}/>;
};

export const Default: Story = {
    args: {
        id: 'default-switch',
        name: 'default',
        className: 'styles.switcher__handle',
    },
};

export const Demo: Story = {
    args: {
        id: 'demo-switch',
        name: 'demo',
    },
    render: () => <DemoSwitchHandle/>,
};

export const Angle330Switch: Story = {
    args: {
        id: 'angle330-switch',
        name: 'default',
        className: 'styles.switcher__handle',
        angle: 330,
    },
};