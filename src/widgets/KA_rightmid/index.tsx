import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { WINDOWS } from '@/shared/configs/window';
import Rectangle from '@/shared/UI/icons/Rectangle';
import Button from '@/shared/UI/Button';
import Tdm from '@/shared/UI/Tdm';
import { TDM } from '@/shared/configs/tdm';
import Gate from '@/shared/UI/Gate';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';
import Window from '@/shared/UI/Window';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
}

const KARightMid: FC<Props> = ({ className }) => {
	const { g16 } = useAppSelector(state => state.gate.gates);
	const openGatePopup = useOpenGatePopup();
	const handleModalNotification = useShowModal('notification');
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.columnLeft}>
				<div className={styles.columnLeft__left}>
					<div className={styles.columnLeft__left_top}>
						<Window data={WINDOWS.w189} right colorText="white" />
					</div>
					<div className={styles.columnLeft__left_mid}>
						<Window data={WINDOWS.w174} right colorText="white" />
						<Window data={WINDOWS.w175} right colorText="white" />
					</div>

					<div className={styles.columnLeft__left_bottom}>
						<Window data={WINDOWS.w176} right colorText="white" />
						<Window data={WINDOWS.w177} right colorText="white" />
					</div>
				</div>
				<div className={styles.columnLeft__right}>
					<span className={styles.columnLeft__text}>рец. ВЭК</span>
					<Gate
						className={styles.gates__mid}
						state={g16.states}
						position="vertical"
						textLeft={g16.name}
						onClick={() => openGatePopup('g6')}
					/>
					<div className={styles.columnLeft__right_bottom}>
						<Window data={WINDOWS.w204} right />
						<Window data={WINDOWS.w205} right />
					</div>
				</div>
			</div>
			<div className={styles.columnMid}>
				<div className={styles.columnMid__left}>
					<div className={styles.columnMid__left_top}>
						<span className={styles.text}>Dy 65</span>
						<span className={styles.text}>Dy 100</span>
						<span className={styles.text}>Dy 100</span>
					</div>
					<div className={styles.columnMid__left_bottom}>
						<div className={styles.columnMid__left_bottom_box}>
							<Window
								data={WINDOWS.w206}
								right
								left
								textLeft="1c"
							/>
							<Window
								data={WINDOWS.w207}
								right
								left
								textLeft="2c"
							/>
						</div>
						<Window data={WINDOWS.w208} bottom />
					</div>
				</div>
				<div className={styles.columnMid__mid}>
					<div className={styles.columnMid__mid_top}>
						<div className={styles.columnMid__mid_wrapper}>
							<span className={styles.text}>РКПП-А</span>
							<Rectangle color="white" />
						</div>
						<div className={styles.columnMid__mid_wrapper}>
							<span className={styles.text}>РКПП-А</span>
							<Rectangle color="white" />
						</div>
						<div className={styles.columnMid__mid_wrapper}>
							<span className={styles.text}>РКПП-А</span>
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
						<Window data={WINDOWS.w211} right />
						<Window data={WINDOWS.w236} right />
						<Window data={WINDOWS.w212} right />
					</div>
					<div className={styles.columnMid__right_bottom}>
						<Window data={WINDOWS.w213} right />
						<Rectangle color="white" className={styles.rectangle} />
						<Window data={WINDOWS.w214} right />
					</div>
				</div>
			</div>
			<div className={styles.columnRight}>
				<div className={styles.columnRight__top}>
					<Window data={WINDOWS.w215} right />
					<Window data={WINDOWS.w216} right />
					<Window data={WINDOWS.w217} right />
				</div>
				<div className={styles.columnRight__mid}>
					<Button
						className={styles.columnRight__btn}
						text="РОВ"
						width={79}
						height={22}
						onClick={handleModalNotification}
					/>
					<Button
						className={styles.columnRight__btn}
						text="КРСК"
						width={79}
						height={22}
						onClick={handleModalNotification}
					/>
				</div>
				<div className={styles.columnRight__bottom}>
					<Window data={WINDOWS.w218} right />
				</div>
			</div>
		</div>
	);
};
export default KARightMid;
