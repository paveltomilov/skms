'use client';
import styles from './styles.module.scss';
import { Display } from '@/entities/Display/Display';
import ControlPanel from '@/entities/ControlPanel';
import { useAppSelector } from '@/shared/hooks/store';
import ProbeHolder from '@/shared/UI/icons/ProbeHolder';
import Probe from '@/entities/Probe';

const Multimeter: React.FC = () => {
	const multimeterState = useAppSelector(state => state.multimeter);
	const activeProbe = useAppSelector(state => state.multimeter.activeProb);
	const probeConnections = useAppSelector(
		state => state.multimeter.probeConnections,
	);

	return (
		<div className={styles.multimeter}>
			<Display value={multimeterState.displayValue} />
			<ControlPanel mode={multimeterState.currentMode} />
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_black}`}
			>
				{/* если щуп не перетаскивается и не прикреплен к схеме, он рендерится мультиметром */}
				{activeProbe !== 'black' && !probeConnections['black'] && (
					<Probe color="black" />
				)}
			</ProbeHolder>
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_red}`}
			>
				{/* если щуп не перетаскивается и не прикреплен к схеме, он рендерится мультиметром */}
				{activeProbe !== 'red' && !probeConnections['red'] && (
					<Probe color="red" />
				)}
			</ProbeHolder>
		</div>
	);
};

export default Multimeter;
