import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import Button from '@/shared/UI/Button';
import { WINDOWS } from '@/shared/configs/window';
import Tilde from '@/shared/UI/icons/Tilde';

interface Props {
	className?: string;
}

const KALeftMid: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windows}>
				<Window
					color="blue"
					value={WINDOWS.w113.currentValue}
					textRight={WINDOWS.w113.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w114.currentValue}
					textRight={WINDOWS.w114.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w115.currentValue}
					textRight={WINDOWS.w115.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w116.currentValue}
					textRight={WINDOWS.w116.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w117.currentValue}
					textRight={WINDOWS.w117.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w118.currentValue}
					textRight={WINDOWS.w118.unitsMeasurement}
				/>
			</div>

			<div className={styles.windows__button}>
				<Button
					width={74}
					height={16}
					text="РЗМ 1МВ-А"
					className={cn(styles.btn, styles.btn__bgWhite)}
				/>
				<Button
					width={74}
					height={16}
					text="РЗМ 1МВ-Б"
					className={cn(styles.btn, styles.btn__bgWhite)}

				/>
				<Button
					width={74}
					height={16}
					text="РЗМ 1МВ-В"
					className={cn(styles.btn, styles.btn__bgGreen)}
				/>
				<Button
					width={74}
					height={16}
					text="РЗМ 1МВ-Г"
					className={cn(styles.btn, styles.btn__bgGreen)}
				/>
				<Button
					width={74}
					height={16}
					text="РЗМ 1МВ-Д"
					className={cn(styles.btn, styles.btn__bgGreen)}
				/>
				<Button
					width={74}
					height={16}
					text="РЗМ 1МВ-Е"
					className={cn(styles.btn, styles.btn__bgWhite)}
				/>
			</div>
			<div className={styles.windows__tilda}>
				<Tilde size='md' disable color='white' />
				<Tilde size='md' />
				<Tilde size='md' />
				<Tilde size='md' />
				<Tilde size='md' />
				<Tilde size='md' color='white' />
			</div>
			<div className={styles.windows}>
				<Window
					color="blue"
					value={WINDOWS.w119.currentValue}
					textRight={WINDOWS.w119.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w120.currentValue}
					textRight={WINDOWS.w120.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w121.currentValue}
					textRight={WINDOWS.w121.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w122.currentValue}
					textRight={WINDOWS.w122.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w123.currentValue}
					textRight={WINDOWS.w123.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w124.currentValue}
					textRight={WINDOWS.w124.unitsMeasurement}
				/>
			</div>
			<div className={styles.windows}>
				<Window
					color="blue"
					value={WINDOWS.w125.currentValue}
					textRight={WINDOWS.w125.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w126.currentValue}
					textRight={WINDOWS.w126.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w127.currentValue}
					textRight={WINDOWS.w127.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w128.currentValue}
					textRight={WINDOWS.w128.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w129.currentValue}
					textRight={WINDOWS.w129.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w130.currentValue}
					textRight={WINDOWS.w130.unitsMeasurement}
				/>
			</div>
			<div className={styles.windows}>
				<Window
					color="blue"
					value={WINDOWS.w131.currentValue}
					textRight={WINDOWS.w131.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w132.currentValue}
					textRight={WINDOWS.w132.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w133.currentValue}
					textRight={WINDOWS.w133.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w134.currentValue}
					textRight={WINDOWS.w134.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w135.currentValue}
					textRight={WINDOWS.w135.unitsMeasurement}
				/>
				<Window
					color="blue"
					value={WINDOWS.w136.currentValue}
					textRight={WINDOWS.w136.unitsMeasurement}
				/>
			</div>
		</div>
	);
};

export default KALeftMid;