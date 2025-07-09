'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { getInputCircuitBreakerState } from '@/shared/utils/getInputCircuitBreakerState/getInputCircuitBreakerState';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { openModal } from '@/store/modalSlice';

export const InputCircuitBreaker: FC = () => {
	const dispatch = useAppDispatch();
	const activeProb = useAppSelector(state => state.multimeter.activeProb);

	const resistance = getInputCircuitBreakerState() === 'off';

	const elementClassName = `${styles.element}  ${
		!activeProb && styles.element_hover
	} ${
		resistance
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
