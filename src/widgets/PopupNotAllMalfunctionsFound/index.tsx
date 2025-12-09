'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';

export const PopupNotAllMalfunctionsFound: FC = () => {
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch(closeModal('notAllMalfunctionsFound'));
	};

	return (
		<div className={styles.popup}>
			<div className={styles.popup__content}>
				<p className={styles.popup__text}>
					Не все дефекты найдены. Попробуйте еще раз!
				</p>
				<div className={styles.popup__buttons}>
					<Button
						width={307}
						height={38}
						text="Понятно"
						onClick={handleClose}
					/>
				</div>
			</div>
		</div>
	);
};
