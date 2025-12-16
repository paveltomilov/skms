'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
import { useSubscription } from '@/shared/hooks/useSubscription';
import Image from 'next/image';

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

	const subConfig =
		subscriptionType === 'free' ?
			{
				messageText: 'Вы закончили, чтобы узнать результат пройдите опрос',
				buttonText: 'Пройти опрос',
				buttonWidth: 290,
				width: '540px'
			} :
			{
				messageText: 'Вы успешно справились c\u00A0заданием! Ознакомьтесь c\u00A0вашим результатом.',
				buttonText: 'Узнать результат',
				buttonWidth: 341,
				width: '590px'
			};

	return (
		<div className={styles.popup} style={{ width: subConfig.width }}>
			<div className={styles.popup__content}>
				<Image
					className={styles.popup__img}
					src='/svg/success.svg'
					width={145}
					height={145}
					alt='успешно'
				/>
				<p className={styles.popup__text}>
					{subConfig.messageText}
				</p>
				<Button
					className={styles.popup__button}
					width={subConfig.buttonWidth}
					height={55}
					style={{ backgroundColor: '#B0B0B0' }}
					text={subConfig.buttonText}
					onClick={handleMainButtonClick}
				/>
			</div>
		</div>
	);
}; 
