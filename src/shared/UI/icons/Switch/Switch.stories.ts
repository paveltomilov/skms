import {Meta, type StoryObj} from "@storybook/react";
import Switch from "./index";

const meta: Meta<typeof Switch> = {
    title: 'Icons/Switch',
    component: Switch,
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
        id: 'default-switch',
        name: 'default',
        className: 'styles.switcher',
    },
};