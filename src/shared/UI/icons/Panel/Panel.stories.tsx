import {Meta, type StoryObj} from "@storybook/react";
import Panel from "@/shared/UI/icons/Panel/index";

const meta: Meta<typeof Panel> = {
    title: 'Icons/Panel',
    component: Panel,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        className: {
            description: 'Имена классов',
        },
        children: {
            description: 'Вложенные компоненты',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'default-panel',
        name: 'default',
    },
};