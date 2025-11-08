'use client';

import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Tilde from '@/shared/UI/icons/Tilde';
import Window from '@/shared/UI/Window';
import { WindowsState } from '@/shared/configs/window';

interface Props {
	className?: string;
	windows: WindowsState;
}

const TARightTop: FC<Props> = ({ className, windows }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.blockCND}>
				<Window data={windows.w68} right colorText="white" />
				<Window data={windows.w69} right colorText="white" />
				<span
					className={cn(
						className,
						styles.blockCND__text,
						styles.blockCND__center,
					)}
				>
					ЦНД
				</span>
				<Window data={windows.w72} right colorText="white" />
				<Window data={windows.w73} right colorText="white" />
				<div
					className={cn(
						styles.blockCND__center,
						styles.blockCND__kPa,
					)}
				>
					<Window data={windows.w74} right />
				</div>
			</div>
			<div className={styles.blockGenerator}>
				<div className={styles.blockGenerator__left}>
					<Window data={windows.w70} right />
					<Tilde size="md" />
					<span className={styles.blockGenerator__text}>
						Генератор
					</span>
				</div>
				<div className={styles.blockGenerator__right}>
					<Window data={windows.w71} right />
				</div>
			</div>
		</div>
	);
};

export default TARightTop;
