'use client';
import Simulator from '@/widgets/Simulator/Simulator';
import styles from './styles.module.scss';
import PopUp from '@/entities/PopUp';

const Measurements = () => {
	return (
		<div className={styles.measurements}>
			<PopUp />
			<Simulator />
		</div>
	);
};

export default Measurements;