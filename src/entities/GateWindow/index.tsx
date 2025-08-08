import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppSelector } from '@/shared/hooks/store';
import Gate from '@/shared/UI/Gate';
import Window from '@/shared/UI/Window';

const GateWindow: FC = () => {
	//потом передать динамически id, пока захардкодила
	const { g1 } = useAppSelector(state => state.gate);

	return (
		<div className={styles.window}>
			<Gate state={g1.states} shadow />
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
