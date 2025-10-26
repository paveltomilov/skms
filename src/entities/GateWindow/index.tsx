import styles from './styles.module.scss';
import { FC, useEffect } from 'react';
import { useAppSelector } from '@/shared/hooks/store';
import Gate from '@/shared/UI/Gate';
import Window from '@/shared/UI/Window';
import { RootState } from '@/store/store';
import useRandomWindowCurrentValue from '@/shared/hooks/useRandomWindowCurrentValue';
import { getRandomNumberWindows } from '@/shared/utils/getRandomNumberWindows/getRandomNumberWindows';

// окно для header тренажер
const GateWindow: FC = () => {
	const updateWindows = useRandomWindowCurrentValue();
	useEffect(() => {
		const interval = setInterval(() => {
			updateWindows();
		}, getRandomNumberWindows(1000, 2000));

		return () => clearInterval(interval);
	}, [updateWindows]);
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
	const gate = useAppSelector(state => state.gate.gates[gateId]);
	const windows = useAppSelector((state: RootState) => state.windows);

	return (
		<div className={styles.window}>
			<Gate state={gate.states} shadow />
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
