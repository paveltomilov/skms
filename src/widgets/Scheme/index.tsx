'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { PopupContent } from '@/shared/types/popup';
import { CircuitElements, Points } from '@/shared/configs/schemePart';
import { Point } from '@/entities/Point';

const Scheme: FC = () => {
	const dispatch = useAppDispatch();

	const handleOpenPopup = (content: PopupContent | null = null) => {
		dispatch(openPopup({ isOpen: true, content }));
	};

	return (
		<div className={styles.scheme}>
			{CircuitElements.map(item => (
				<button
					key={item.id}
					className={`${styles.mockButton} ${styles[item.id]}`}
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
				<Point
					key={item.id}
					className={`${styles[item.id]}`}
					id={item.id}
				></Point>
			))}
		</div>
	);
};
export default Scheme;
