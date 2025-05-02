'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { PopupContent } from '@/shared/types/popup';
import { ISchemeElement } from '@/shared/types/scheme';

interface Prop {
	element: ISchemeElement;
}

export const SchemeElement: FC<Prop> = ({ element }) => {
	const { id, icon, title, buttons } = element;
	const activeProb = useAppSelector(state => state.multimeter.activeProb);
	const dispatch = useAppDispatch();

	const handleOpenPopup = (content: PopupContent | null = null) => {
		dispatch(openPopup({ isOpen: true, content }));
	};

	return (
		<button
			className={`${styles.schemeElement} ${styles[id]} ${
				!activeProb && styles.hover
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
