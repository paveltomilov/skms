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
      options: ['error', 'success', 'default', 'disabled', 'warn'],
      control: { type: 'radio' },
    },
    type: {
      description: 'Размер инпута',
      options: [ 'maximum', 'average', 'minimum', 'code'],
      control: { type: 'radio' },
    },
    message: {
      description: 'Сообщение под инпутом',
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { status: 'default', type: 'average', message: '' },
};

export const Success: Story = {
  args: { status: 'success', type: 'average', message: 'Регистрация прошла успешно' },
};

export const Error: Story = {
  args: { status: 'error', type: 'average', message: 'E-mail адрес введен неверно' },
};

export const Warn: Story = {
  args: { status: 'warn', type: 'average', message: 'Проверьте введённые данные' },
};

export const Disabled: Story = {
  args: { status: 'disabled', type: 'average', message: '' },
};

export const Code: Story = {
  args: { status: 'code', type: 'average', message: 'Неверный код' },
};
