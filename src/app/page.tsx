import styles from './page.module.scss';
import { FC } from 'react';
import Header from '@/components/Header/Header';

const Home: FC = () => {
	return (
		<main className={styles.main}>
			<Header />
		</main>
	);
};

export default Home;
