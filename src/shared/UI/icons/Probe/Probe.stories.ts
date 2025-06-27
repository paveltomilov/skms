import {Meta, type StoryObj} from "@storybook/react";
import Probe from "./index";

const meta: Meta<typeof Probe> = {
    title: 'Icons/Probe',
    component: Probe,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            description: 'Цвет заливки',
            options: ['black', 'red'],
            control: {
                type: 'radio',
            },
        },
        className: {
            description: 'Имена классов',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'default-probe',
        name: 'default',
    },
};

export const BlackProbe: Story = {
    args: {
        id: 'black-probe',
        name: 'black',
        color: 'black',
    },
};

export const RedProbe: Story = {
    args: {
        id: 'red-probe',
        name: 'red',
        color: 'red',
    },
};