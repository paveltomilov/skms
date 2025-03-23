'use client';

import { useState } from 'react';
import PopUp from '@/entities/PopUp';
import styles from './styles.module.scss';
import { PopupBtn } from '@/shared/types/popupBtn';
import { customButtons } from '@/shared/configs/popup';

const ParentComponent = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [additionalButtons, setAdditionalButtons] = useState<PopupBtn[]>([]);

	// Обработчик для открытия/закрытия PopUp
	const handleTriggerClick = () => {
		setAdditionalButtons(customButtons); // Передаем кастомные кнопки
		setIsPopupOpen(prev => !prev); // Переключаем состояние PopUp
	};

	return (
		<>
			{/* Кнопка-триггер для открытия/закрытия PopUp */}
			<button className={styles.MockBtn} onClick={handleTriggerClick}>
				{isPopupOpen ? 'Закрыть PopUp' : 'Открыть PopUp'}
			</button>

			{/* Компонент PopUp */}
			<PopUp isOpen={isPopupOpen} additionalButtons={additionalButtons} />
		</>
	);
};

export default ParentComponent;
