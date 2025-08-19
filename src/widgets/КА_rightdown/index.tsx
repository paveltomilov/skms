import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';
import Pump from '@/shared/UI/icons/Pump';
import Rectangle from '@/shared/UI/icons/Rectangle';
import Button from '@/shared/UI/Button';

interface Props {
	className?: string;
}

const КАRightDown: FC<Props> = ({ className }) => {
	const text1C: string = '1с';
	const text2C: string = '2с';
	const tractionVentilationMechanisms: Record<string, string> = {
		tvm1: 'ДВ-1Б',
		tvm2: 'ДРГ-1А',
		tvm3: 'ДРГ-1Б',
		tvm4: 'ДС-1А',
		tvm5: 'ДС-1Б',
	};
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowsTop}>
				<div className={styles.windowsTop__left}>
					<Window
						textRight={WINDOWS.w178.unitsMeasurement}
						value={WINDOWS.w178.currentValue}
						color={'blue'}
					/>
				</div>
				<div className={styles.windowsTop__middle}>
					<div className={styles.windowsTop__middle_item}>
						<span className={styles.windowsTop__middle_item_text}>
							{text1C}
						</span>
						<Window
							textRight={WINDOWS.w206.unitsMeasurement}
							value={WINDOWS.w206.currentValue}
							color={'blue'}
						/>
					</div>
					<div className={styles.windowsTop__middle_item}>
						<span className={styles.windowsTop__middle_item_text}>
							{text2C}
						</span>
						<Window
							textRight={WINDOWS.w210.unitsMeasurement}
							value={WINDOWS.w210.currentValue}
							color={'blue'}
						/>
					</div>
				</div>
				<div className={styles.windowsTop__right}>
					<div className={styles.pumpBox}>
						<span className={styles.pumpBox_text}>
							{tractionVentilationMechanisms.tvm1}
						</span>
						<Pump second />
					</div>
					<Rectangle
						className={styles.windowsTop__right_rectangle}
						color={'white'}
						outlined
					/>
					<Window
						className={styles.windowsTop__right_window}
						textRight={WINDOWS.w219.unitsMeasurement}
						value={WINDOWS.w219.currentValue}
						color={'blue'}
					/>
				</div>
			</div>
			<div className={styles.windowsMiddle}>
				<div className={styles.windowsMiddle__left}>
					<div className={styles.windowsMiddle__left_line}>
						<div className={styles.windowsMiddle__left_line_box}>
							<Window
								textRight={WINDOWS.w220.unitsMeasurement}
								value={WINDOWS.w220.currentValue}
								color={'blue'}
							/>
							<Rectangle outlined />
						</div>
						<div className={styles.pumpBox}>
							<span className={styles.pumpBox_text}>
								{tractionVentilationMechanisms.tvm2}
							</span>
							<Pump />
						</div>
						<Window
							className={styles.windowsMiddle__left_line_window}
							textRight={WINDOWS.w223.unitsMeasurement}
							value={WINDOWS.w223.currentValue}
							color={'blue'}
						/>
					</div>
					<div className={styles.windowsMiddle__left_line}>
						<div className={styles.windowsMiddle__left_line_box}>
							<Window
								textRight={WINDOWS.w221.unitsMeasurement}
								value={WINDOWS.w221.currentValue}
								color={'blue'}
							/>
							<Rectangle outlined />
						</div>
						<div className={styles.pumpBox}>
							<span className={styles.pumpBox_text}>
								{tractionVentilationMechanisms.tvm3}
							</span>
							<Pump />
						</div>
						<Window
							className={styles.windowsMiddle__left_line_window}
							textRight={WINDOWS.w224.unitsMeasurement}
							value={WINDOWS.w224.currentValue}
							color={'blue'}
						/>
					</div>
				</div>
				<div className={styles.windowsMiddle__middle}>
					<Window
						className={styles.windowsMiddle__middle_window}
						textBottom={WINDOWS.w234.unitsMeasurement}
						value={WINDOWS.w234.currentValue}
						color={'blue'}
					/>
					<span className={styles.windowsMiddle__middle_text}>
						{'к горелкам'}
					</span>
					<Window
						className={styles.windowsMiddle__middle_window}
						textBottom={WINDOWS.w235.unitsMeasurement}
						value={WINDOWS.w235.currentValue}
						color={'blue'}
					/>
				</div>
				<div className={styles.windowsMiddle__right}>
					<Button width={91} height={28} text={'ВТ'} />
					<Button width={91} height={28} text={'ГТ'} />
				</div>
			</div>
			<div className={styles.windowsBottom}>
				<div className={styles.windowsBottom__left}>
					<div className={styles.windowsBottom__left_line}>
						<div className={styles.pumpBox}>
							<span className={styles.pumpBox_text}>
								{tractionVentilationMechanisms.tvm4}
							</span>
							<Pump />
						</div>
						<Window
                        className={styles.windowsBottom__left_line_window}
							textRight={WINDOWS.w222.unitsMeasurement}
							value={WINDOWS.w222.currentValue}
							color={'blue'}
						/>
					</div>
					<div className={styles.pumpBox}>
						<span className={styles.pumpBox_text}>
							{tractionVentilationMechanisms.tvm5}
						</span>
						<Pump />
					</div>
				</div>
				<div className={styles.windowsBottom__middle}>
					<div className={styles.windowsBottom__middle_box}>
						<Window
							textRight={WINDOWS.w225.unitsMeasurement}
							value={WINDOWS.w225.currentValue}
							color={'blue'}
						/>
						<Rectangle outlined />
					</div>
					<div className={styles.windowsBottom__middle_box}>
						<Window
							textRight={WINDOWS.w226.unitsMeasurement}
							value={WINDOWS.w226.currentValue}
							color={'blue'}
						/>
						<Rectangle outlined />
						<Window
							textRight={WINDOWS.w227.unitsMeasurement}
							value={WINDOWS.w227.currentValue}
							color={'blue'}
						/>
					</div>
				</div>
				<div className={styles.windowsBottom__right}>
					<span className={styles.windowsBottom__right_text}>
						{'в дымовую трубу'}
					</span>
				</div>
			</div>
		</div>
	);
};

export default КАRightDown;
