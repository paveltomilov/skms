'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
import Image from 'next/image';
import { useSimulationCompleteConfig } from '@/shared/hooks/useSimulationCompleteConfig';

export const PopupSimulationComplete: FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const subscriptionType = useSubscription();
	const config = useSimulationCompleteConfig(subscriptionType);
	const [simulationId, setSimulationId] = useState<string | null>(null);

	// Получаем simulationId из sessionStorage при открытии модального окна
	useEffect(() => {
		const savedSimulationId = sessionStorage.getItem(
			'completedSimulationId',
		);
		if (savedSimulationId) {
			setSimulationId(savedSimulationId);
			// Очищаем после использования
			sessionStorage.removeItem('completedSimulationId');
		}
	}, []);

	const handleMainButtonClick = () => {
		// Закрываем модалку перед редиректом
		dispatch(closeModal('simulationComplete'));

		if (subscriptionType === 'free') {
			// Редирект на страницу опроса для бесплатных пользователей
			if (simulationId) {
				router.push(`/survey/?simulationId=${simulationId}`);
			}
		} else {
			// Редирект на страницу статистики для платных пользователей
			if (simulationId) {
				router.push(`/stats/?simulationId=${simulationId}`);
			}
		}
	};

	return (
		<div className={styles.popup} style={{ width: config.width }}>
			<div className={styles.popup__content}>
				<Image
					className={styles.popup__img}
					src='/svg/success.svg'
					width={145}
					height={145}
					alt='успешно'
				/>
				<p className={styles.popup__text}>
					{config.messageText}
				</p>
				<Button
					className={styles.popup__button}
					width={config.buttonWidth}
					height={55}
					text={config.buttonText}
					onClick={handleMainButtonClick}
				/>
			</div>
		</div>
	);
}; 
