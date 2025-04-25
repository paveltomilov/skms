'use client';

import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { defaultButtons } from '@/shared/configs/popup';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { closePopup } from '@/store/popupSlice';
import SchemeIcon from '@/shared/UI/icons/SchemeIcon';

const PopUp: FC = () => {
	const dispatch = useAppDispatch();
	const { content, isOpen } = useAppSelector(state => state.popup);

	useEffect(() => {
		const handleEscClose = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				dispatch(closePopup());
			}
		};

		document.addEventListener('keydown', handleEscClose);

		return () => {
			document.removeEventListener('keydown', handleEscClose);
		};
	}, [dispatch]);

	if (!isOpen || !content) return null;

	const { id, icon, title, buttons } = content;

	const displayButtons = buttons
		? [...defaultButtons, ...buttons]
		: defaultButtons;

	// поменять на номальный обработчик
	const handleClick = (text: string) => console.log(text);

	return (
		<div className={styles.popup}>
			<div className={styles.window}>
				<div className={styles.window__icon}>
					<span className={styles.window__icon_id}>{id}</span>
					<SchemeIcon type={icon} shadow />
				</div>
				<div className={styles.window__box}>
					<p className={styles.window__box_title}>{title}</p>
				</div>
			</div>

			{displayButtons.map(button => (
				<Button
					key={button.id}
					id={button.id}
					width={245}
					height={35}
					text={button.text}
					className={styles.popup__btn}
					onClick={() => handleClick(button.text)}
				/>
			))}
		</div>
	);
};

export default PopUp;
