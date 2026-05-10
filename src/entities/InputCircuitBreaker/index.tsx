'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { openModal } from '@/store/modalSlice';

export const InputCircuitBreaker: FC = () => {
	const dispatch = useAppDispatch();
	const activeProb = useAppSelector(state => state.multimeter.activeProb);
	const isBreakerOff = useAppSelector(
		state =>
			state.inputBreaker.mechanicalState === 'off' ||
			state.inputBreaker.mechanicalState === 'turning_off',
	);

	const elementClassName = `${styles.element}  ${
		!activeProb && styles.element_hover
	} ${
		isBreakerOff
			? styles.element__highResistance
			: styles.element__baseResistance
	}`;

	const handleOpenModal = () => {
		dispatch(openModal('automatic'));
	};

	return (
		<button className={elementClassName} onClick={handleOpenModal}></button>
	);
};
