import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import { WINDOWS } from '@/shared/configs/window';

interface Props {
	className?: string;
}

const KAMidDown: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowsLeft}>
				<div className={styles.windowsLeft__wrapper}>
					<span className={styles.text}>Верхний ярус</span>
					<span className={styles.rectangle}></span>
					<Button width={88} height={28} text="ПМТвер" />
				</div>
				<div className={styles.windowsLeft__wrapper}>
					<span className={styles.text}>Средний ярус</span>
					<span className={styles.rectangle}></span>
					<Button width={88} height={28} text="ПМТср" />
				</div>
				<div className={styles.windowsLeft__wrapper}>
					<span className={styles.text}>Нижний ярус</span>
					<span className={styles.rectangle}></span>
					<Button width={88} height={28} text="ПМТниз" />
				</div>
			</div>
			<div className={styles.windowsMiddle}>
				<div className={styles.windowsMiddle__wrapper}>
					<Window data={WINDOWS.w179} right />
					<Window data={WINDOWS.w180} right />
				</div>
				<span className={styles.text}>Рециркуляция мазута</span>
			</div>
			<div className={styles.windowsRight}>
				<span className={styles.text}>э/ф</span>
				<div className={styles.windowsRight__btnWrapper}>
					<Button className={styles.btn} width={79} height={22} text="РДИГ" />
					<Button className={styles.btn} width={79} height={22} text="КРР" />
				</div>
			</div>
		</div>
	);
};

export default KAMidDown;
