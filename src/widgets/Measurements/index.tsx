'use client';
import Multimetr from '@/entities/Multimetr';
import styles from './styles.module.scss';
import PopUp from '@/entities/Popup';

const Measurements = () => {
	return (
		<div className={styles.measurements}>
			<PopUp />
			<Multimetr />
		</div>
	);
};

export default Measurements;
