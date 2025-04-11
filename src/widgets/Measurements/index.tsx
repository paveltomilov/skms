'use client';
import { SimulationEnvironment } from '@/widgets/SimulationEnvironment/SimulationEnvironment';

import styles from './styles.module.scss';
import PopUp from '@/entities/PopUp';

const Measurements = () => {
	return (
		<div className={styles.measurements}>
			<PopUp />
			<SimulationEnvironment />
		</div>
	);
};

export default Measurements;
