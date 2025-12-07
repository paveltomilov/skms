// src/components/Popup/index.tsx
'use client';
import { FC, useEffect } from 'react';
import styles from './styles.module.scss';

type PopupVariant = 'success' | 'error' | 'info';

interface PopupProps {
	/** Текст сообщения */
	message: string;
	/** Вид модалки – влияет на цвет и иконку */
	variant?: PopupVariant; // default: 'info'
	/** Функция закрытия (вызывается после клика по кнопке/офферу либо таймаута) */
	onClose: () => void;
	/** Время в мс, через которое модалка закроется автоматически.
	 * Если `0` – не будет автозакрытия. */
	timeout?: number; // default: 4000
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
	timeout = 400000, // 4 с по умолчанию
}) => {
	/* ===== автозакрытие ===== */
	useEffect(() => {
		if (timeout <= 0) return;
		const id = setTimeout(onClose, timeout);
		return () => clearTimeout(id); // очистка при размонтировании
	}, [timeout, onClose]);

	/* ===== рендер ===== */
	return (
		<div className={styles.overlay} onClick={onClose}>
			<div
				className={`${styles.popup} ${variantClasses[variant]}`}
				onClick={e => e.stopPropagation()}
			>
				<p>{message}</p>
				<button type="button" onClick={onClose} className={styles.btn}>
					OK
				</button>
			</div>
		</div>
	);
};

export default Popup;
