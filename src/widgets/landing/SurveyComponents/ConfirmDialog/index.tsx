'use client';

import React, { FC } from 'react';
import Button from '../../Button';
import styles from './styles.module.scss';

interface ConfirmDialogProps {
	className: string;
	isOpen: boolean;
	title: string;
	message?: string;
	onConfirm: () => void;
	onCancel: () => void;
	confirmText?: string;
	cancelText?: string;
	overlayColor?: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
	isOpen,
	title,
	message,
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

					{message && (
						<p className={styles.confirm__dialog_message}>
							{message}
						</p>
					)}

					<div className={styles.confirm__dialog_buttons}>
						<Button
							className={`${styles.confirm__button} ${styles.cancel__button}`}
							text={cancelText}
							onClick={onCancel}
							width={140}
							height={40}
							radius={4}
							type="button"
						/>
						<Button
							className={`${styles.confirm__button} ${styles.confirm__button_yes}`}
							text={confirmText}
							onClick={onConfirm}
							width={140}
							height={40}
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
