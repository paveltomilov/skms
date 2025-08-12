'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import Rectangle from '@/shared/UI/icons/Rectangle';
import { WINDOWS } from '@/shared/configs/window';
import { useAppSelector } from '@/shared/hooks/store';

interface Props {
	className?: string;
}

const TAleftmid: FC<Props> = ({ className }) => {
	const { g2, g3 } = useAppSelector(state => state.gate);
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
						<Window
							color="blue"
							value={WINDOWS.w14.currentValue}
							textRight={WINDOWS.w14.unitsMeasurement}
						/>
						<Window
							color="blue"
							value={WINDOWS.w16.currentValue}
							textRight={WINDOWS.w16.unitsMeasurement}
						/>
					</div>

					<Gate
						state={g2.states}
						textBottom={g2.name}
						className={styles.gate}
					/>

					<div
						className={cn(
							styles['container__window'],
							styles['container__window--right'],
						)}
					>
						<Window
							color="blue"
							value={WINDOWS.w15.currentValue}
							textRight={WINDOWS.w15.unitsMeasurement}
						/>
						<Window
							color="blue"
							value={WINDOWS.w17.currentValue}
							textRight={WINDOWS.w17.unitsMeasurement}
						/>
					</div>
					<p className={styles['container__window-p']}>СКВД-1</p>
				</div>
				<div className={styles.containerTwo}>
					<h3 className={styles['containerTwo__p']}>ХПП</h3>
					<div className={styles['containerTwo__window']}>
						<Window
							color="blue"
							value={WINDOWS.w18.currentValue}
							textRight={WINDOWS.w18.unitsMeasurement}
						/>
						<Window
							color="blue"
							value={WINDOWS.w19.currentValue}
							textRight={WINDOWS.w19.unitsMeasurement}
						/>
					</div>
				</div>
				<div className={styles.containerThree}>
					<h4 className={styles['containerThree__p']}>в котел</h4>
					<Button width={88} height={28} text="ПИТ" />
				</div>

				<div className={styles.containerFour}>
					<div className={styles['containerFour__window']}>
						<Window
							color="blue"
							value={WINDOWS.w20.currentValue}
							textRight={WINDOWS.w20.unitsMeasurement}
						/>
						<Window
							color="blue"
							value={WINDOWS.w21.currentValue}
							textRight={WINDOWS.w21.unitsMeasurement}
						/>
						<Window
							color="blue"
							value={WINDOWS.w23.currentValue}
							textRight={WINDOWS.w23.unitsMeasurement}
						/>

						<Gate
							position="vertical"
							state={g3.states}
							textLeft={g3.name}
							className={styles['containerFour__window-gate']}
						/>
					</div>

					<h4 className={styles['containerFour__p']}>КСН</h4>
					<Button width={88} height={28} text="РОУ" />

					<div className={styles['containerFour__windowOne']}>
						<Window
							color="blue"
							value={WINDOWS.w24.currentValue}
							textRight={WINDOWS.w24.unitsMeasurement}
						/>
						<Window
							color="blue"
							value={WINDOWS.w25.currentValue}
							textRight={WINDOWS.w25.unitsMeasurement}
						/>
					</div>

					<div className={styles['containerFour__windowTwo']}>
						<Window
							color="blue"
							value={WINDOWS.w22.currentValue}
							textRight={WINDOWS.w22.unitsMeasurement}
						/>
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
							<Window
								color="blue"
								value={WINDOWS.w26.currentValue}
								textRight={WINDOWS.w26.unitsMeasurement}
							/>
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
