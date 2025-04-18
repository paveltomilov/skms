'use client';
import styles from './Multimeter.module.scss';
import { Display } from '@/entities/Display/Display';
import ControlPanel from '@/entities/ControlPanel/ControlPanel';
import { useAppSelector } from '@/shared/hooks/store';
import Probe from '@/shared/UI/icons/Probe';
import ProbeHolder from '@/shared/UI/icons/ProbeHolder';

const Multimeter: React.FC = () => {
	const multimeterState = useAppSelector(state => state.multimeter);
	return (
		<div className={styles.multimeter}>
			<Display value={multimeterState.displayValue} />
			<ControlPanel mode={multimeterState.currentMode} />
			<ProbeHolder className={styles.multimeter__blackProbeHolder}>
				<Probe className={styles.multimeter__blackProbe} />
			</ProbeHolder>
			<ProbeHolder className={styles.multimeter__redProbeHolder}>
				<Probe color="red" className={styles.multimeter__redProbe} />
			</ProbeHolder>
		</div>
	);
};

export default Multimeter;
