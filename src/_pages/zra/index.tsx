import styles from './styles.module.scss';
import Scheme from '@/widgets/Scheme';
const Zra = () => {
	return (
		<section className={styles.page}>
			<h1 className={styles.page__title}>Тренажёр</h1>
			<div className={styles.page__wrapper}>
				<Scheme />
				{/* сюда вставить мультиметр и попап */}
			</div>
		</section>
	);
};

export default Zra;
