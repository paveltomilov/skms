'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { PopupContent } from '@/shared/types/popup';
import { ISchemeElement } from '@/shared/types/scheme';

interface Prop {
	element: ISchemeElement;
}

export const SchemeElement: FC<Prop> = ({ element }) => {
	const { id, icon, title } = element;

	const dispatch = useAppDispatch();

	const handleOpenPopup = (content: PopupContent | null = null) => {
		dispatch(openPopup({ isOpen: true, content }));
	};

	return (
		<button
			className={`${styles.schemeElement} ${styles[id]}`}
			id={id}
			onClick={() =>
				handleOpenPopup({
					id,
					icon,
					title,
					buttons: [
						{
							id: 'btn4',
							width: 238,
							height: 35,
							text: 'ОК',
						},
						{
							id: 'btn5',
							width: 238,
							height: 35,
							text: 'дополнительная кнопка',
						},
						{
							id: 'btn6',
							width: 238,
							height: 35,
							text: 'дополнительная кнопка',
						},
						{
							id: 'btn7',
							width: 238,
							height: 35,
							text: 'дополнительная кнопка',
						},
					],
				})
			}
		></button>
	);
};
