'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { FC, useState } from 'react';
import Loader from '@c/Loader/Loader';
import GateWindow from '@c/GateWindow/GateWindow';
import Header from '@/components/Header/Header';
import Button from '@/components/Button';
import { useAppDispatch } from '@/store/hooks';
import { buttonClicked } from '@/store/buttonsSlice';

const Home: FC = () => {
	const [loading, setLoading] = useState(false);
	const handleClick = () => setLoading(prev => !prev);
	const dispatch = useAppDispatch();
	return (
		<main className={styles.main}>
			<Header />
			<h1>Home</h1>
			{loading && <Loader />}
			<button onClick={handleClick}>TOGGLE LOADING</button>
			<Image
				className={styles.logo}
				src="/images/next.svg"
				alt="Next.js logo"
				width={180}
				height={38}
				priority
			/>
			<GateWindow />

			<Button
				id="cat"
				width={100}
				height={50}
				//disabled
				text="Это слишком большой текст"
				/* image={{
					src: '/images/button-icon.webp',
					width: 80,
					height: 30,
				}} */
				onClick={() => dispatch(buttonClicked('cat'))}
				//success
			/>
		</main>
	);
};

export default Home;
