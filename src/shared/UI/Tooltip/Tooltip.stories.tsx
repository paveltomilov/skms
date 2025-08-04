import { Meta, type StoryObj } from '@storybook/react';
import Tooltip from '.';

const meta: Meta<typeof Tooltip> = {
    title: 'UI/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        positionX: {
            description:
                'положение по горизонтали',
            control: { type: 'number' },
        },
        positionTop: {
            description:
                'положение по вертикали если носик сверху',
            control: { type: 'number' },
        },
        positionBottom: {
            description:
                'положение по вертикали если носик снизу',
            control: { type: 'number' },
        },
        direction: {
            description: 'носик верх-низ',
            options: ['top', 'bottom'],
            control: { type: 'radio' },
        },
        side: {
            description: 'носик право-лево',
            options: ['left', 'center', 'right'],
            control: { type: 'radio' },
        },
        content: {
            description: 'содержание',
            control: { type: 'text' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        direction: 'top',
        side: 'center',
        content: 'Текст со всплывающей подсказкой'
    },
};


