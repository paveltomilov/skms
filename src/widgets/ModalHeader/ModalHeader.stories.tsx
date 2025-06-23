import { Meta, StoryObj } from '@storybook/react';
import ModalHeader from '.';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  headerWidthPx?: number;
  headerHeightPx?: number;
  className?: string;
}

const meta: Meta<ModalHeaderProps> = {
  title: 'Components/ModalHeader',
  component: ModalHeader,
  argTypes: {
    title: { control: 'text' },
    onClose: { action: 'onClose' },
    headerWidthPx: { control: { type: 'number', min: 100, max: 1000, step: 10 } },
    headerHeightPx: { control: { type: 'number', min: 20, max: 200, step: 5 } },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<ModalHeaderProps>;

export const Default: Story = {
  args: {
    title: 'Заголовок модального окна',
    onClose: () => alert('Закрыто'),
    headerWidthPx: 400,
    headerHeightPx: 60,
    className: '',
  },
};
