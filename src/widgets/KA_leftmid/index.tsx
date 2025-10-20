import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Window from '@/shared/UI/Window';
import Button from '@/shared/UI/Button';
import Tilde from '@/shared/UI/icons/Tilde';
import {
	buttonsConfig,
	firstWindows,
	fourthWindows,
	secondWindows,
	thirdWindows,
	tildaConfig,
} from '@/shared/configs/KALeftMid';
import useShowModal from '@/shared/hooks/useShowModal';

interface Props {
	className?: string;
}

const KALeftMid: FC<Props> = ({ className }) => {
	const handleModalNotification = useShowModal('notification');
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windows}>
				{firstWindows.map((window, index) => (
					<Window key={index} data={window} right />
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
						onClick={handleModalNotification}
					/>
				))}
			</div>

			<div className={styles.windows__tilda}>
				{tildaConfig.map((tilda, index) => (
					<Tilde
						key={index}
						size="md"
						color={tilda.color}
						disable={tilda.disabled}
					/>
				))}
			</div>

			<div className={styles.windows}>
				{secondWindows.map((window, index) => (
					<Window key={index} data={window} right />
				))}
			</div>

			<div className={styles.windows}>
				{thirdWindows.map((window, index) => (
					<Window key={index} data={window} right />
				))}
			</div>

			<div className={styles.windows}>
				{fourthWindows.map((window, index) => (
					<Window key={index} data={window} right />
				))}
			</div>
		</div>
	);
};

export default KALeftMid;
