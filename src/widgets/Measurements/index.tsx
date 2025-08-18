import Multimeter from '@/widgets/Multimeter';
import styles from './styles.module.scss';

const Measurements = () => {
	return (
		<div className={styles.measurements}>
			{/* добавить блок с неисправностями */}
			<Multimeter />
		</div>
	);
};

export default Measurements;
