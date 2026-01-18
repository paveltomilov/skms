import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppSelector } from '@/shared/hooks/store';
import Gate from '@/shared/UI/Gate';
import Window from '@/shared/UI/Window';
import { RootState } from '@/store/store';
import { useIsSimulationActive } from '@/shared/hooks/useIsSimulationActive';

// окно для header тренажер
const GateWindow: FC = () => {
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
	const gate = useAppSelector(state => state.gate.gates[gateId]);
	const windows = useAppSelector((state: RootState) => state.windows);
	const isSimulationActive = useIsSimulationActive();

	return (
		<div className={styles.window}>
			<Gate
				state={gate.states}
				shadow
				malfunctions={gate.malfunctions}
				errorBlink={isSimulationActive}
			/>
			<Window
				color="blue"
				data={windows.w237}
				right
				colorText="white"
				className={styles.window__measurement}
			/>
		</div>
	);
};

export default GateWindow;
