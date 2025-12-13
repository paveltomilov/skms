import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppSelector } from '@/shared/hooks/store';
import Gate from '@/shared/UI/Gate';
import Window from '@/shared/UI/Window';
import { RootState } from '@/store/store';

// окно для header тренажер
const GateWindow: FC = () => {
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
	const gate = useAppSelector(state => state.gate.gates[gateId]);
	const windows = useAppSelector((state: RootState) => state.windows);

	return (
		<div className={styles.window}>
			<Gate state={gate.states} shadow malfunctions={gate.malfunctions} />
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
