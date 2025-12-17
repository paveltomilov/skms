'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';

export const PopupSimulationComplete: FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const subscriptionType = useSubscription();
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

	const buttonText =
		subscriptionType === 'free' ? 'Пройти опрос' : 'Узнать результат';

	return (
		<div className={styles.popup}>
			<div className={styles.popup__content}>
				<p className={styles.popup__text}>
					Вы закончили, что бы узнать результат пройдите опрос
				</p>
				<div className={styles.popup__buttons}>
					<Button
						width={307}
						height={38}
						text={buttonText}
						onClick={handleMainButtonClick}
					/>
				</div>
			</div>
		</div>
	);
};
