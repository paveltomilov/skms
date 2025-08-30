import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import { WINDOWS } from '@/shared/configs/window';
import { useAppSelector } from '@/shared/hooks/store';
import { useOpenGatePopup } from '@/shared/hooks/useOpenGatePopup';

interface Props {
	className?: string;
}

const TALeftTop: FC<Props> = ({ className }) => {
	const { g1 } = useAppSelector(state => state.gate.gates);

	const openGatePopup = useOpenGatePopup();

	return (
		<div className={cn(className, styles.container)}>
			<Button width={88} height={28} text={'КА'} />
			<p className={styles.container__p1}>ГПП</p>
			<div className={styles.windowTop}>
				<Window
					data={WINDOWS.w1}
					right
					className={styles.windowTop__right}
				/>
				<Window
					data={WINDOWS.w2}
					right
					className={styles.windowTop__right}
				/>
			</div>
			<div className={styles.windowMedium__p2}>
				<p className={styles.windowMedium__p2__B}>Б</p>
				<p className={styles.windowMedium__p3}>Свежий пар</p>
			</div>
			<div className={styles.windowMedium__left}>
				<Window data={WINDOWS.w3} right />
				<Window data={WINDOWS.w5} right />
			</div>
			<Gate
				state={g1.states}
				textBottom={g1.name}
				onClick={() => openGatePopup('g1')}
				className={styles.gate}
			/>
			<div className={styles.windowMedium__right}>
				<Window data={WINDOWS.w4} right />
				<Window data={WINDOWS.w6} right />
				<p className={styles.windowMedium__right__p}>СКВД-2</p>
			</div>
			<div className={styles.windowMediumBottom}>
				<p className={styles.windowMediumBottom__p1}>ХПП</p>
				<Window
					data={WINDOWS.w7}
					right
					className={styles.windowMediumBottom__one}
				/>
				<div className={styles.windowMediumBottom__two}>
					<Window data={WINDOWS.w8} right />
					<Window
						data={WINDOWS.w9}
						right
						className={styles.windowMediumBottom__three}
					/>
				</div>
				<div className={styles.windowMediumBottom__four}>
					<Window data={WINDOWS.w10} right />
					<Window data={WINDOWS.w11} bottom />
					<p className={styles.windowMediumBottom__p2}>ЦВД</p>
				</div>
			</div>
			<div className={styles.windowBottom}>
				<p>ГПП</p>
				<div className={styles.windowBottom__right}>
					<Window data={WINDOWS.w12} right />
					<div className={styles.windowBottom__right__bottom}>
						<Window data={WINDOWS.w13} right />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TALeftTop;
