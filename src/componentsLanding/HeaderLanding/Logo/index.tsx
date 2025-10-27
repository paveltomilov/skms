'use client';
import { FC } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

const Logo: FC = () => {
	return (
		<div className={styles.logo}>
			<a href="">
				<Image
					src="assets/svg/logo.svg"
					alt="Логотип"
					width={156}
					height={40}
					priority // если это важный контент, загружается сразу
				/>
			</a>
		</div>
	);
};

export default Logo;
