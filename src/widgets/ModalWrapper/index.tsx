'use client';

import { useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
import styles from './styles.module.scss';
import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const ModalWrapper: FC<Props> = ({ children }) => {
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch(closeModal());
	};

	return (
		<div className={styles.modal} onClick={handleClose}>
			<div
				className={styles.modal__content}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default ModalWrapper;
