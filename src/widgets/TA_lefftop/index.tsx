import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import { WINDOWS } from '@/shared/configs/window';
import { useAppSelector } from '@/shared/hooks/store';

interface Props {
	className?: string;
}

const TALeftTop: FC<Props> = ({ className }) => {
	const { g1 } = useAppSelector(state => state.gate);

	return (
		<div className={cn(className, styles.container)}>
			<Button width={88} height={28} text={'КА'} />
			<p className={styles.container__p1}>ГПП</p>
			<div className={styles.windowTop}>
				<Window
					color="blue"
					value={WINDOWS.w1.currentValue}
					textRight={WINDOWS.w1.unitsMeasurement}
					className={styles.windowTop__right}
				/>
				<Window
					color="blue"
					value={WINDOWS.w2.currentValue}
					textRight={WINDOWS.w2.unitsMeasurement}
					className={styles.windowTop__right}
				/>
			</div>
			<div className={styles.windowMedium__p2}>
				<p className={styles.windowMedium__p2__B}>Б</p>
				<p className={styles.windowMedium__p3}>Свежий пар</p>
			</div>
			<div className={styles.windowMedium__left}>
				<Window
					color="blue"
					value={WINDOWS.w3.currentValue}
					textRight={WINDOWS.w3.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w5.currentValue}
					textRight={WINDOWS.w5.unitsMeasurement}
				/>
			</div>
			<Gate
				state={g1.states}
				textBottom={g1.name}
				className={styles.gate}
			/>
			<div className={styles.windowMedium__right}>
				<Window
					color="blue"
					value={WINDOWS.w4.currentValue}
					textRight={WINDOWS.w4.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w6.currentValue}
					textRight={WINDOWS.w6.unitsMeasurement}
				/>
				<p className={styles.windowMedium__right__p}>СКВД-2</p>
			</div>
			<div className={styles.windowMediumBottom}>
				<p className={styles.windowMediumBottom__p1}>ХПП</p>
				<Window
					color="blue"
					value={WINDOWS.w7.currentValue}
					textRight={WINDOWS.w7.unitsMeasurement}
					className={styles.windowMediumBottom__one}
				/>
				<div className={styles.windowMediumBottom__two}>
					<Window
						color="blue"
						value={WINDOWS.w8.currentValue}
						textRight={WINDOWS.w8.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w9.currentValue}
						textRight={WINDOWS.w9.unitsMeasurement}
						className={styles.windowMediumBottom__three}
					/>
				</div>
				<div className={styles.windowMediumBottom__four}>
					<Window
						color="blue"
						value={WINDOWS.w10.currentValue}
						textRight={WINDOWS.w10.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w11.currentValue}
						textBottom={WINDOWS.w11.unitsMeasurement}
					/>
					<p className={styles.windowMediumBottom__p2}>ЦВД</p>
				</div>
			</div>
			<div className={styles.windowBottom}>
				<p>ГПП</p>
				<div className={styles.windowBottom__right}>
					<Window
						color="blue"
						value={WINDOWS.w12.currentValue}
						textRight={WINDOWS.w12.unitsMeasurement}
					/>
					<div className={styles.windowBottom__right__bottom}>
						<Window
							color="blue"
							value={WINDOWS.w13.currentValue}
							textRight={WINDOWS.w13.unitsMeasurement}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TALeftTop;
