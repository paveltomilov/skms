'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
import { useSubscription } from '@/shared/hooks/useSubscription';

export const PopupSimulationComplete: FC = () => {
	const dispatch = useAppDispatch();
	const subscriptionType = useSubscription();

	const handleMainButtonClick = () => {
		console.warn('редирект на страницу опроса');
		dispatch(closeModal('simulationComplete'));
	};

	const handleChangePlanClick = () => {
		console.warn('менять план');
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
					<Button
						width={307}
						height={38}
						text="Менять план"
						onClick={handleChangePlanClick}
					/>
				</div>
			</div>
		</div>
	);
};
