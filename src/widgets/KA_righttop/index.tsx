import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Window from '@/shared/UI/Window';
import { WindowsState } from '@/shared/configs/window';
import Gate from '@/shared/UI/Gate';
import { GATES } from '@/shared/configs/gate';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import Button from '@/shared/UI/Button';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
	windows: WindowsState;
}

const KARightTop: FC<Props> = ({ className, windows }) => {
	const openGatePopup = useOpenGatePopup();
	const handleModalNotification = useShowModal('notification');
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowTop}>
				<span className={styles.windowTop__text}>Пар в турбину</span>
				<div className={styles.windowTop__boxGate}>
					<Gate
						state={GATES.g14.states}
						textTop={GATES.g14.name}
						disable
						onClick={() => openGatePopup('g14')}
					/>
					<Gate
						state={GATES.g15.states}
						textTop={GATES.g15.name}
						disable
						onClick={() => openGatePopup('g15')}
					/>
				</div>
				<span className={styles.windowTop__text}>
					Свеча в атмосферу
				</span>
				<span className={styles.windowTop__text}>Пар в турбину</span>
			</div>
			<div className={styles.windowMiddle}>
				<div className={styles.windowMiddle__wrapperWindow}>
					<span className={styles.word}>А</span>
					<Window data={windows.w183} right />
					<Window data={windows.w184} right />
					<Window data={windows.w185} right />
				</div>
				<div className={styles.windowMiddle__boxGate}>
					<Gate className={styles.gate} state="magenta" power />
					<Gate className={styles.gate} state="magenta" power />
					<Gate className={styles.gate} state="magenta" power />
					<Gate className={styles.gate} state="magenta" power />
				</div>
				<div className={styles.windowMiddle__wrapperWindow}>
					<span className={styles.word}>Б</span>
					<Window data={windows.w189} right />
					<Window data={windows.w200} right />
					<Window data={windows.w201} right />
				</div>
				<div className={styles.windowMiddle__right}>
					<Window data={windows.w202} right />
					<Window data={windows.w203} right />
				</div>
			</div>
			<div className={styles.windowBottom}>
				<div className={styles.windowBottom__box}>
					<span className={styles.text}>Нагрузка котла</span>
					<div className={styles.wrapperWindow}>
						<Window data={windows.w186} right />
						<Window data={windows.w187} right />
					</div>
				</div>
				<div className={styles.windowBottom__bottom}>
					<Window
						className={styles.window}
						data={windows.w181}
						right
						colorText="white"
					/>
					<span className={styles.text}>Сниженный узел питания</span>
					<Button
						className={styles.button}
						text="ПИТ"
						width={92}
						height={28}
						onClick={handleModalNotification}
					/>
				</div>
			</div>
		</div>
	);
};

export default KARightTop;
