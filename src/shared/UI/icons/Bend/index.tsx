import { FC } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import styles from './styles.module.scss';

interface Props {
	className?: string;
	rotate?: string;
}

const Bend: FC<Props> = ({ className, rotate = 0 }) => {
	return (
		<div className={cn(className, styles.bend)}>
			<Image
				style={{ transform: `rotate(${rotate}deg)` }}
				src={'/images/curv.png'}
				className={styles.bend_img}
				alt={'band'}
				width={50}
				height={50}
			/>
		</div>
	);
};

export default Bend;
