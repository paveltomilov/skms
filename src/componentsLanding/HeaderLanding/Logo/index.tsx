import { FC } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
	className?: string;
};

const Logo: FC<LogoProps> = ({ className }) => (
	<Link href="" className={`${styles.logo} ${className ?? ''}`}>
		<Image
			src="/assets/svg/logo.svg"
			alt="Логотип"
			width={156}
			height={40}
			priority
		/>
	</Link>
);

export default Logo;
