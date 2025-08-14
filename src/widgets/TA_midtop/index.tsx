import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';
import Button from '@/shared/UI/Button';
import ArrowPage from '@/shared/UI/icons/ArrowPage';

interface Props {
	className?: string;
}
const TAMidTop: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowsTop}>
				<span className={styles.windowsTop__text}>СКСД-2</span>
				<div className={styles.windowsTop__collector}>
					<span className={styles.windowsTop__collectorName}>
						Горячий коллектор уплотнений
					</span>
					<div className={styles.windowsTop__collectorSensors}>
						<Window
							color="blue"
							textRight={WINDOWS.w94.unitsMeasurement}
							value={WINDOWS.w94.currentValue}
						/>
						<Window
							color="yellow"
							textRight={WINDOWS.w95.unitsMeasurement}
							value={WINDOWS.w95.currentValue}
						/>
					</div>
				</div>
				<div className={styles.windowsTop__collector}>
					<span className={styles.windowsTop__collectorName}>
						Холодный коллектор уплотнений
					</span>
					<div className={styles.windowsTop__collectorSensors}>
						<Window
							color="blue"
							textRight={WINDOWS.w38.unitsMeasurement}
							value={WINDOWS.w38.currentValue}
						/>
						<Window
							color="yellow"
							textRight={WINDOWS.w39.unitsMeasurement}
							value={WINDOWS.w39.currentValue}
						/>
					</div>
				</div>
			</div>
			<div className={styles.windowsMiddle}>
				<Button text={'ТУРБ'} width={88} height={28} />
			</div>
			<div className={styles.windowsBottom}>
				<span className={styles.windowsBottom__CSD}>ЦСД</span>
				<div className={styles.windowsBottom__indicators}>
					<div className={styles.windowsBottom__indicators_left}>
						<span className={styles.windowsBottom__indicators_text}>
							Вибрация подшипников
						</span>
						<span className={styles.windowsBottom__indicators_text}>
							Осевой сдвиг
						</span>
						<span className={styles.windowsBottom__indicators_text}>
							Вода у газоохладителям
						</span>
					</div>
					<div className={styles.windowsBottom__indicators_right}>
						<div className={styles.windowsBottom__indicators_arrow}>
							<ArrowPage transform={'rotate90'} />

							<ArrowPage transform={'rotate180'} />
							<ArrowPage
								className={
									styles.windowsBottom__indicators_arrow_45
								}
							/>
						</div>
						<div className={styles.windowsBottom__indicators_lamp}>
							<div
								className={styles.windowsBottom__indicator}
							></div>
							<div
								className={styles.windowsBottom__indicator}
							></div>
							<div
								className={styles.windowsBottom__indicator}
							></div>
							<div
								className={styles.windowsBottom__indicator}
							></div>
							<div
								className={styles.windowsBottom__indicator}
							></div>
						</div>
						<Window
							className={styles.windowsBottom__indicators_window}
							color="blue"
							textRight={WINDOWS.w40.unitsMeasurement}
							value={WINDOWS.w40.currentValue}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TAMidTop;
