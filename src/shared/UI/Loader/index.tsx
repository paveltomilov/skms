import { FC } from 'react';
import style from './styles.module.scss';
import Image from 'next/image';

const Loader: FC = () => {
	return (
		<Image
			width="121"
			height="130"
			src="/svg/spinner.svg"
			alt="Loading"
			priority={true}
			className={style.loader}
		/>
	);
};

export default Loader;
