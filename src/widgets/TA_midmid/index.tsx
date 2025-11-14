import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import WindowRectCard from '@/shared/UI/WindowRectCard';
import { WINDOWS } from '@/shared/configs/window';
import Actuator from '@/shared/UI/Actuator';
import { ACTUATORS } from '@/shared/configs/actuator';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
}

const TAMidMId: FC<Props> = ({ className }) => {
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
					<Window data={WINDOWS.w41} right />
					<Window data={WINDOWS.w45} right />
					<Window data={WINDOWS.w50} right />
					<Window data={WINDOWS.w52} right />
					<Window data={WINDOWS.w53} right />
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
					<Window data={WINDOWS.w42} right />
					<div className={styles.rectAndWindow}>
						<WindowRectCard
							color="yellow"
							maxValue={WINDOWS.w46.maxValue}
							minValue={WINDOWS.w46.minValue}
							currentValue={WINDOWS.w46.currentValue}
							unitsMeasurement={WINDOWS.w46.unitsMeasurement}
							title={WINDOWS.w46.title}
						/>
						<Window data={WINDOWS.w47} right />
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
					<Window data={WINDOWS.w43} right />
					<WindowRectCard
						maxValue={WINDOWS.w48.maxValue}
						minValue={WINDOWS.w48.minValue}
						currentValue={WINDOWS.w48.currentValue}
						unitsMeasurement={WINDOWS.w48.unitsMeasurement}
						title={WINDOWS.w48.title}
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
					<Window data={WINDOWS.w44} right />
					<Window data={WINDOWS.w49} right />
					<Window data={WINDOWS.w51} right />
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
					<Window data={WINDOWS.w57} right />
					<Window data={WINDOWS.w61} right />
				</div>

				<section className={styles.bottomSelect}>
					<h3 className={styles.textLabel}>V отб.</h3>
					<Window data={WINDOWS.w54} right />
					<WindowRectCard
						color="yellow"
						maxValue={WINDOWS.w58.maxValue}
						minValue={WINDOWS.w58.minValue}
						currentValue={WINDOWS.w58.currentValue}
						unitsMeasurement={WINDOWS.w58.unitsMeasurement}
						title={WINDOWS.w58.title}
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
					<Window data={WINDOWS.w55} right />
					<WindowRectCard
						maxValue={WINDOWS.w59.maxValue}
						minValue={WINDOWS.w59.minValue}
						currentValue={WINDOWS.w59.currentValue}
						unitsMeasurement={WINDOWS.w59.unitsMeasurement}
						title={WINDOWS.w59.title}
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
					<Window data={WINDOWS.w56} right />
					<WindowRectCard
						maxValue={WINDOWS.w60.maxValue}
						minValue={WINDOWS.w60.minValue}
						currentValue={WINDOWS.w60.currentValue}
						unitsMeasurement={WINDOWS.w60.unitsMeasurement}
						title={WINDOWS.w60.title}
					/>
				</section>
			</section>
		</div>
	);
};

export default TAMidMId;
