import {Meta, type StoryObj} from "@storybook/react";
import Power from "./index";

const meta: Meta<typeof Power> = {
    title: 'Icons/Power',
    component: Power,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            description: 'Цвет заливки',
            options: ['default', 'magenta'],
            control: {
                type: 'radio',
            },
        },
        transform: {
            description: 'Поворот',
            options: ['rotate180', 'rotateLeft90'],
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
        id: 'default-power',
        name: 'default',
        color: 'default',
    },
};

export const Rotate180Power: Story = {
    args: {
        id: 'rotate180-power',
        name: 'default',
        color: 'default',
        transform: 'rotate180',
    },
};

export const RotateLeft90Power: Story = {
    args: {
        id: 'rotateLeft90-power',
        name: 'default',
        color: 'default',
        transform: 'rotateLeft90',
    },
};

export const RedColorPower: Story = {
    args: {
        id: 'magenta-power',
        name: 'default',
        color: 'magenta',
    },
};