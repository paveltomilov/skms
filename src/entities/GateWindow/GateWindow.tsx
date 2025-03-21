import style from './GateWindow.module.scss';
import { FC } from 'react';
import { useAppSelector } from '@/shared/hooks/store';
import Gate from '@/shared/UI/Gate/Gate';

const GateWindow: FC = () => {
	const gateState = useAppSelector(state => state.gateReducer);

	return (
		<div className={style.window}>
			<Gate gateState={gateState.state} />
			<div className={style.indication}>
				<span className={style.value}>{gateState.value}</span>
				<span className={style.measurements}>м3/ч</span>
			</div>
		</div>
	);
};

export default GateWindow;
