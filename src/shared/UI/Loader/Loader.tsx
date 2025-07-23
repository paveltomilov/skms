import { FC } from 'react';
import style from './Loader.module.scss';
import Image from 'next/image';

const Loader: FC = () => {
	return (
		<div className={style.load} data-testid="loading">
			<Image
				width="121"
				height="130"
				src="/images/load.svg"
				alt="Loading"
				className={style.image}
			/>
		</div>
	);
};

export default Loader;
