import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import { WindowsState } from '@/shared/configs/window';
import { ACTUATORS } from '@/shared/configs/actuator';
import Actuator from '@/shared/UI/Actuator';
import Gate from '@/shared/UI/Gate';
import Attention from '@/shared/UI/icons/Attention';
import Rectangle from '@/shared/UI/icons/Rectangle';
import { UnitsMeasurement } from '@/shared/types/window';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
	windows: WindowsState;
}
const dropPressure: UnitsMeasurement = 'dP';

const TAMidDown: FC<Props> = ({ className, windows}) => {
	const { g9, g10 } = useAppSelector(state => state.gate.gates);
	const handleModalNotification = useShowModal('notification');

	const openGatePopup = useOpenGatePopup();
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowsTop}>
				<Button
					width={88}
					height={28}
					text="ПДУ"
					className={styles.windowsTop__btn}
					onClick={handleModalNotification}
				/>
			</div>
			<div className={styles.windowsBottom}>
				<div className={styles.windowsBottom__pump}>
					<Window
						className={styles.flexRow}
						data={windows.w62}
						right
					/>
					<div className={styles.windowsBottom__actuator}>
						<Actuator
							transform="rotateLeft90"
							state={ACTUATORS.a6.state}
							textBottomRight={ACTUATORS.a6.name}
						/>
						<Window
							data={windows.w64}
							bottom
							left
							textLeft={dropPressure}
						/>
					</div>
					<Gate
						className={styles.windowsBottom__gate}
						state={g9.states}
						textRight={g9.name}
						position="vertical"
						onClick={() => openGatePopup('g9')}
						malfunctions={g9.malfunctions}
					/>
				</div>
				<div className={styles.windowsBottom__pump}>
					<Window
						className={styles.flexRow}
						data={windows.w63}
						right
					/>
					<div className={styles.windowsBottom__actuatorRight}>
						<Actuator
							transform="rotateLeft90"
							state={ACTUATORS.a7.state}
							textBottomRight={ACTUATORS.a7.name}
						/>
						<Window
							data={windows.w65}
							right
							left
							textLeft={dropPressure}
						/>
					</div>
					<Gate
						className={styles.windowsBottom__gate}
						state={g10.states}
						textRight={g10.name}
						position="vertical"
						onClick={() => openGatePopup('g10')}
						malfunctions={g10.malfunctions}
					/>
				</div>
				<div className={styles.windowsBottom__info}>
					<Button
						width={88}
						height={28}
						text="ПЭН-В"
						className={styles.windowsBottom__btn}
						onClick={handleModalNotification}
					/>
					<div className={styles.windowsBottom__frame}>
						<Window
							className={styles.flexRow}
							data={windows.w66}
							right
						/>
						<Rectangle />
						<Window
							className={styles.flexRow}
							data={windows.w67}
							right
						/>
						<Attention
							size="lg"
							className={styles.windowsBottom__attention}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TAMidDown;
