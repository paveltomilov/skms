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
						<Window right data={WINDOWS.w94} />
						<Window color="yellow" right data={WINDOWS.w95} />
					</div>
				</div>
				<div className={styles.windowsTop__collector}>
					<span className={styles.windowsTop__collectorName}>
						Холодный коллектор уплотнений
					</span>
					<div className={styles.windowsTop__collectorSensors}>
						<Window right data={WINDOWS.w38} />
						<Window color="yellow" right data={WINDOWS.w39} />
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
							right
							data={WINDOWS.w40}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TAMidTop;
