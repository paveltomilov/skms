import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';
import { ACTUATORS } from '@/shared/configs/actuator';
import Actuator from '@/shared/UI/Actuator';
import Gate from '@/shared/UI/Gate';
import { GATES } from '@/shared/configs/gate';
import Attention from '@/shared/UI/icons/Attention';
import Rectangle from '@/shared/UI/icons/Rectangle';

interface Props {
	className?: string;
}

const TAMidDown: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowsTop}>
				<Button
					width={88}
					height={28}
					text="ПДУ"
					className={styles.windowsTop__btn}
				/>
			</div>
			<div className={styles.windowsBottom}>
				<section className={styles.windowsBottom__pump}>
					<Window
						className={styles.flexRow}
						color="blue"
						value={WINDOWS.w62.currentValue}
						textRight={WINDOWS.w62.unitsMeasurement}
					/>
					<div className={styles.windowsBottom__actuator}>
						<Actuator
							transform="rotateLeft90"
							state={ACTUATORS.a6.state}
							textBottomRight={ACTUATORS.a6.name}
						/>
						<Window
							color="blue"
							value={WINDOWS.w64.currentValue}
							textBottom={WINDOWS.w64.unitsMeasurement}
							textLeft={'dP'}
						/>
					</div>
					<Gate
						className={styles.windowsBottom__gate}
						state={GATES.g9.state}
						textRight={GATES.g9.name}
						position="vertical"
					/>
				</section>
				<section className={styles.windowsBottom__pump}>
					<Window
						className={styles.flexRow}
						color="blue"
						value={WINDOWS.w63.currentValue}
						textRight={WINDOWS.w63.unitsMeasurement}
					/>
					<div className={styles.windowsBottom__actuator}>
						<Actuator
							transform="rotateLeft90"
							state={ACTUATORS.a7.state}
							textBottomRight={ACTUATORS.a7.name}
						/>
						<Window
							color="blue"
							value={WINDOWS.w65.currentValue}
							textBottom={WINDOWS.w65.unitsMeasurement}
							textLeft={'dP'}
						/>
					</div>
					<Gate
						className={styles.windowsBottom__gate}
						state={GATES.g10.state}
						textRight={GATES.g10.name}
						position="vertical"
					/>
				</section>
				<section className={styles.windowsBottom__info}>
					<Button
						width={88}
						height={28}
						text="ПЭН-В"
						className={styles.windowsBottom__btn}
					/>
					<div className={styles.windowsBottom__frame}>
						<Window
							className={styles.flexRow}
							color="blue"
							value={WINDOWS.w66.currentValue}
							textRight={WINDOWS.w66.unitsMeasurement}
						/>
						<Rectangle />
						<Window
							className={styles.flexRow}
							color="blue"
							value={WINDOWS.w67.currentValue}
							textRight={WINDOWS.w67.unitsMeasurement}
						/>
						<Attention
							size="lg"
							className={styles.windowsBottom__attention}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default TAMidDown;
