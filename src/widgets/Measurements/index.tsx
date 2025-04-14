'use client';
import Multimeter from '@/widgets/Multimetr';
import styles from './styles.module.scss';
import PopUp from '@/entities/PopUp';

const Measurements = () => {
	return (
		<div className={styles.measurements}>
			<PopUp />
			<Multimeter />
		</div>
	);
};

export default Measurements;
