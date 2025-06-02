import type { Meta, StoryObj } from '@storybook/react';
import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      description: 'Статус инпута',
      options: ['error', 'success', 'default', 'disable', 'attention', 'hover'],
      control: { type: 'radio' },
    },
    type: {
      description: 'Размер инпута',
      options: ['minimum', 'maximum', 'average'],
      control: { type: 'radio' },
    },
    subscribe: {
      description: 'Флаг подписки',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { status: 'default', type: 'average', subscribe: false },
};

export const Success: Story = {
  args: { status: 'success', type: 'average', subscribe: false },
};

export const Error: Story = {
  args: { status: 'error', type: 'average', subscribe: false },
};

export const Attention: Story = {
  args: { status: 'attention', type: 'average', subscribe: false },
};

export const Disabled: Story = {
  args: { status: 'disable', type: 'average', subscribe: false },
};

export const Hover: Story = {
  args: { status: 'hover', type: 'average', subscribe: false },
};

