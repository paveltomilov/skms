import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';
import Gate from '@/shared/UI/Gate';
import { GATES } from '@/shared/configs/gate';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import Button from '@/shared/UI/Button';

interface Props {
	className?: string;
}

const KARightTop: FC<Props> = ({ className }) => {
	const openGatePopup = useOpenGatePopup();
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
					<Window
						color="blue"
						value={WINDOWS.w183.currentValue}
						textRight={WINDOWS.w183.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w184.currentValue}
						textRight={WINDOWS.w184.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w185.currentValue}
						textRight={WINDOWS.w185.unitsMeasurement}
					/>
				</div>
				<div className={styles.windowMiddle__boxGate}>
					<Gate className={styles.gate} state="magenta" power />
					<Gate className={styles.gate} state="magenta" power />
					<Gate className={styles.gate} state="magenta" power />
					<Gate className={styles.gate} state="magenta" power />
				</div>
				<div className={styles.windowMiddle__wrapperWindow}>
					<span className={styles.word}>Б</span>
					<Window
						color="blue"
						value={WINDOWS.w189.currentValue}
						textRight={WINDOWS.w189.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w200.currentValue}
						textRight={WINDOWS.w200.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w201.currentValue}
						textRight={WINDOWS.w201.unitsMeasurement}
					/>
				</div>
				<div className={styles.windowMiddle__right}>
					<Window
						color="blue"
						value={WINDOWS.w202.currentValue}
						textRight={WINDOWS.w202.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w203.currentValue}
						textRight={WINDOWS.w203.unitsMeasurement}
					/>
				</div>
			</div>
			<div className={styles.windowBottom}>
				<div className={styles.windowBottom__box}>
					<span className={styles.text}>
						Нагрузка котла
					</span>
					<div className={styles.wrapperWindow}>
						<Window
							color="blue"
							value={WINDOWS.w186.currentValue}
							textRight={WINDOWS.w186.unitsMeasurement}
						/>
						<Window
							color="blue"
							value={WINDOWS.w187.currentValue}
							textRight={WINDOWS.w187.unitsMeasurement}
						/>
					</div>
				</div>
				<div className={styles.windowBottom__bottom}>
					<Window
                        className={styles.window}
						color="blue"
						value={WINDOWS.w181.currentValue}
						textRight={WINDOWS.w181.unitsMeasurement}
					/>
					<span className={styles.text}>Сниженный узел питания</span>
					<Button className={styles.button} text="ПИТ" width={92} height={28} />
				</div>
			</div>
		</div>
	);
};

export default KARightTop;
