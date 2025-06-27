import {Meta, type StoryObj} from "@storybook/react";
import ProbeHolder from "./index";
import Probe from "@/shared/UI/icons/Probe";

const meta: Meta<typeof ProbeHolder> = {
    title: 'Icons/ProbeHolder',
    component: ProbeHolder,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'Вложенные компоненты',
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
        id: 'default-probe-holder',
        name: 'default',
    },
};

export const ProbeHolderWithProbe: Story = {
    args: {
        id: 'default-probe-holder',
        name: 'default',
        children: <Probe color='red'/>,
    },
};