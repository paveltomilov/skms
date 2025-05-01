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
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_black}`}
			>
				<Probe
					className={`${styles.multimeter__probe} ${styles.multimeter__probe_black}`}
				/>
			</ProbeHolder>
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_red}`}
			>
				<Probe
					color="red"
					className={`${styles.multimeter__probe} ${styles.multimeter__probe_red}`}
				/>
			</ProbeHolder>
		</div>
	);
};

export default Multimeter;
