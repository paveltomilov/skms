'use client';
import React, { FC, useState } from 'react';
import Button from '../Button';
import SectionTitle from '../SectionTitle';
import styles from './styles.module.scss';
import SurveyApp from '../SurveyComponents/SurveyApp';
import ButtonClosed from '../IconSvg/closed';

const Survey: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
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
				<div className={styles.modal__overlay}>
					<ButtonClosed
						className={styles.button__closed}
						onClick={closeModal}
					/>
					<div className={styles.modalContent}>
						<SurveyApp />
					</div>
				</div>
			)}
		</section>
	);
};

export default Survey;
