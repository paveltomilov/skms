'use client';

import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Tilde from '@/shared/UI/icons/Tilde';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';

interface Props {
	className?: string;
}

const TARightTop: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.blockCND}>
				<Window
					color="blue"
					value={WINDOWS.w68.currentValue}
					textRight={WINDOWS.w68.unitsMeasurement}
					colorText="white"
				/>
				<Window
					color="blue"
					value={WINDOWS.w69.currentValue}
					textRight={WINDOWS.w69.unitsMeasurement}
					colorText="white"
				/>
				<span
					className={cn(
						className,
						styles.blockCND__text,
						styles.blockCND__center,
					)}
				>
					ЦНД
				</span>
				<Window
					color="blue"
					value={WINDOWS.w72.currentValue}
					textRight={WINDOWS.w72.unitsMeasurement}
					colorText="white"
				/>
				<Window
					color="blue"
					value={WINDOWS.w73.currentValue}
					textRight={WINDOWS.w73.unitsMeasurement}
					colorText="white"
				/>
				<div
					className={cn(
						styles.blockCND__center,
						styles.blockCND__kPa,
					)}
				>
					<Window
						color="blue"
						value={WINDOWS.w74.currentValue}
						textRight={WINDOWS.w74.unitsMeasurement}
					/>
				</div>
			</div>
			<div className={styles.blockGenerator}>
				<div className={styles.blockGenerator__left}>
					<Window
						color="blue"
						value={WINDOWS.w70.currentValue}
						textRight={WINDOWS.w70.unitsMeasurement}
					/>
					<Tilde size="md" />
					<span className={styles.blockGenerator__text}>
						Генератор
					</span>
				</div>
				<div className={styles.blockGenerator__right}>
					<Window
						color="blue"
						value={WINDOWS.w71.currentValue}
						textRight={WINDOWS.w71.unitsMeasurement}
					/>
				</div>
			</div>
		</div>
	);
};

export default TARightTop;
