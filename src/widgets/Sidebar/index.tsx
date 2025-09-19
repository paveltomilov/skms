'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import PopupClamp from '../PopupClamp';
import ModalOverlay from '../ModalOverlay';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleSidebar = () => setIsOpen(!isOpen);

	return (
		<>
			<button onClick={handleToggleSidebar} className={styles.openButton}>
				<Chevron transform="rotate90" />
			</button>

			<div className={`${styles.sidebar} ${isOpen && styles.open}`}>
				<div className={styles.sidebarContent}>
					<Button
						width={90}
						height={34}
						aria-label="Главная"
						text="Главная"
						className={styles.buttonText}
						href="/"
					/>

					<Button
						width={90}
						height={34}
						aria-label="Обучение"
						text="Обучение"
						className={styles.buttonText}
					/>

					<Button
						width={90}
						height={34}
						aria-label="Тренажер"
						text="Тренажер"
						className={styles.buttonText}
						href="/zra"
					/>

					<Button
						width={90}
						height={34}
						aria-label="ПТК"
						text="ПТК"
						className={styles.buttonText}
						href="/ptk"
					/>
					<Button
						width={90}
						height={34}
						aria-label="Клеммы"
						text="Клеммы"
						className={styles.buttonText}
						onClick={() => setIsOpen(true)}
					/>
					{/* <PopupClamp /> */}
					<ModalOverlay id={'automatic'}>
						<PopupClamp />
					</ModalOverlay>
					{/* {isOpen && <PopupClamp />} */}
				</div>

				<button
					onClick={handleToggleSidebar}
					className={styles.closeButton}
				>
					<Chevron
						transform="rotateLeft90"
						className={styles.toggleButtonIcon}
					/>
				</button>
			</div>
		</>
	);
};

export default Sidebar;
