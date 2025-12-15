'use client';

import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

interface ToastProps {
	message: string;
	type?: 'error' | 'success' | 'info';
	duration?: number;
	onClose?: () => void;
}

const Toast: FC<ToastProps> = ({
	message,
	type = 'info',
	duration = 3000,
	onClose,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			setTimeout(() => {
				onClose?.();
			}, 300); // Время для анимации исчезновения
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<div
			className={cn(styles.toast, styles[`toast_${type}`], {
				[styles.toast_hidden]: !isVisible,
			})}
		>
			{message}
		</div>
	);
};

export default Toast;
