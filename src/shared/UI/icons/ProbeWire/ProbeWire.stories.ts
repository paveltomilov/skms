import {Meta, type StoryObj} from "@storybook/react";
import ProbeWire from "./index";

const meta: Meta<typeof ProbeWire> = {
    title: 'Icons/ProbeWire',
    component: ProbeWire,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            description: 'Цвет заливки',
            options: ['black', 'grey', 'red'],
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
        id: 'default-probe-ware',
        name: 'default',
    },
};

export const BlackProbeWire: Story = {
    args: {
        id: 'black-probe-ware',
        name: 'black',
        color: 'black'
    },
};

export const GreyProbeWire: Story = {
    args: {
        id: 'grey-probe-ware',
        name: 'grey',
        color: 'grey'
    },
};

export const RedProbeWire: Story = {
    args: {
        id: 'red-probe-ware',
        name: 'red',
        color: 'red'
    },
};