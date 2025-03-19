import styles from './page.module.scss';
import { FC } from 'react';
import Header from '@/components/Header/Header';
import Sidebar from '@c/Sidebar';
import Footer from '@c/Footer';
import ParentComponent from '@c/PopUp/ParentComponent'; 
import Multimetr from '@/components/Multimetr';


const Home: FC = () => {
	return (
		<main className={styles.main}>
			<Header />
			<Sidebar />
			<ParentComponent />
			<Multimetr />
			<Footer />
		</main>
	);
};

export default Home;
