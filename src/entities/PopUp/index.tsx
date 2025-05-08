'use client';

import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { defaultButtons } from '@/shared/configs/popup';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { closePopup } from '@/store/popupSlice';
import SchemeIcon from '@/shared/UI/icons/SchemeIcon';
import { setResistance, setVoltage } from '@/store/circuitSlice';

const PopUp: FC = () => {
	const dispatch = useAppDispatch();
	const { content, isOpen } = useAppSelector(state => state.popup);

	// для закрытия попапа клавишей esc
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

	// временные обработчики для проверки диспатчатся ли экшкны
	const handleChangeResistance = () => {
		// пока принимает захардкоженые значения (позже будут передаваться определенные значения в зависимости от действий пользователей)
		const mockResistanceValue = 5;
		dispatch(setResistance({ id, value: mockResistanceValue }));
	};

	const handleChangeVoltage = () => {
		// пока принимает захардкоженые значения (позже будут передаваться определенные значения в зависимости от действий пользователей)
		const mockVoltageValue = 220;
		dispatch(setVoltage({ id, value: mockVoltageValue }));
	};

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
				/>
			))}
			<Button
				id={id}
				width={245}
				height={35}
				text="изменить сопротивление"
				className={styles.popup__btn}
				onClick={handleChangeResistance}
			/>
			<Button
				id={id}
				width={245}
				height={35}
				text="изменить напряжение"
				className={styles.popup__btn}
				onClick={handleChangeVoltage}
			/>
		</div>
	);
};

export default PopUp;
