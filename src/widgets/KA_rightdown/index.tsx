import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Window from '@/shared/UI/Window';
import { WindowsState } from '@/shared/configs/window';
import Rectangle from '@/shared/UI/icons/Rectangle';
import Button from '@/shared/UI/Button';
import Tdm from '@/shared/UI/Tdm';
import { TDM } from '@/shared/configs/tdm';
import { Prefix } from '@/shared/types/window';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
	windows: WindowsState;
}

const KARightDown: FC<Props> = ({ className, windows }) => {
	const text1C: Prefix = '1c';
	const text2C: Prefix = '2c';
	const handleModalNotification = useShowModal('notification');

	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowsTop}>
				<div className={styles.windowsTop__left}>
					<Window data={windows.w178} right colorText="white" />
				</div>
				<div className={styles.windowsTop__middle}>
					<div className={styles.windowsTop__middle_item}>
						<span className={styles.windowsTop__middle_item_text}>
							{text1C}
						</span>
						<Window data={windows.w206} right />
					</div>
					<div className={styles.windowsTop__middle_item}>
						<Window
							data={windows.w210}
							right
							left
							textLeft={text2C}
						/>
					</div>
				</div>
				<div className={styles.windowsTop__right}>
					<Tdm
						className={styles.pumpBox}
						direction="toLeft"
						state={TDM.t2.state}
						title={TDM.t2.name}
					/>
					<Rectangle
						className={styles.windowsTop__right_rectangle}
						color="white"
					/>
					<Window
						className={styles.windowsTop__right_window}
						data={windows.w219}
						right
					/>
				</div>
			</div>
			<div className={styles.windowsMiddle}>
				<div className={styles.windowsMiddle__left}>
					<div className={styles.windowsMiddle__left_line}>
						<div className={styles.windowsMiddle__left_line_box}>
							<Window data={windows.w220} right />
							<Rectangle />
						</div>
						<Tdm
							className={styles.pumpBox}
							direction="toRight"
							state={TDM.t3.state}
							title={TDM.t3.name}
						/>
						<Window
							className={styles.windowsMiddle__left_line_window}
							data={windows.w223}
							right
						/>
					</div>
					<div className={styles.windowsMiddle__left_line}>
						<div className={styles.windowsMiddle__left_line_box}>
							<Window data={windows.w221} right />
							<Rectangle outlined />
						</div>
						<Tdm
							className={styles.pumpBox}
							direction="toRight"
							state={TDM.t4.state}
							title={TDM.t4.name}
						/>
						<Window
							className={styles.windowsMiddle__left_line_window}
							data={windows.w224}
							right
						/>
					</div>
				</div>
				<div className={styles.windowsMiddle__middle}>
					<Window
						className={styles.windowsMiddle__middle_window}
						data={windows.w234}
						bottom
					/>
					<span className={styles.windowsMiddle__middle_text}>
						{'к горелкам'}
					</span>
					<Window
						className={styles.windowsMiddle__middle_window}
						data={windows.w235}
						bottom
					/>
				</div>
				<div className={styles.windowsMiddle__right}>
					<Button
						width={91}
						height={28}
						text={'ВТ'}
						onClick={handleModalNotification}
					/>
					<Button
						width={91}
						height={28}
						text={'ГТ'}
						onClick={handleModalNotification}
					/>
				</div>
			</div>
			<div className={styles.windowsBottom}>
				<div className={styles.windowsBottom__left}>
					<div className={styles.windowsBottom__left_line}>
						<Tdm
							className={styles.pumpBox}
							direction="toRight"
							state={TDM.t5.state}
							title={TDM.t5.name}
						/>
						<Window
							className={styles.windowsBottom__left_line_window}
							data={windows.w222}
							right
						/>
					</div>
					<Tdm
						className={styles.pumpBox}
						direction="toRight"
						state={TDM.t6.state}
						title={TDM.t6.name}
					/>
				</div>
				<div className={styles.windowsBottom__middle}>
					<div className={styles.windowsBottom__middle_box}>
						<Window data={windows.w225} right />
						<Rectangle outlined />
					</div>
					<div className={styles.windowsBottom__middle_box}>
						<Window data={windows.w226} right />
						<Rectangle outlined />
						<Window data={windows.w227} right />
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

export default KARightDown;
