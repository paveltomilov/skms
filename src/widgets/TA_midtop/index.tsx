import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';

interface Props {
	className?: string;
}
const TAMidTop: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowsTop}>
				<span className={styles.windowsTop__test}>СКСД-2</span>
				<div className={styles.windowsTop__collector}>
					<span className={styles.windowsTop__collectorName}>
						Горячий коллектор уплотнений
					</span>
					<div className={styles.windowsTop__collectorSensors}>
						<Window color="blue" textRight="МПа" value={0.141} />
						<Window color="yellow" textRight="°С" value={385} />
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
			<div className={styles.windowsBottom}></div>
		</div>
	);
};

export default TAMidTop;
