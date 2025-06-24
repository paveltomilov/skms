import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ModalWrapper from '.';

interface ModalProps {
  header?: string;
  second?: number;
  onClose: () => void;
  isBlur?: boolean;
}

const meta: Meta<ModalProps> = {
  title: 'Components/ModalWrapper',
  component: ModalWrapper,
  argTypes: {
    header: { control: 'text' },
    second: { control: { type: 'number', min: 0, max: 120, step: 1 } },
    isBlur: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
};

export default meta;

export const Default: StoryObj<ModalProps> = {
  args: {
    header: 'ПКДВ-2',
    second: 59,
    isBlur: true,
    onClose: () =>  alert('Закрыто'),
  },
  render: (args) => {
    const [seconds, setSeconds] = React.useState(args.second ?? 59);

    React.useEffect(() => {
      if (seconds <= 0) return;
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }, [seconds]);

    return (
      <div id="blur-container" style={{ position: 'relative' }}>
        <ModalWrapper {...args} second={seconds} />
      </div>
    );
  },
};
