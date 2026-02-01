'use client';
import React, { FC } from 'react';
import Button from '../../Button';
import { ConfirmDialogProps } from '@/shared/types/question';
import styles from './styles.module.scss';

const ConfirmDialog: FC<ConfirmDialogProps> = ({
	isOpen,
	onConfirm,
	onCancel,
}) => {
	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onCancel();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			onCancel();
		}
		if (e.key === 'Enter') {
			onConfirm();
		}
	};

	return (
		<div
			className={styles.confirm__overlay}
			onClick={handleOverlayClick}
			onKeyDown={handleKeyDown}
		>
			<div className={styles.confirm__dialog}>
				<div className={styles.confirm__dialog_content}>
					<h3 className={styles.confirm__dialog_title}>
						Вы уверены, что хотите выйти?
					</h3>

					<div className={styles.confirm__dialog_buttons}>
						<Button
							className={`${styles.confirm__button} ${styles.confirm__button_no}`}
							text="ОТМЕНА"
							onClick={onCancel}
							radius={4}
							type="button"
						/>
						<Button
							className={`${styles.confirm__button} ${styles.confirm__button_yes}`}
							text="ДА, ВЫЙТИ"
							onClick={onConfirm}
							radius={4}
							type="button"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
