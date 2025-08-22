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

type TildaConfig = {
	color?: 'white' | 'green'
	disabled?: boolean
}

const firstWindows = [WINDOWS.w113, WINDOWS.w114, WINDOWS.w115, WINDOWS.w116, WINDOWS.w117, WINDOWS.w118];
const secondWindows = [WINDOWS.w119, WINDOWS.w120, WINDOWS.w121, WINDOWS.w122, WINDOWS.w123, WINDOWS.w124];
const thirdWindows = [WINDOWS.w125, WINDOWS.w126, WINDOWS.w127, WINDOWS.w128, WINDOWS.w129, WINDOWS.w130];
const fourthWindows = [WINDOWS.w131, WINDOWS.w132, WINDOWS.w133, WINDOWS.w134, WINDOWS.w135, WINDOWS.w136];

const buttonsConfig = [
	{ text: 'РЗМ 1МВ-А', bgStyle: styles.btn__bgWhite },
	{ text: 'РЗМ 1МВ-Б', bgStyle: styles.btn__bgGreen },
	{ text: 'РЗМ 1МВ-В', bgStyle: styles.btn__bgGreen },
	{ text: 'РЗМ 1МВ-Г', bgStyle: styles.btn__bgGreen },
	{ text: 'РЗМ 1МВ-Д', bgStyle: styles.btn__bgWhite },
	{ text: 'РЗМ 1МВ-Е', bgStyle: styles.btn__bgWhite },
];

const tildaConfig: TildaConfig[] = [
	{ color: 'white', disabled: true },
	{},
	{},
	{},
	{},
	{ color: 'white' }
];

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
					/>))}
			</div>
			<div className={styles.windows__button}>
				{buttonsConfig.map((btn, index) => (
					<Button
						key={index}
						width={74}
						height={16}
						text={btn.text}
						className={cn(styles.btn, btn.bgStyle)}
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