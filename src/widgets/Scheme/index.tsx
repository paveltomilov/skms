import Image from 'next/image';
import styles from './styles.module.scss';
import { FC } from 'react';

const Scheme: FC = () => {
	return (
		<div className={styles.wrapper}>
			<Image
				src="/images/scheme.png"
				alt="Схема"
				width={1053.33}
				height={693.6}
			/>
			<Image
				src="/images/functional-scheme.png"
				alt="Функциональность"
				width={166}
				height={504}
			/>
		</div>
	);
};
export default Scheme;
