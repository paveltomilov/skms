import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import WindowRectCard from '@/shared/UI/WindowRectCard';
import { WINDOWS } from '@/shared/configs/window';
import { GATES } from '@/shared/configs/gate';
import ArrowButton from '@/shared/UI/Actuator';

interface Props {
	className?: string;
}

const TAMidMId: FC<Props> = ({ className }) => {
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
					<Window
						color="blue"
						value={WINDOWS.w41.currentValue}
						textRight={WINDOWS.w41.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w45.currentValue}
						textRight={WINDOWS.w45.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w50.currentValue}
						textRight={WINDOWS.w50.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w52.currentValue}
						textRight={WINDOWS.w52.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w53.currentValue}
						textRight={WINDOWS.w53.unitsMeasurement}
					/>
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
					<Window
						color="blue"
						value={WINDOWS.w42.currentValue}
						textRight={WINDOWS.w42.unitsMeasurement}
					/>
					<div className={styles.rectAndWindow}>
						<WindowRectCard
							color="yellow"
							maxValue={WINDOWS.w46.maxValue}
							minValue={WINDOWS.w46.minValue}
							value={WINDOWS.w46.currentValue}
							title={WINDOWS.w46.unitsMeasurement}
						/>
						<Window
							color="blue"
							value={WINDOWS.w47.currentValue}
							textRight={WINDOWS.w47.unitsMeasurement}
						/>
					</div>
					<div className={styles.middleSection__arrowButtons}>
						<ArrowButton
							transform="rotateLeft90"
							state={'off'}
							textBottom="КНБ-1В"
						/>
						<ArrowButton
							transform="rotateLeft90"
							state={'off'}
							textBottom="КНБ-1Г"
						/>
					</div>
				</section>

				{/* 4-й столбец: средний правый блок */}
				<section className={styles.rightMiddleSection}>
					<Window
						color="blue"
						value={WINDOWS.w43.currentValue}
						textRight={WINDOWS.w43.unitsMeasurement}
					/>
					<WindowRectCard
						color="blue"
						maxValue={WINDOWS.w48.maxValue}
						minValue={WINDOWS.w48.minValue}
						value={WINDOWS.w48.currentValue}
						title={WINDOWS.w48.unitsMeasurement}
					/>
					<div className={styles.rightMiddleSection__arrowButtons}>
						<ArrowButton
							transform="rotateLeft90"
							textBottom="КНБ-1А"
						/>
						<ArrowButton
							transform="rotateLeft90"
							state={'off'}
							textBottom="КНБ-1Б"
						/>
					</div>
				</section>

				{/* 5-й столбец: окна справа + кнопка */}
				<section className={styles.windowsRight}>
					<Window
						color="blue"
						value={WINDOWS.w44.currentValue}
						textRight={WINDOWS.w44.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w49.currentValue}
						textRight={WINDOWS.w49.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w51.currentValue}
						textRight={WINDOWS.w51.unitsMeasurement}
					/>
					<Button
						width={88}
						height={28}
						text="ПСГ"
						className={styles.windowsRight__btn}
					/>
				</section>
				<span className={styles.textLabelBottom}>Обратная СВ</span>
			</section>

			{/* Нижний блок с 7 колонками */}
			<section className={styles.bottomGrid}>
				<div className={styles.bottomGroup}>
					<Button width={88} height={28} text="ПНД" />
					<Window
						color="blue"
						value={WINDOWS.w57.currentValue}
						textRight={WINDOWS.w57.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w61.currentValue}
						textRight={WINDOWS.w61.unitsMeasurement}
					/>
				</div>

				<section className={styles.bottomSelect}>
					<h3 className={styles.textLabel}>V отб.</h3>
					<Window
						color="blue"
						value={WINDOWS.w54.currentValue}
						textRight={WINDOWS.w54.unitsMeasurement}
					/>
					<WindowRectCard
						color="yellow"
						maxValue={WINDOWS.w58.maxValue}
						minValue={WINDOWS.w58.minValue}
						value={WINDOWS.w58.currentValue}
						title={WINDOWS.w58.unitsMeasurement}
					/>
				</section>

				<Gate
					state={GATES.g4.state}
					textTop={GATES.g4.name}
					position="vertical"
				/>

				<section className={styles.bottomSelect}>
					<h3 className={styles.textLabel}>VI отб.</h3>
					<Window
						color="blue"
						value={WINDOWS.w55.currentValue}
						textRight={WINDOWS.w55.unitsMeasurement}
					/>
					<WindowRectCard
						color="blue"
						maxValue={WINDOWS.w59.maxValue}
						minValue={WINDOWS.w59.minValue}
						value={WINDOWS.w59.currentValue}
						title={WINDOWS.w59.unitsMeasurement}
					/>
				</section>

				<Gate
					state={GATES.g5.state}
					textTop={GATES.g5.name}
					position="vertical"
				/>

				<section className={styles.bottomSelect}>
					<h3 className={styles.textLabel}>VII отб.</h3>
					<Window
						color="blue"
						value={WINDOWS.w56.currentValue}
						textRight={WINDOWS.w56.unitsMeasurement}
					/>
					<WindowRectCard
						color="blue"
						maxValue={WINDOWS.w60.maxValue}
						minValue={WINDOWS.w60.minValue}
						value={WINDOWS.w60.currentValue}
						title={WINDOWS.w60.unitsMeasurement}
					/>
				</section>
			</section>
		</div>
	);
};

export default TAMidMId;
