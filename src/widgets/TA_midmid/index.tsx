import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import WindowRectCard from '@/shared/UI/WindowRectCard';
import { WindowsState } from '@/shared/configs/window';
import Actuator from '@/shared/UI/Actuator';
import { ACTUATORS } from '@/shared/configs/actuator';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
	windows: WindowsState;
}

const TAMidMId: FC<Props> = ({ className, windows }) => {
	const { g4, g5 } = useAppSelector(state => state.gate.gates);
	const handleModalNotification = useShowModal('notification');
	const openGatePopup = useOpenGatePopup();
	return (
		<div className={cn(className, styles.container)}>
			{/* Верхний блок с 5 колонками */}
			<section className={styles.topGrid}>
				{/* 1-й столбец: заголовки */}
				<div className={styles.topLabels}>
					<span className={styles.topLabels__label}>СКСД-1</span>
					<span className={styles.topLabels__secondaryLabel}>
						Прямая СВ
					</span>
					<span className={styles.topLabels__secondaryLabel}>
						Прямая за ТРУ
					</span>
				</div>

				{/* 2-й столбец: окна слева */}
				<section className={styles.windowsLeft}>
					<Window data={windows.w41} right />
					<Window data={windows.w45} right />
					<Window data={windows.w50} right />
					<Window data={windows.w52} right />
					<Window data={windows.w53} right />
				</section>

				{/* 3-й столбец: средний левый блок */}
				<section className={styles.middleSection}>
					<h3
						className={cn(
							styles.textLabel,
							styles['textLabel--H3'],
						)}
					>
						Отборы из ЦСД, ЦНД
					</h3>
					<Window data={windows.w42} right />
					<div className={styles.rectAndWindow}>
						<WindowRectCard
							color="yellow"
							maxValue={windows.w46.maxValue}
							minValue={windows.w46.minValue}
							currentValue={windows.w46.currentValue}
							unitsMeasurement={windows.w46.unitsMeasurement}
							title={windows.w46.title}
						/>
						<Window data={windows.w47} right />
					</div>
					<div className={styles.middleSection__arrowButtons}>
						<Actuator
							transform="rotateLeft90"
							state={ACTUATORS.a2.state}
							textBottomRight={ACTUATORS.a2.name}
						/>
						<Actuator
							transform="rotateLeft90"
							state={ACTUATORS.a3.state}
							textBottomRight={ACTUATORS.a3.name}
						/>
					</div>
				</section>

				{/* 4-й столбец: средний правый блок */}
				<section className={styles.rightMiddleSection}>
					<Window data={windows.w43} right />
					<WindowRectCard
						maxValue={windows.w48.maxValue}
						minValue={windows.w48.minValue}
						currentValue={windows.w48.currentValue}
						unitsMeasurement={windows.w48.unitsMeasurement}
						title={windows.w48.title}
					/>
					<div className={styles.rightMiddleSection__arrowButtons}>
						<Actuator
							transform="rotateLeft90"
							state={ACTUATORS.a4.state}
							textBottomRight={ACTUATORS.a5.name}
						/>
						<Actuator
							transform="rotateLeft90"
							state={ACTUATORS.a5.state}
							textBottomRight={ACTUATORS.a5.name}
						/>
					</div>
				</section>

				{/* 5-й столбец: окна справа + кнопка */}
				<section className={styles.windowsRight}>
					<Window data={windows.w44} right />
					<Window data={windows.w49} right />
					<Window data={windows.w51} right />
					<Button
						width={88}
						height={28}
						text="ПСГ"
						className={styles.windowsRight__btn}
						onClick={handleModalNotification}
					/>
				</section>
				<span className={styles.textLabelBottom}>Обратная СВ</span>
			</section>

			{/* Нижний блок с 7 колонками */}
			<section className={styles.bottomGrid}>
				<div className={styles.bottomGroup}>
					<Button
						width={88}
						height={28}
						text="ПНД"
						onClick={handleModalNotification}
					/>
					<Window data={windows.w57} right />
					<Window data={windows.w61} right />
				</div>

				<section className={styles.bottomSelect}>
					<h3 className={styles.textLabel}>V отб.</h3>
					<Window data={windows.w54} right />
					<WindowRectCard
						color="yellow"
						maxValue={windows.w58.maxValue}
						minValue={windows.w58.minValue}
						currentValue={windows.w58.currentValue}
						unitsMeasurement={windows.w58.unitsMeasurement}
						title={windows.w58.title}
					/>
				</section>

				<Gate
					state={g4.states}
					textTopLeft={g4.name}
					position="vertical"
					onClick={() => openGatePopup('g4')}
				/>

				<section className={styles.bottomSelect}>
					<h3 className={styles.textLabel}>VI отб.</h3>
					<Window data={windows.w55} right />
					<WindowRectCard
						maxValue={windows.w59.maxValue}
						minValue={windows.w59.minValue}
						currentValue={windows.w59.currentValue}
						unitsMeasurement={windows.w59.unitsMeasurement}
						title={windows.w59.title}
					/>
				</section>

				<Gate
					state={g5.states}
					textTopLeft={g5.name}
					position="vertical"
					onClick={() => openGatePopup('g5')}
				/>

				<section className={styles.bottomSelect}>
					<h3 className={styles.textLabel}>VII отб.</h3>
					<Window data={windows.w56} right />
					<WindowRectCard
						maxValue={windows.w60.maxValue}
						minValue={windows.w60.minValue}
						currentValue={windows.w60.currentValue}
						unitsMeasurement={windows.w60.unitsMeasurement}
						title={windows.w60.title}
					/>
				</section>
			</section>
		</div>
	);
};

export default TAMidMId;
