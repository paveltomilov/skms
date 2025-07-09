import styles from './styles.module.scss';
import Scheme from '@/widgets/Scheme';
import Sidebar from '@/widgets/Sidebar';
import HeaderZra from '@/widgets/HeaderZra';
import Measurements from '@/widgets/Measurements';
import Dnd from '@/widgets/Dnd';
import FooterZra from '@/widgets/FooterZra';

const Zra = () => {
	return (
		<>
			<HeaderZra />
			<main>
				<Sidebar />
				<Dnd>
					<section className={styles.simulator}>
						<h1 className={styles.simulator__title}>Тренажёр</h1>
						<Scheme />
					</section>
					<Measurements />
				</Dnd>
			</main>
			<FooterZra />
		</>
	);
};

export default Zra;
