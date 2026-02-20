'use client';

import { useAppDispatch } from '@/shared/hooks/store';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Image from 'next/image';
import { FC } from 'react';
import { closeModal } from '@/store/modalSlice';

export const PopupDetectInfo: FC<{ error?: boolean }> = ({ error }) => {

	const dispatch = useAppDispatch();

	const handleButtonClick = () => {
		dispatch(closeModal('detectInfo'));
		dispatch(closeModal('detectInfoError'));
	};

	return (
		<div className={styles.popup} >
			<div className={styles.popup__content}>
				<Image
					className={styles.popup__img}
					src={error ? '/svg/error.svg' : '/svg/success.svg'}
					width={139}
					height={139}
					alt={error ? 'ошибка' : 'успешно'}
				/>
				<p className={styles.popup__text}>
					{error ? 'Неисправность определена неверно' : 'Неисправность определена верно'}
				</p>
				<Button
					className={styles.popup__button}
					width={210}
					height={55}
					text='Закрыть'
					onClick={handleButtonClick}
				/>
			</div>
		</div>
	);
}; 
