import styles from './styles.module.scss';
import Scheme from '@/widgets/Scheme';
import Footer from '@/widgets/Footer';
import Sidebar from '@/widgets/Sidebar';
import Header from '@/widgets/Header/Header';
import Measurements from '@/widgets/Measurements';
import Simulator from '@/widgets/Simulator/Simulator';
const Zra = () => {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<Sidebar />
				<Simulator>
					<section className={styles.simulator}>
						<h1 className={styles.simulator__title}>Тренажёр</h1>
						<Scheme />
					</section>
					<Measurements />
				</Simulator>
			</main>
			<Footer />
		</>
	);
};

export default Zra;
