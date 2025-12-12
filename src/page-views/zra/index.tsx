import styles from './styles.module.scss';
import Scheme from '@/widgets/Scheme';
import Sidebar from '@/widgets/Sidebar';
import HeaderZra from '@/widgets/HeaderZra';
import Measurements from '@/widgets/Measurements';
import FooterZra from '@/widgets/FooterZra';

const Zra = () => {
	return (
		<>
			<HeaderZra />
			<main className={styles.main}>
				<Sidebar />
				<section className={styles.section}>
					<h1 className={styles.section__title}>Тренажёр</h1>
					<Scheme />
				</section>
				<Measurements />
			</main>
			<FooterZra />
		</>
	);
};

export default Zra;
