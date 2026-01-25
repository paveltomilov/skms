'use client';
import React, { FC } from 'react';
import Button from '../../Button';
import { ConfirmDialogProps } from '@/shared/types/question';
import styles from './styles.module.scss';

const ConfirmDialog: FC<ConfirmDialogProps> = ({
	isOpen,
	title,
	onConfirm,
	onCancel,
	confirmText = 'Да',
	cancelText = 'Нет',
	overlayColor = 'rgba(10, 10, 20, 0.8)',
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
			role="dialog"
			aria-modal="true"
			aria-labelledby="confirm-dialog-title"
			style={{ backgroundColor: overlayColor }}
		>
			<div className={styles.confirm__dialog}>
				<div className={styles.confirm__dialog_content}>
					<h3
						id="confirm-dialog-title"
						className={styles.confirm__dialog_title}
					>
						{title}
					</h3>

					<div className={styles.confirm__dialog_buttons}>
						<Button
							className={`${styles.confirm__button} ${styles.cancel__button}`}
							text={cancelText}
							onClick={onCancel}
							width={145}
							height={44}
							radius={4}
							type="button"
						/>
						<Button
							className={`${styles.confirm__button} ${styles.confirm__button_yes}`}
							text={confirmText}
							onClick={onConfirm}
							width={182}
							height={48}
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
