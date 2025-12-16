'use client';
import { FC, useEffect } from 'react';
import styles from './styles.module.scss';

type PopupVariant = 'success' | 'error' | 'info';

interface PopupProps {
	message: string;
	variant?: PopupVariant;
	onClose: () => void;
	timeout?: number;
}

const variantClasses = {
	success: styles.success,
	error: styles.error,
	info: styles.info,
};

const Popup: FC<PopupProps> = ({
	message,
	variant = 'info',
	onClose,
	timeout = 4000,
}) => {
	useEffect(() => {
		if (timeout <= 0) return;
		const id = setTimeout(onClose, timeout);
		return () => clearTimeout(id);
	}, [timeout, onClose]);

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div
				className={`${styles.popup} ${variantClasses[variant]}`}
				onClick={e => e.stopPropagation()}
			>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Popup;
