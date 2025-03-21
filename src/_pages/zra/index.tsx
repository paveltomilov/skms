import styles from './styles.module.scss';
import Scheme from '@/widgets/Scheme';
import Footer from '@/widgets/Footer';
import Sidebar from '@/widgets/Sidebar';
import Header from '@/widgets/Header/Header';
import Measurements from '@/widgets/Measurements';
const Zra = () => {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<Sidebar />
				<section className={styles.page}>
					<h1 className={styles.page__title}>Тренажёр</h1>
					<div className={styles.page__wrapper}>
						<Scheme />
						<Measurements />
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Zra;
