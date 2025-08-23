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
import ShortWindow from '../ShortWindow';

interface Props {
	className?: string;
}

const KARightMid: FC<Props> = ({ className }) => {
	const { g16 } = useAppSelector(state => state.gate.gates);
	const openGatePopup = useOpenGatePopup();
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.columnLeft}>
				<div className={styles.columnLeft__left}>
					<div className={styles.columnLeft__left_top}>
						<ShortWindow data={WINDOWS.w189} right />
					</div>
					<div className={styles.columnLeft__left_mid}>
						<ShortWindow data={WINDOWS.w174} right />
						<ShortWindow data={WINDOWS.w175} right />
					</div>

					<div className={styles.columnLeft__left_bottom}>
						<ShortWindow data={WINDOWS.w176} right />
						<ShortWindow data={WINDOWS.w177} right />
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
						<ShortWindow data={WINDOWS.w204} right />
						<ShortWindow data={WINDOWS.w205} right />
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
							<ShortWindow
								data={WINDOWS.w206}
								right
								left
								textLeft="1c"
							/>
							<ShortWindow
								data={WINDOWS.w207}
								right
								left
								textLeft="2c"
							/>
						</div>
						<ShortWindow data={WINDOWS.w208} bottom />
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
						<ShortWindow data={WINDOWS.w211} right />
						<ShortWindow data={WINDOWS.w236} right />
						<ShortWindow data={WINDOWS.w212} right />
					</div>
					<div className={styles.columnMid__right_bottom}>
						<ShortWindow data={WINDOWS.w213} right />
						<Rectangle color="white" className={styles.rectangle} />
						<ShortWindow data={WINDOWS.w214} right />
					</div>
				</div>
			</div>
			<div className={styles.columnRight}>
				<div className={styles.columnRight__top}>
					<ShortWindow data={WINDOWS.w215} right />
					<ShortWindow data={WINDOWS.w216} right />
					<ShortWindow data={WINDOWS.w217} right />
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
					<ShortWindow data={WINDOWS.w218} right />
				</div>
			</div>
		</div>
	);
};
export default KARightMid;
