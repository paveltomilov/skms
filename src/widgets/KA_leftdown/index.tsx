import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';
import Button from '@/shared/UI/Button';
import Gate from '@/shared/UI/Gate';

interface Props {
	className?: string;
}

const KALeftDown: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.button__top}>
				<Button
					width={212}
					height={28}
					text="Параметры регуляторов"
				></Button>
			</div>
			<div className={styles.buttons}>
				<Button
					width={88}
					height={28}
					text="ПС - А,Г"
					className={styles.buttons__left}
				></Button>
				<Button
					width={88}
					height={28}
					text="ПС - Б,Д"
					className={styles.buttons__center}
				></Button>
				<Button
					width={88}
					height={28}
					text="ПС - В,Е"
					className={styles.buttons__right}
				></Button>
			</div>
			<div className={styles.block}>
				<ul className={styles.list}>
					<p className={styles.list__title}>
						Скорость ветра на крыше
					</p>
					<li className={styles.list__item}>
						<span className={styles.list__icons}></span>
						<span>Более 4 м/с (слабый)</span>
					</li>
					<li className={styles.list__item}>
						<span className={styles.list__icons}></span>
						<span>Более 11 м/с (сильный)</span>
					</li>
					<li className={styles.list__item}>
						<span className={styles.list__icons}></span>
						<span>Более 21 м/с (шторм)</span>
					</li>
					<li className={styles.list__item}>
						<span className={styles.list__icons}></span>
						<span>Более 36 м/с (ураган)</span>
					</li>
				</ul>
			</div>
			<div className={styles.window}>
				<div className={styles.window__top}>
					<Window
						color="blue"
						value={WINDOWS.w137.currentValue}
						textRight={WINDOWS.w137.unitsMeasurement}
					/>
				</div>
				<div className={styles.window__gate}>
					<Gate disable position="vertical" power state="open" />
				</div>

				<div className={styles.window__bottom}>
					<Window
						color="blue"
						value={WINDOWS.w138.currentValue}
						textRight={WINDOWS.w138.unitsMeasurement}
					/>
					<Window
						color="blue"
						value={WINDOWS.w139.currentValue}
						textRight={WINDOWS.w139.unitsMeasurement}
					/>
				</div>

				<div className={styles.window__text}>
					<p>Мазут к котлу</p>
				</div>
			</div>
		</div>
	);
};

export default KALeftDown;
