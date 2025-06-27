import {Meta, type StoryObj} from "@storybook/react";
import Loader from "./index";

const meta: Meta<typeof Loader> = {
    title: 'Icons/Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'default-loader',
        name: 'default',
    },
};