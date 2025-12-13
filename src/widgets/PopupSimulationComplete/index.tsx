'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
import { useSubscription } from '@/shared/hooks/useSubscription';

export const PopupSimulationComplete: FC = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
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
		dispatch(closeModal('simulationComplete'));

		if (subscriptionType === 'free') {
			// Редирект на страницу опроса для бесплатных пользователей
			if (simulationId) {
				router.push('/survey');
			}
		} else {
			// Редирект на страницу статистики для платных пользователей
			if (simulationId) {
				router.push('/stats');
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
