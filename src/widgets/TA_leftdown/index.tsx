'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import WindowRectCard from '@/shared/UI/WindowRectCard';
import Window from '@/shared/UI/Window';
import Button from '@/shared/UI/Button';
import ArrowButton from '@/shared/UI/Actuator';
import { WINDOWS } from '@/shared/configs/window';
import { useAppSelector } from '@/shared/hooks/store';

interface Props {
	className?: string;
}

const TALeftDown: FC<Props> = ({ className }) => {
	const { g7, g6, g8 } = useAppSelector(state => state.gate);

	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.gates}>
				<Gate
					className={styles.gates__left}
					state={g7.states}
					position="vertical"
					textLeft={g7.name}
				/>
				<Gate
					className={styles.gates__mid}
					state={g6.states}
					position="vertical"
					textLeft={g6.name}
				/>
				<Gate
					className={styles.gates__right}
					state={g8.states}
					position="vertical"
					textRight={g8.name}
				/>
			</div>
			<div className={styles.cards}>
				<WindowRectCard
					color="blue"
					title={WINDOWS.w27.title}
					currentValue={WINDOWS.w27.currentValue}
					unitsMeasurement={WINDOWS.w27.unitsMeasurement}
					minValue={WINDOWS.w27.minValue}
					maxValue={WINDOWS.w27.maxValue}
					className={styles.cards__leftup}
				/>
				<WindowRectCard
					color="blue"
					title={WINDOWS.w32.title}
					currentValue={WINDOWS.w32.currentValue}
					unitsMeasurement={WINDOWS.w32.unitsMeasurement}
					minValue={WINDOWS.w32.minValue}
					maxValue={WINDOWS.w32.maxValue}
					className={styles.cards__leftmid}
				/>
				<WindowRectCard
					color="blue"
					title={WINDOWS.w30.title}
					currentValue={WINDOWS.w30.currentValue}
					unitsMeasurement={WINDOWS.w30.unitsMeasurement}
					minValue={WINDOWS.w30.minValue}
					maxValue={WINDOWS.w30.maxValue}
					className={styles.cards__leftdown}
				/>
				<WindowRectCard
					color="blue"
					currentValue={WINDOWS.w29.currentValue}
					unitsMeasurement={WINDOWS.w29.unitsMeasurement}
					minValue={WINDOWS.w29.minValue}
					maxValue={WINDOWS.w29.maxValue}
					className={styles.cards__right}
				/>
			</div>
			<div className={styles.windows}>
				<div className={styles.windows__leftup}>
					<Window
						color="blue"
						value={WINDOWS.w28.currentValue}
						textRight={WINDOWS.w28.unitsMeasurement}
					/>
				</div>
				<div className={styles.windows__leftmid}>
					<Window
						color="blue"
						value={WINDOWS.w31.currentValue}
						textRight={WINDOWS.w31.unitsMeasurement}
					/>
				</div>
				<div className={styles.windows__leftdown}>
					<Window
						color="blue"
						value={WINDOWS.w33.currentValue}
						textRight={WINDOWS.w33.unitsMeasurement}
					/>
				</div>
				<div className={styles.windows__midup}>
					<Window
						color="blue"
						value={WINDOWS.w34.currentValue}
						textRight={WINDOWS.w34.unitsMeasurement}
					/>
				</div>
				<div className={styles.windows__middown}>
					<Window
						color="blue"
						value={WINDOWS.w35.currentValue}
						textRight={WINDOWS.w35.unitsMeasurement}
					/>
				</div>
				<div className={styles.windows__rightup}>
					<Window
						color="blue"
						value={WINDOWS.w36.currentValue}
						textRight={WINDOWS.w36.unitsMeasurement}
					/>
				</div>
				<div className={styles.windows__rightdown}>
					<Window
						color="blue"
						value={WINDOWS.w37.currentValue}
						textBottom={WINDOWS.w37.unitsMeasurement}
						textLeft="dP"
					/>
				</div>
			</div>
			<div className={styles.text}>
				<span>I отб.</span>
				<span>II отб.</span>
				<span>III отб.</span>
			</div>
			<Button
				width={88}
				height={28}
				text="ПВД"
				className={styles.button}
			/>
			<ArrowButton
				state="off"
				textBottomRight="ПЭН-1А"
				transform="rotateLeft90"
				className={styles.arrow}
			/>
		</div>
	);
};

export default TALeftDown;
