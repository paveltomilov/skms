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
import { WINDOWS } from '@/shared/configs/window';
import Gate from '@/shared/UI/Gate';
import ShapeComponent from '@/shared/UI/icons/ShapeComponent';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
}

const KALeftTop: FC<Props> = ({ className }) => {
	const handleModalNotification = useShowModal('notification');
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.textSpan}>
				<ShapeComponent text="БСУ" shape="trapezoid" />
			</div>
			<div className={styles.thirdWindows}>
				{thirdWindowsTop.map((window, index) => (
					<Window key={index} data={window} right />
				))}
			</div>
			<div className={styles.lettersRow}>
				{lettersConfigTop.map((letter, index) => (
					<span key={index}>{letter}</span>
				))}
			</div>
			<div className={styles.windowsGrid}>
				<div className={styles.firstWindows}>
					{firstWindowsTop.map((window, index) => (
						<Window key={index} data={window} right />
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
					{secondWindowsTop.map((window, index) => (
						<div key={index}>
							<Window data={window} right />
						</div>
					))}
				</div>
			</div>
			<div className={styles.windowGateContainer}>
				<WindowCircleCard
					maxValue={WINDOWS.w112.maxValue}
					minValue={WINDOWS.w112.minValue}
					value1={WINDOWS.w112.currentValue1}
					value2={WINDOWS.w112.currentValue2}
					color="blue"
				/>
				<div className={styles.gateContainer}>
					<Gate
						state="close"
						position="vertical"
						textRight="1АСБ-1"
					/>
					<Gate
						state="close"
						position="vertical"
						textRight="1АСБ-2"
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
					<Window data={WINDOWS.w111} right />
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
