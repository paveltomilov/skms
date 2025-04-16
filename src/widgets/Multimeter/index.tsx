'use client';
import styles from './Multimeter.module.scss';
import { Display } from '@/entities/Display/Display';
import ControlPanel from '@/entities/ControlPanel/ControlPanel';
import { useAppSelector } from '@/shared/hooks/store';

const Multimeter: React.FC = () => {
	const multimeterState = useAppSelector(state => state.multimeter);
	return (
		<div className={styles.multimeter}>
			<Display value={multimeterState.displayValue || 0} />
			<ControlPanel mode={multimeterState.currentMode || 'OFF'} />
		</div>
	);
};

export default Multimeter;
