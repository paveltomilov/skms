'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Image from 'next/image';

export const PopupSimulationInterrupted: FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch(closeModal('simulationInterrupted'));
		router.push('/ptk');
	};

	return (
		<div className={styles.popup}>
			<div className={styles.popup__content}>
				<Image
					className={styles.popup__img}
					src="/svg/error.svg"
					width={145}
					height={145}
					alt="информация"
				/>
				<p className={styles.popup__text}>
					Симуляция завершена учителем.
				</p>
				<Button
					className={styles.popup__button}
					width={210}
					height={55}
					text="Закрыть"
					onClick={handleClose}
				/>
			</div>
		</div>
	);
};
