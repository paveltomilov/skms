import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import { WindowsState } from '@/shared/configs/window';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import useShowModal from '@/shared/hooks/useShowModal';
import { useIsSimulationActive } from '@/shared/hooks/useIsSimulationActive';

interface Props {
	className?: string;
	windows: WindowsState;
}

const TALeftTop: FC<Props> = ({ className, windows }) => {
	const { g1 } = useAppSelector(state => state.gate.gates);
	const handleModalNotification = useShowModal('notification');

	const openGatePopup = useOpenGatePopup();
	const isSimulationActive = useIsSimulationActive();

	return (
		<div className={cn(className, styles.container)}>
			<Button
				width={88}
				height={28}
				text={'КА'}
				onClick={handleModalNotification}
			/>
			<p className={styles.container__p1}>ГПП</p>
			<div className={styles.windowTop}>
				<Window
					data={windows.w1}
					right
					className={styles.windowTop__right}
				/>
				<Window
					data={windows.w2}
					right
					className={styles.windowTop__right}
				/>
			</div>
			<div className={styles.windowMedium__p2}>
				<p className={styles.windowMedium__p2__B}>Б</p>
				<p className={styles.windowMedium__p3}>Свежий пар</p>
			</div>
			<div className={styles.windowMedium__left}>
				<Window data={windows.w3} right />
				<Window data={windows.w5} right />
			</div>
			<Gate
				state={g1.states}
				textBottom={g1.name}
				onClick={() => openGatePopup('g1')}
				className={styles.gate}
				malfunctions={g1.malfunctions}
				errorBlink={isSimulationActive}
			/>
			<div className={styles.windowMedium__right}>
				<Window data={windows.w4} right />
				<Window data={windows.w6} right />
				<p className={styles.windowMedium__right__p}>СКВД-2</p>
			</div>
			<div className={styles.windowMediumBottom}>
				<p className={styles.windowMediumBottom__p1}>ХПП</p>
				<Window
					data={windows.w7}
					right
					className={styles.windowMediumBottom__one}
				/>
				<div className={styles.windowMediumBottom__two}>
					<Window data={windows.w8} right />
					<Window
						data={windows.w9}
						right
						className={styles.windowMediumBottom__three}
					/>
				</div>
				<div className={styles.windowMediumBottom__four}>
					<Window data={windows.w10} right />
					<Window data={windows.w11} bottom />
					<p className={styles.windowMediumBottom__p2}>ЦВД</p>
				</div>
			</div>
			<div className={styles.windowBottom}>
				<p>ГПП</p>
				<div className={styles.windowBottom__right}>
					<Window data={windows.w12} right />
					<div className={styles.windowBottom__right__bottom}>
						<Window data={windows.w13} right />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TALeftTop;
