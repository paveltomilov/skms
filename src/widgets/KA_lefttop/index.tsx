import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import {
	buttonsConfigTop,
	firstWindowsTop,
	lettersConfigTop,
	secondWindowsTop,
	thirdWindowsTop,
	tildaConfigTop,
} from '@/shared/configs/KALeftTop';
import Window from '@/shared/UI/Window';
import Tilde from '@/shared/UI/icons/Tilde';
import Button from '@/shared/UI/Button';
import WindowCircleCard from '@/shared/UI/WindowCircleCard';
import { WindowsState } from '@/shared/configs/window';
import Gate from '@/shared/UI/Gate';
import ShapeComponent from '@/shared/UI/icons/ShapeComponent';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import useShowModal from '@/shared/hooks/useShowModal';
import { RootState } from '@/store/store';

interface Props {
	className?: string;
	windows: WindowsState;
}

const KALeftTop: FC<Props> = ({ className, windows }) => {
	const { g11, g12 } = useAppSelector((state: RootState) => state.gate.gates);

	const openGatePopup = useOpenGatePopup();

	const handleModalNotification = useShowModal('notification');
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.textSpan}>
				<ShapeComponent text="БСУ" shape="trapezoid" />
			</div>
			<div className={styles.thirdWindows}>
				{thirdWindowsTop.map(id => (
					<Window key={id} data={windows[id]} right />
				))}
			</div>
			<div className={styles.lettersRow}>
				{lettersConfigTop.map((letter, index) => (
					<span key={index}>{letter}</span>
				))}
			</div>
			<div className={styles.windowsGrid}>
				<div className={styles.firstWindows}>
					{firstWindowsTop.map(id => (
						<Window key={id} data={windows[id]} right />
					))}
				</div>
				<div className={styles.tildaContainer}>
					{tildaConfigTop.map((tilda, index) => (
						<Tilde
							key={index}
							size="sm"
							color={tilda.color}
							disable={tilda.disabled}
						/>
					))}
				</div>
				<div className={styles.secondWindows}>
					{secondWindowsTop.map(id => (
						<div key={id}>
							<Window data={windows[id]} right />
						</div>
					))}
				</div>
			</div>
			<div className={styles.windowGateContainer}>
				<WindowCircleCard
					maxValue={windows.w112_1.maxValue}
					minValue={windows.w112_2.minValue}
					value1={windows.w112_1.currentValue}
					value2={windows.w112_2.currentValue}
					color="blue"
				/>
				<div className={styles.gateContainer}>
					<Gate
						state={g11.states}
						position="vertical"
						textRight={g11.name}
						onClick={() => openGatePopup('g11')}
					/>
					<Gate
						state={g12.states}
						position="vertical"
						textRight={g12.name}
						onClick={() => openGatePopup('g12')}
					/>
				</div>
				<span className={styles.windowGateContainer__text}>
					Аварийный <br /> слив
				</span>
			</div>
			<div className={styles.psuSumContainer}>
				<div className={styles.psuBlock}>
					<ShapeComponent
						text="ПСУ"
						shape="rectangle"
						width={174}
						height={16}
					/>
					<ShapeComponent shape="rectangle" width={44} height={16} />
				</div>
				<div className={styles.sumBlock}>
					<span className={styles.sumLabel}>Сум.</span>
					<Window data={windows.w111} right />
				</div>
			</div>
			<div className={styles.buttonsContainer}>
				{buttonsConfigTop.map((btn, index) => (
					<Button
						key={index}
						width={76}
						height={18}
						text={btn.text}
						className={cn(styles.btn, styles[btn.bgClass])}
						onClick={handleModalNotification}
					/>
				))}
			</div>
		</div>
	);
};

export default KALeftTop;
