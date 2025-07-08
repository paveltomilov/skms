import type { Meta, StoryObj } from '@storybook/react';
import Lamp from '.';


const meta: Meta<typeof Lamp> = {
  title: 'Icons/Lamp',
  component: Lamp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Для передачи дополнительных стилей (для позиционирования)',
      control: false,
    },
    variant: {
      description: 'Вариант иконки лампы',
      control: { type: 'select' },
      options: ['default', 'success', 'error', 'warn'],
      defaultValue: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
};

export const Warn: Story = {
  args: {
    variant: 'warn',
  },
};

