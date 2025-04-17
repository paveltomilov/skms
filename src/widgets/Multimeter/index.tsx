'use client';
import styles from './Multimeter.module.scss';
import { Display } from '@/entities/Display/Display';
import ControlPanel from '@/entities/ControlPanel/ControlPanel';
import { useAppSelector } from '@/shared/hooks/store';
import Probe from '@/shared/UI/icons/Probe';

const Multimeter: React.FC = () => {
	const multimeterState = useAppSelector(state => state.multimeter);
	return (
		<div className={styles.multimeter}>
			<Display value={multimeterState.displayValue} />
			<ControlPanel mode={multimeterState.currentMode} />
			<Probe className={styles.multimeter__blackProbe} />
			<Probe color="red" className={styles.multimeter__redProbe} />
		</div>
	);
};

export default Multimeter;
