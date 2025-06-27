import {Meta, type StoryObj} from "@storybook/react";
import Switcher from "./index";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import circuitReducer from "@/store/circuitSlice";

const mockStore = configureStore({
    reducer: {
        circuit: circuitReducer,
    },
});

const meta: Meta<typeof Switcher> = {
    title: 'Icons/Switcher',
    component: Switcher,
    decorators: [
        (Story) => (
            <Provider store={mockStore}>
                <Story />
            </Provider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        mode: {
            description: 'Варианты переключения',
            options: ['on', 'off'],
            control: {
                type: 'radio',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'default-switcher',
        name: 'default',
    },
};

export const OnSwitcher: Story = {
    args: {
        id: 'default-switcher',
        name: 'default',
        mode: 'on'
    },
};

export const OffSwitcher: Story = {
    args: {
        id: 'default-switcher',
        name: 'default',
        mode: 'off'
    },
};