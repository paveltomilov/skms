import { useState } from 'react';
import ButtonConfig from '@/shared/configs/ButtonConfig';

type UsePopupProps = {
  customButtons?: ButtonConfig[];
};

const usePopup = ({ customButtons = [] }: UsePopupProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [additionalButtons, setAdditionalButtons] = useState<ButtonConfig[]>([]);

  const handleTriggerClick = () => {
    setAdditionalButtons(customButtons);
    setIsOpen(prev => !prev);
  };

  return {
    isOpen,
    additionalButtons,
    handleTriggerClick,
  };
};

export default usePopup;