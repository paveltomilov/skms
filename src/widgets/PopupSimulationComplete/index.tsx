'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
import { useSubscription } from '@/shared/hooks/useSubscription';

export const PopupSimulationComplete: FC = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const subscriptionType = useSubscription();
	const simulationId = useAppSelector(state => state.simulation.simulationId);

	const handleButtonClick = () => {
		// Закрываем модальное окно при клике на кнопку
		dispatch(closeModal('simulationComplete'));
		
		// Переход на соответствующую страницу
		if (subscriptionType === 'free') {
			// Переход на опрос для бесплатной подписки
			if (simulationId) {
				router.push(`/simulation/${simulationId}/survey`);
			}
		} else {
			// Переход на статистику для платной подписки
			if (simulationId) {
				router.push(`/simulation/${simulationId}/stats`);
			}
		}
	};

	const buttonText =
		subscriptionType === 'free' ? 'Пройти опрос' : 'Узнать результат';

	return (
		<div className={styles.popup}>
			<div className={styles.popup__content}>
				<p className={styles.popup__text}>
					Поздравляем! Все неисправности успешно устранены.
				</p>
				<Button
					width={307}
					height={38}
					text={buttonText}
					onClick={handleButtonClick}
				/>
			</div>
		</div>
	);
};

