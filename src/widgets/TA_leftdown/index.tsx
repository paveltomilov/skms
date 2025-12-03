import { FC } from 'react';
import styles from './styles.module.scss';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import WindowRectCard from '@/shared/UI/WindowRectCard';
import Window from '@/shared/UI/Window';
import Button from '@/shared/UI/Button';
import ArrowButton from '@/shared/UI/Actuator';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import useShowModal from '@/shared/hooks/useShowModal';
import { WindowsState } from '@/shared/configs/window';

interface Props {
	className?: string;
	windows: WindowsState;
}

const TALeftDown: FC<Props> = ({ className, windows }) => {
	const { g7, g6, g8 } = useAppSelector(state => state.gate.gates);
	const handleModalNotification = useShowModal('notification');

	const openGatePopup = useOpenGatePopup();

	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.gates}>
				<Gate
					className={styles.gates__left}
					state={g7.states}
					position="vertical"
					textLeft={g7.name}
					onClick={() => openGatePopup('g7')}
				/>
				<Gate
					className={styles.gates__mid}
					state={g6.states}
					position="vertical"
					textLeft={g6.name}
					onClick={() => openGatePopup('g6')}
				/>
				<Gate
					className={styles.gates__right}
					state={g8.states}
					position="vertical"
					textRight={g8.name}
					onClick={() => openGatePopup('g8')}
				/>
			</div>
			<div className={styles.cards}>
				<WindowRectCard
					color="blue"
					title={windows.w27.title}
					currentValue={windows.w27.currentValue}
					unitsMeasurement={windows.w27.unitsMeasurement}
					minValue={windows.w27.minValue}
					maxValue={windows.w27.maxValue}
					className={styles.cards__leftup}
				/>
				<WindowRectCard
					color="blue"
					title={windows.w32.title}
					currentValue={windows.w32.currentValue}
					unitsMeasurement={windows.w32.unitsMeasurement}
					minValue={windows.w32.minValue}
					maxValue={windows.w32.maxValue}
					className={styles.cards__leftmid}
				/>
				<WindowRectCard
					color="blue"
					title={windows.w30.title}
					currentValue={windows.w30.currentValue}
					unitsMeasurement={windows.w30.unitsMeasurement}
					minValue={windows.w30.minValue}
					maxValue={windows.w30.maxValue}
					className={styles.cards__leftdown}
				/>
				<WindowRectCard
					color="blue"
					currentValue={windows.w29.currentValue}
					unitsMeasurement={windows.w29.unitsMeasurement}
					minValue={windows.w29.minValue}
					maxValue={windows.w29.maxValue}
					className={styles.cards__right}
				/>
			</div>
			<div className={styles.windows}>
				<div className={styles.windows__leftup}>
					<Window data={windows.w28} right />
				</div>
				<div className={styles.windows__leftmid}>
					<Window data={windows.w31} right />
				</div>
				<div className={styles.windows__leftdown}>
					<Window data={windows.w33} right />
				</div>
				<div className={styles.windows__midup}>
					<Window data={windows.w34} right />
				</div>
				<div className={styles.windows__middown}>
					<Window data={windows.w35} right />
				</div>
				<div className={styles.windows__rightup}>
					<Window data={windows.w36} right />
				</div>
				<div className={styles.windows__rightdown}>
					<Window data={windows.w37} bottom left textLeft="dP" />
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
				onClick={handleModalNotification}
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
