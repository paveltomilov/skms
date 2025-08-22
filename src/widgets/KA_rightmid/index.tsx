import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';
import Rectangle from '@/shared/UI/icons/Rectangle';
import Button from '@/shared/UI/Button';
import Tdm from '@/shared/UI/Tdm';
import { TDM } from '@/shared/configs/tdm';
import Gate from '@/shared/UI/Gate';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';

interface Props {
	className: string;
}

const KARightMid: FC<Props> = ({ className }) => {
	const { g16 } = useAppSelector(state => state.gate.gates);
	const openGatePopup = useOpenGatePopup();

	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.columnLeft}>
				<div className={styles.columnLeft__left}>
					<div className={styles.columnLeft__left_top}>
						<Window
							className={styles.window}
							textRight={WINDOWS.w189.unitsMeasurement}
							value={WINDOWS.w189.currentValue}
							color={'blue'}
						/>
					</div>
					<div className={styles.columnLeft__left_mid}>
						<div>
							<Window
								className={styles.window}
								textRight={WINDOWS.w174.unitsMeasurement}
								value={WINDOWS.w174.currentValue}
								color={'blue'}
							/>
						</div>

						<Window
							className={styles.window}
							textRight={WINDOWS.w175.unitsMeasurement}
							value={WINDOWS.w175.currentValue}
							color={'blue'}
						/>
					</div>

					<div className={styles.columnLeft__left_bottom}>
						<Window
							className={styles.window}
							textRight={WINDOWS.w176.unitsMeasurement}
							value={WINDOWS.w176.currentValue}
							color={'blue'}
						/>
						<Window
							className={styles.window}
							textRight={WINDOWS.w177.unitsMeasurement}
							value={WINDOWS.w177.currentValue}
							color={'blue'}
						/>
					</div>
				</div>
				<div className={styles.columnLeft__right}>
					<span className={styles.columnLeft__right_text}>
						рец. ВЭК
					</span>
					<Gate
						className={styles.gates__mid}
						state={g16.states}
						position="vertical"
						textLeft={g16.name}
						onClick={() => openGatePopup('g6')}
					/>
					<div className={styles.columnLeft__right_bottom}>
						<Window
							className={styles.window}
							textRight={WINDOWS.w204.unitsMeasurement}
							value={WINDOWS.w204.currentValue}
							color={'blue'}
						/>
						<Window
							className={styles.window}
							textRight={WINDOWS.w205.unitsMeasurement}
							value={WINDOWS.w205.currentValue}
							color={'blue'}
						/>
					</div>
				</div>
			</div>
			<div className={styles.columnMid}>
				<div className={styles.columnMid__left}>
					<div className={styles.columnMid__left_top}>
						<span className={styles.columnMid__left_text}>
							Dy 65
						</span>
						<span className={styles.columnMid__left_text}>
							Dy 100
						</span>
						<span className={styles.columnMid__left_text}>
							Dy 100
						</span>
					</div>
					<div className={styles.columnMid__left_bottom}>
						<div className={styles.columnMid__left_bottom_box}>
							<Window
								className={styles.window}
								textRight={WINDOWS.w206.unitsMeasurement}
								textLeft="1c"
								value={WINDOWS.w206.currentValue}
								color={'blue'}
							/>
							<Window
								className={styles.window}
								textRight={WINDOWS.w207.unitsMeasurement}
								textLeft="2c"
								value={WINDOWS.w207.currentValue}
								color={'blue'}
							/>
						</div>
						<Window
							className={styles.window}
							textBottom={WINDOWS.w208.unitsMeasurement}
							value={WINDOWS.w208.currentValue}
							color={'blue'}
						/>
					</div>
				</div>
				<div className={styles.columnMid__mid}>
					<div className={styles.columnMid__mid_top}>
						<div className={styles.columnMid__mid_wrapper}>
							<span className={styles.columnMid__mid_text}>
								РКПП-А
							</span>
							<Rectangle color="white" />
						</div>
						<div className={styles.columnMid__mid_wrapper}>
							<span className={styles.columnMid__mid_text}>
								РКПП-А
							</span>
							<Rectangle color="white" />
						</div>
						<div className={styles.columnMid__mid_wrapper}>
							<span className={styles.columnMid__mid_text}>
								РКПП-А
							</span>
							<Rectangle />
						</div>
					</div>
					<div className={styles.columnMid__mid_bottom}>
						<Tdm
							direction="toLeft"
							state={TDM.t1.state}
							title={TDM.t1.name}
						/>
					</div>
				</div>
				<div className={styles.columnMid__right}>
					<div className={styles.columnMid__right_top}>
						<Window
							className={styles.window}
							textRight={WINDOWS.w211.unitsMeasurement}
							value={WINDOWS.w211.currentValue}
							color={'blue'}
						/>
						<Window
							className={styles.window}
							textRight={WINDOWS.w236.unitsMeasurement}
							value={WINDOWS.w236.currentValue}
							color={'blue'}
						/>
						<Window
							className={styles.window}
							textRight={WINDOWS.w212.unitsMeasurement}
							value={WINDOWS.w212.currentValue}
							color={'blue'}
						/>
					</div>
					<div className={styles.columnMid__right_bottom}>
						<Window
							className={styles.window}
							textRight={WINDOWS.w213.unitsMeasurement}
							value={WINDOWS.w213.currentValue}
							color={'blue'}
						/>
						<Rectangle
							color="white"
							className={styles.columnMid__right_bottom_rectangle}
						/>
						<Window
							className={styles.window}
							textRight={WINDOWS.w214.unitsMeasurement}
							value={WINDOWS.w214.currentValue}
							color={'blue'}
						/>
					</div>
				</div>
			</div>
			<div className={styles.columnRight}>
				<div className={styles.columnRight__top}>
					<Window
						className={styles.window}
						textRight={WINDOWS.w215.unitsMeasurement}
						value={WINDOWS.w215.currentValue}
						color={'blue'}
					/>
					<Window
						className={styles.window}
						textRight={WINDOWS.w216.unitsMeasurement}
						value={WINDOWS.w216.currentValue}
						color={'blue'}
					/>
					<Window
						className={styles.window}
						textRight={WINDOWS.w217.unitsMeasurement}
						value={WINDOWS.w217.currentValue}
						color={'blue'}
					/>
				</div>
				<div className={styles.columnRight__mid}>
					<div>
						<Button text="РОВ" width={79} height={22} />
					</div>
					<div>
						<Button text="КРСК" width={79} height={22} />
					</div>
				</div>
				<div className={styles.columnRight__bottom}>
					<Window
						className={styles.window}
						textRight={WINDOWS.w218.unitsMeasurement}
						value={WINDOWS.w218.currentValue}
						color={'blue'}
					/>
				</div>
			</div>
		</div>
	);
};

export default KARightMid;
