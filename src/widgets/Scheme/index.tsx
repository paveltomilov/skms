'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { PopupContent } from '@/shared/types/popup';

const Scheme: FC = () => {
	const dispatch = useAppDispatch();

	const handleOpenPopup = (content: PopupContent | null = null) => {
		dispatch(openPopup({ isOpen: true, content }));
	};

	return (
		<div className={styles.wrapper}>
			<Image
				src="/images/scheme.png"
				alt="Схема"
				width={1053.33}
				height={693.6}
			/>
			<Image
				src="/images/functional-scheme.png"
				alt="Функциональность"
				width={166}
				height={504}
			/>
			<button
				className={styles.mockButton}
				onClick={() =>
					handleOpenPopup({
						id: 'YB08',
						icon: 2,
						title: 'Какое-то название',
						buttons: [
							{ id: 'btn4', width: 238, height: 35, text: 'ОК' },
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
		</div>
	);
};
export default Scheme;
