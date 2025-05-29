'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { PopupContent } from '@/shared/types/popup';
import { ISchemeElement } from '@/shared/types/scheme';
import { findElementByID } from '@/shared/utils/scheme';
import { HIGH_RESISTANCE } from '@/shared/configs/scheme';

interface Prop {
	element: ISchemeElement;
}

export const SchemeElement: FC<Prop> = ({ element }) => {
	const { id, icon, title, buttons } = element;
	const dispatch = useAppDispatch();

	const activeProb = useAppSelector(state => state.multimeter.activeProb);

	const handleOpenPopup = (content: PopupContent | null = null) => {
		dispatch(openPopup({ isOpen: true, content }));
	};

	// для визуализации состояния элементов схемы
	const schemeElement = findElementByID(
		id,
		useAppSelector(state => state.circuit),
	);

	const resistance = schemeElement?.resistance === HIGH_RESISTANCE;

	return (
		<button
			className={`${styles.element} ${styles[id]} ${
				!activeProb && styles.element_hover
			} ${
				resistance
					? styles.element__highResistance
					: styles.element__baseResistance
			}`}
			id={id}
			onClick={() =>
				handleOpenPopup({
					id,
					icon,
					title,
					buttons,
				})
			}
		></button>
	);
};
