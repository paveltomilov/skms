'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { ISchemeElement } from '@/shared/types/scheme';
import {
	CONTROL_CIRCUIT_BREAKER_ID,
	HIGH_RESISTANCE,
} from '@/shared/configs/scheme';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { openModal } from '@/store/modalSlice';

interface Prop {
	element: ISchemeElement;
}

export const SchemeElement: FC<Prop> = ({ element }) => {
	const { id } = element;
	const dispatch = useAppDispatch();

	const activeProb = useAppSelector(state => state.multimeter.activeProb);

	const handleOpenPopup = () => {
		if (id === CONTROL_CIRCUIT_BREAKER_ID) {
			dispatch(openModal());
		} else {
			dispatch(openPopup({ isOpen: true, content: element }));
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
			id={id}
			onClick={handleOpenPopup}
		></button>
	);
};
