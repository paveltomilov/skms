'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { PopupContent } from '@/shared/types/popup';
import { Parts, Points } from '@/shared/configs/schemePart';

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

			{Parts.map((item) => (
				<button
					key={item.id}
					className={`${styles.mockButton}` + ` ${styles[item.id]}`}
					id={item.id}
					onClick={() =>
						handleOpenPopup({
							id: item.id,
							icon: item.icon,
							title: item.title,
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
			))}

			{Points.map(item => (
				<button
				key={item.id}
				className={`${styles.point}` + ` ${styles[item.id]}`}
				id={item.id}
			></button>
			))}
		</div>
	);
};
export default Scheme;
