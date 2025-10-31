'use client';
import { FC } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Logo: FC = () => {
	return (
		<div className={styles.logo}>
			<Link href="">
				<Image
					src="assets/svg/logo.svg"
					alt="Логотип"
					width={156}
					height={40}
					priority
				/>
			</Link>
		</div>
	);
};

export default Logo;
