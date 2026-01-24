'use client';
import React, { FC, useState } from 'react';
import Button from '../Button';
import SectionTitle from '../SectionTitle';
import styles from './styles.module.scss';
import SurveyApp from '../SurveyComponents/SurveyApp';
import ButtonClosed from '../IconSvg/closed';
import ConfirmDialog from '../SurveyComponents/ConfirmDialog';

const Survey: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);

	const openCloseConfirm = () => {
		setShowConfirmDialog(true);
	};

	const openModal = () => setIsOpen(true);

	const handleCancelClose = () => {
		setShowConfirmDialog(false);
	};

	const handleConfirmClose = () => {
		setIsOpen(false);
		setShowConfirmDialog(false);
		// Здесь можно добавить дополнительную логику при закрытии
		console.log('Опрос закрыт пользователем');
	};

	return (
		<section className={styles.survey}>
			<div className={`${styles.survey__container} container`}>
				<SectionTitle
					className={styles.survey__title}
					title="Ваше мнение помогает нам развиваться"
				/>
				<p className={styles.survey__description}>
					Ответьте на несколько вопросов — это займёт всего пару минут
				</p>
				<Button
					className={styles.survey__button}
					text="пройти опрос"
					width={0}
					height={40}
					radius={4}
					onClick={openModal}
				/>
			</div>
			{isOpen && (
				<>
					<div
						className={`${styles.modal__overlay} ${
							showConfirmDialog
								? styles.modal__overlay__darkened
								: ''
						}`}
					>
						<ButtonClosed
							className={styles.button__closed}
							onClick={openCloseConfirm}
						/>

						<SurveyApp />
					</div>
					<ConfirmDialog
						className={styles.modal__closed}
						isOpen={showConfirmDialog}
						title="Вы уверены, что хотите закрыть опрос?"
						message="Ваши ответы не будут сохранены"
						onConfirm={handleConfirmClose}
						onCancel={handleCancelClose}
						confirmText="Да, закрыть"
						cancelText="Нет, остаться"
						overlayColor="rgba(10, 10, 20, 0.8)" // 0A0A14 80%
					/>
				</>
			)}
		</section>
	);
};

export default Survey;
