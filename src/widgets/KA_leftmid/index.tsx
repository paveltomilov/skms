import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import Button from '@/shared/UI/Button';
import Tilde from '@/shared/UI/icons/Tilde';
import { buttonsConfig, firstWindows, fourthWindows, secondWindows, thirdWindows, tildaConfig } from '@/shared/configs/KALeftMid';

interface Props {
	className?: string;
}



const KALeftMid: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windows}>
				{firstWindows.map((window, index) => (
					<Window
						key={index}
						color="blue"
						value={window.currentValue}
						textRight={window.unitsMeasurement}
					/>
				))}
			</div>

			<div className={styles.windows__button}>
				{buttonsConfig.map((btn, index) => (
					<Button
						key={index}
						width={74}
						height={16}
						text={btn.text}
						className={cn(styles.btn, styles[btn.bgClass])}
					/>
				))}
			</div>

			<div className={styles.windows__tilda}>
				{tildaConfig.map((tilda, index) => (
					<Tilde
						key={index}
						size='md'
						color={tilda.color}
						disable={tilda.disabled}
					/>
				))}
			</div>

			{/* Остальные группы окон */}
			<div className={styles.windows}>
				{secondWindows.map((window, index) => (
					<Window
						key={index}
						color="blue"
						value={window.currentValue}
						textRight={window.unitsMeasurement}
					/>
				))}
			</div>

			<div className={styles.windows}>
				{thirdWindows.map((window, index) => (
					<Window
						key={index}
						color="blue"
						value={window.currentValue}
						textRight={window.unitsMeasurement}
					/>
				))}
			</div>

			<div className={styles.windows}>
				{fourthWindows.map((window, index) => (
					<Window
						key={index}
						color="blue"
						value={window.currentValue}
						textRight={window.unitsMeasurement}
					/>
				))}
			</div>
		</div>
	);
};

export default KALeftMid;