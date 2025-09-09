import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Pin from '../icons/Pin';
import ProvodLine from '../icons/ProvodLine';
import BreakLine from '../icons/BreakLine';

interface Props {
	className?: string;
	rotate?: 90 | 180 | 270;
	length?: number;
	isBreak?: boolean;
}

const Provod: FC<Props> = ({
	className,
	rotate = 0,
	length,
	isBreak = true,
}) => {
	return (
		<div
			className={cn(styles.container, className)}
			style={{ rotate: `${rotate}deg` }}
		>
			<Pin className={styles.pin} />
			<ProvodLine length={length} className={styles.provodLine} />
			{isBreak && <BreakLine className={styles.breakLine} />}
		</div>
	);
};

export default Provod;
