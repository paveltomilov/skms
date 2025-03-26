'use client';

import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { SettingBtns } from '@/shared/UI/svg';
import { defaultButtons } from '@/shared/configs/popup';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { closePopup } from '@/store/popupSlice';

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

	const { id, /* icon,  */ title, buttons } = content;

	const displayButtons = buttons
		? [...defaultButtons, ...buttons]
		: defaultButtons;

	return (
		<div className={styles.popup}>
			<div className={styles.popup__window}>
				<div className={styles.popup__window__element}>
					<p className={styles.popup__window__element__p}>
						<span
							className={styles.popup__window__element__p__span}
						>
							{id}
						</span>
					</p>
					<div className={styles.popup__window__element__wrapper}>
						{/* {icon} подумать как передавать иконки */}
						<SettingBtns />
						<div
							className={
								styles.popup__window__element__wrapper__textWrapper
							}
						>
							<p
								className={
									styles.popup__window__element__wrapper__textWrapper__text
								}
							>
								{title}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.popup__btns}>
				{displayButtons.map(button => (
					<Button
						key={button.id}
						id={button.id}
						width={button.width}
						height={button.height}
						text={button.text}
						className={styles.popup__btns__item}
						onClick={button.onClick}
					/>
				))}
			</div>
		</div>
	);
};

export default PopUp;
