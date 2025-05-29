'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { PopupContent } from '@/shared/types/popup';
import { ISchemeElement } from '@/shared/types/scheme';
import { findElementByID } from '@/shared/utils/scheme';
import {
	CLOSE_FROM_KRUZAP_ID,
	CLOSE_FROM_PTK_ID,
	HIGH_RESISTANCE,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	OPEN_FROM_KRUZAP_ID,
	OPEN_FROM_PTK_ID,
} from '@/shared/configs/scheme';

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

	// элементы которые должны меняться в текущей задаче (для того чтобы не отвлекали другие элементы)
	const taskElements =
		schemeElement?.id === LIMIT_SWITCH_OPEN_ID ||
		schemeElement?.id === LIMIT_SWITCH_CLOSE_ID ||
		schemeElement?.id === OPEN_FROM_KRUZAP_ID ||
		schemeElement?.id === CLOSE_FROM_KRUZAP_ID ||
		schemeElement?.id === OPEN_FROM_PTK_ID ||
		schemeElement?.id === CLOSE_FROM_PTK_ID;

	const highResistance = schemeElement?.resistance === HIGH_RESISTANCE;

	return (
		<button
			className={`${styles.element} ${styles[id]} ${
				!activeProb && styles.element_hover
			} ${
				highResistance && taskElements && styles.element__highResistance
			}
					${!highResistance && taskElements && styles.element__baseResistance}`}
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
