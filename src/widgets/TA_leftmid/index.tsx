import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import Rectangle from '@/shared/UI/icons/Rectangle';
import { WINDOWS } from '@/shared/configs/window';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
}

const TAleftmid: FC<Props> = ({ className }) => {
	const { g2, g3 } = useAppSelector(state => state.gate.gates);
	const handleModalNotification = useShowModal('notification');

	const openGatePopup = useOpenGatePopup();

	return (
		<>
			<div className={cn(className)}>
				<div className={styles.container}>
					<h2 className={cn(styles['container__p2'])}>Свежий пар</h2>
					<h3
						className={cn(
							styles['container__p1'],
							styles['container__p1--modifierA'],
						)}
					>
						А
					</h3>

					<div
						className={cn(
							styles['container__window'],
							styles['container__window--left'],
						)}
					>
						<Window data={WINDOWS.w14} right />
						<Window data={WINDOWS.w16} right />
					</div>

					<Gate
						state={g2.states}
						textBottom={g2.name}
						className={styles.gate}
						onClick={() => openGatePopup('g2')}
					/>

					<div
						className={cn(
							styles['container__window'],
							styles['container__window--right'],
						)}
					>
						<Window data={WINDOWS.w15} right />
						<Window data={WINDOWS.w17} right />
					</div>
					<p className={styles['container__window-p']}>СКВД-1</p>
				</div>
				<div className={styles.containerTwo}>
					<h3 className={styles['containerTwo__p']}>ХПП</h3>
					<div className={styles['containerTwo__window']}>
						<Window data={WINDOWS.w18} right />
						<Window data={WINDOWS.w19} right />
					</div>
				</div>
				<div className={styles.containerThree}>
					<h4 className={styles['containerThree__p']}>в котел</h4>
					<Button
						width={88}
						height={28}
						text="ПИТ"
						onClick={handleModalNotification}
					/>
				</div>

				<div className={styles.containerFour}>
					<div className={styles['containerFour__window']}>
						<Window data={WINDOWS.w20} right />
						<Window data={WINDOWS.w21} right />
						<Window data={WINDOWS.w23} right />

						<Gate
							position="vertical"
							state={g3.states}
							textLeft={g3.name}
							onClick={() => openGatePopup('g3')}
							className={styles['containerFour__window-gate']}
						/>
					</div>

					<h4 className={styles['containerFour__p']}>КСН</h4>
					<Button
						width={88}
						height={28}
						text="РОУ"
						onClick={handleModalNotification}
					/>

					<div className={styles['containerFour__windowOne']}>
						<Window data={WINDOWS.w24} right />
						<Window data={WINDOWS.w25} right />
					</div>

					<div className={styles['containerFour__windowTwo']}>
						<Window data={WINDOWS.w22} right />
						<Rectangle
							color="white"
							className={
								styles['containerFour__windowTwo-rectangle']
							}
						/>
					</div>

					<div className={styles['containerFour__windowThree']}>
						<h5 className={styles['containerFour__windowThree-p2']}>
							IV отб.
						</h5>
						<div className={styles['containerFour__windowThree-w']}>
							<Window data={WINDOWS.w26} right />
						</div>
						<h5 className={styles['containerFour__windowThree-p3']}>
							ДПВ
						</h5>
					</div>
				</div>
			</div>
		</>
	);
};

export default TAleftmid;
