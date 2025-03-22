'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { SettingBtns } from '@/shared/svg';
import { PopupBtn } from '@/shared/types/popupBtn';
import { defaultButtons } from '@/shared/configs/popup';
interface PopUpProps {
	isOpen: boolean;
	additionalButtons?: PopupBtn[];
}

const PopUp: FC<PopUpProps> = ({ isOpen, additionalButtons = [] }) => {
	const displayButtons = [...defaultButtons, ...additionalButtons];

	if (!isOpen) return null;

	return (
		<div className={styles.popup}>
			<div className={styles.popup__window}>
				<div className={styles.popup__window__element}>
					<p className={styles.popup__window__element__p}>
						<span
							className={styles.popup__window__element__p__span}
						>
							YB08
						</span>
					</p>
					<div className={styles.popup__window__element__wrapper}>
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
								Какое-то название
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
