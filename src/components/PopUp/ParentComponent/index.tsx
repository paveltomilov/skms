'use client';

import { useState } from 'react';
import PopUp from '@/components/PopUp';
import styles from './styles.module.scss';
import { ButtonConfig } from '@/components/PopUp';

const ParentComponent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [additionalButtons, setAdditionalButtons] = useState<ButtonConfig[]>([]);

  // Кастомные кнопки для передачи в PopUp
  const customButtons: ButtonConfig[] = [
    {
      id: 'custom1',
      width: 238,
      height: 35,
      text: 'Кнопка 1 (Props)',
      onClick: () => console.log('Custom action 1'),
    },
    {
      id: 'custom2',
      width: 238,
      height: 35,
      text: 'Кнопка 2 (Props)',
      onClick: () => console.log('Custom action 2'),
    },
    {
      id: 'custom2',
      width: 238,
      height: 35,
      text: 'Кнопка 3 (Props)',
      onClick: () => console.log('Custom action 2'),
    },
  ];

  // Обработчик для открытия/закрытия PopUp
  const handleTriggerClick = () => {
    setAdditionalButtons(customButtons); // Передаем кастомные кнопки
    setIsPopupOpen((prev) => !prev); // Переключаем состояние PopUp
  };

  return (
    <div>
      {/* Кнопка-триггер для открытия/закрытия PopUp */}
      <button className={styles.MockBtn} onClick={handleTriggerClick}>
        {isPopupOpen ? 'Закрыть PopUp' : 'Открыть PopUp'}
      </button>

      {/* Компонент PopUp */}
      <PopUp
        isOpen={isPopupOpen}
        additionalButtons={additionalButtons}
      />
    </div>
  );
};

export default ParentComponent;