import styles from './page.module.scss';
import { FC } from 'react';
import Header from '@/components/Header/Header';
import Sidebar from '@c/Sidebar';
import Footer from '@c/Footer';

const Home: FC = () => {
	return (
		<main className={styles.main}>
			<Header />
			<Sidebar />
			<Footer />
		</main>
	);
};

export default Home;
