import styles from './styles.module.scss';
import Footer from '@/widgets/Footer';
import Sidebar from '@/widgets/Sidebar';
import Header from '@/widgets/Header/Header';
import Simulator from '@/widgets/Simulator/Simulator';

const Zra = () => {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<Sidebar />
				<section className={styles.page}>
					<h1 className={styles.page__title}>Тренажёр</h1>
					<Simulator />
					<div className={styles.page__wrapper}>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}; 

export default Zra;