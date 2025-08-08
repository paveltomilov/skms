import { FC } from 'react';
import styles from './styles.module.scss';
import Gate from '@/shared/UI/Gate';
import cn from 'classnames';
import { GATES } from '@/shared/configs/gate';
import WindowRectCard from '@/shared/UI/WindowRectCard';
import Window from '@/shared/UI/Window';
import Button from '@/shared/UI/Button';
import ArrowButton from '@/shared/UI/Actuator';

interface Props {
	className?: string;
}

const TALeftDown: FC<Props> = ({ className }) => {
	const gate_left = GATES.g7;
	const gate_mid = GATES.g6;
	const gate_right = GATES.g8;

	return (
		<div className={cn(className,styles.container)}>
			<div className={styles.gates}>
				<Gate
					className={styles.gates__left}
					state={gate_left.state} position='vertical'
					textLeft={gate_left.name} />
				<Gate
					className={styles.gates__mid}
					state={gate_mid.state} position='vertical'
					textLeft={gate_mid.name} />
				<Gate
					className={styles.gates__right}
					state={gate_right.state} position='vertical'
					textRight={gate_right.name} />
			</div>
			<div className={styles.cards}>
				<WindowRectCard
					color='blue'
					title='1'
					value={10}
					minValue={0}
					maxValue={100}
					className={styles.cards__leftup} />
				<WindowRectCard
					color='blue'
					title='2'
					value={20}
					minValue={0}
					maxValue={100}
					className={styles.cards__leftmid} />
				<WindowRectCard
					color='blue'
					title='3'
					value={30}
					minValue={0}
					maxValue={100}
					className={styles.cards__leftdown} />
				<WindowRectCard
					color='blue'
					title='4'
					value={40}
					minValue={0}
					maxValue={100}
					className={styles.cards__right} />
			</div>
			<div className={styles.windows}>
				<div className={styles.windows__leftup}>
					<Window
						color='blue'
						value={1}
						textRight='МПа'
						textBottom='I отб.'
					/>
				</div>
				<div className={styles.windows__leftmid}>
					<Window
						color='blue'
						value={2}
						textRight='МПа'
						textBottom='II отб.'
					/>
				</div>
				<div className={styles.windows__leftdown}>
					<Window
						color='blue'
						value={3}
						textRight='МПа'
						textBottom='III отб.'
					/>
				</div>
				<div className={styles.windows__midup}>

					<Window
						color='blue'
						value={4}
						textRight='МПа'
					/>
				</div>
				<div className={styles.windows__middown}>
					<Window
						color='blue'
						value={5}
						textRight='°C'
					/>
				</div>
				<div className={styles.windows__rightup}>
					<Window
						color='blue'
						value={6}
						textRight='A'
					/>
				</div>
				<div className={styles.windows__rightdown}>
					<Window
						color='blue'
						value={7}
						textLeft='dP'
						textBottom='МПа'
					/>
				</div>
			</div>
			<Button width={88} height={28} text="ПВД" className={styles.button}/>
			<ArrowButton
				state="off"
				textBottomRight="ПЭН-1А"
				transform="rotateLeft90"
				className={styles.arrow}
			/>
		</div>
	);
};

export default TALeftDown;
