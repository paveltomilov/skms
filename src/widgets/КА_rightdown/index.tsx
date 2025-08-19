import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface Props {
	className?: string;
}

const КАRightDown: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.container)}>
			<div className={styles.windowsTop}>
				<div className={styles.windowsTop__left}></div>
				<div className={styles.windowsTop__middle}></div>
				<div className={styles.windowsTop__right}></div>
			</div>
			<div className={styles.windowsMiddle}>
				<div className={styles.windowsMiddle__left}></div>
				<div className={styles.windowsMiddle__middle}></div>
				<div className={styles.windowsMiddle__right}></div>
			</div>
			<div className={styles.windowsBottom}>
				<div className={styles.windowsBottom__left}></div>
				<div className={styles.windowsBottom__middle}></div>
				<div className={styles.windowsBottom__right}></div>
			</div>
		</div>
	);
};
