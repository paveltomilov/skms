import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppSelector } from '@/shared/hooks/store';
import Gate from '@/shared/UI/Gate';
import Window from '@/shared/UI/Window';

const GateWindow: FC = () => {
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
	const gate = useAppSelector(state => state.gate.gates[gateId]);

	return (
		<div className={styles.window}>
			<Gate state={gate.states} shadow />
			<Window
				color="blue"
				value={18.8}
				textRight="м3/ч"
				colorText="white"
				className={styles.window__measurement}
			/>
		</div>
	);
};

export default GateWindow;
