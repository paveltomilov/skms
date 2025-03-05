'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { FC, useState } from 'react';
import Loader from '@c/Loader/Loader';
import GateWindow from '@c/GateWindow/GateWindow';
import Button from '@/components/Button';

const Home: FC = () => {
	const [loading, setLoading] = useState(false);
	const handleClick = () => setLoading(prev => !prev);
	return (
		<main className={styles.main}>
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
				id="first-button" 
				width={100}
				height={50}
				text="Это слишком большой текст"
				// eslint-disable-next-line no-console
				onClick={() => console.log('Кнопка работает!')}
				style={{ padding: '10px' }}
				className="custom-class"
			/>

			<Button
				id="second-button"
				width={100}
				height={50}
				image={{
				src: '/images/button-icon.webp',
				width: 20,
				height: 20,
				}}
				// eslint-disable-next-line no-console
				onClick={() => console.log('Кнопка работает!')}
				style={{ padding: '10px' }}
				className="custom-class"
			/>
		</main>
	);
};

export default Home;
