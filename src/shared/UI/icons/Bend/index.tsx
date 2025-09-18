import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface Props {
	className?: string;
	rotate?: string;
}

const Bend: FC<Props> = ({ className, rotate = 0 }) => {
	return (
		<div
			className={cn(className, styles.bend)}
		>
			<img
				style={{ transform: `rotate(${rotate}deg)` }}
				src={'/images/curv.png'}
				className={styles.bend_img}
			/>
		</div>
	);
};

export default Bend;
