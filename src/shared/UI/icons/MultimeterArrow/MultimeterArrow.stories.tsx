import {Meta, type StoryObj} from "@storybook/react";
import MultimeterArrow from "./index";
import {useRef, useState} from "react";

const meta: Meta<typeof MultimeterArrow> = {
    title: 'Icons/MultimeterArrow',
    component: MultimeterArrow,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        ref: {
            description: 'Ссылка для компонента svg'
        },
        onMouseDown: {
            description: 'Функция при нажатии клавиши',
        },
        onMouseUp: {
            description: 'Функция при отпуске клавиши',
        },
        angle: {
            description: 'Угол поворота'
        },
        className: {
            description: 'Имена классов'
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const DemoArrow = () => {
    const arrowRef = useRef(null);
    const [actualAngle, setActualAngle] = useState(0);

    const onMouseDown = () => {
        setActualAngle(180);
    }

    const onMouseUp = () => {
        setActualAngle(0);
    };

    return <MultimeterArrow ref={arrowRef}
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                            angle={actualAngle}/>
};

export const Default: Story = {
    args: {
        id: 'default-multimeter-arrow',
        name: 'default',
        angle: 0,
    },
};

export const Demo: Story = {
    args: {
        id: 'demo-multimeter-arrow',
        name: 'demo',
    },
    render: () => <DemoArrow/>,
};

export const Angle90: Story = {
    args: {
        id: 'angle90-multimeter-arrow',
        name: 'angle90',
        angle: 90,
    },
};

export const Angle235: Story = {
    args: {
        id: 'angle235-multimeter-arrow',
        name: 'angle235',
        angle: 235,
    },
};