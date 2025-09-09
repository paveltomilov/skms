'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import {
	CONTROL_CIRCUIT_BREAKER_ID,
	HIGH_RESISTANCE,
} from '@/shared/configs/scheme';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { closeAllModal, openModal } from '@/store/modalSlice';

interface Prop {
	id: string;
	title: string;
}

export const SchemeElement: FC<Prop> = ({ id, title }) => {
	const dispatch = useAppDispatch();

	const activeProb = useAppSelector(state => state.multimeter.activeProb);

	const handleOpenAutomat = () => {
		dispatch(closeAllModal());
		if (id === CONTROL_CIRCUIT_BREAKER_ID) {
			dispatch(openModal('automatic'));
		} else {
			dispatch(openModal('test'));
		}

	};

	// для визуализации состояния элементов схемы
	const schemeElement = findElementByID(
		id,
		useAppSelector(state => state.circuit),
	);

	const resistance = schemeElement?.resistance === HIGH_RESISTANCE;

	const elementClassName = `${styles.element} ${styles[id]} ${
		!activeProb && styles.element_hover
	} ${
		resistance
			? styles.element__highResistance
			: styles.element__baseResistance
	}`;

	return (
		<button
			className={elementClassName}
			aria-label={title}
			onClick={handleOpenAutomat}
		></button>
	);
};
