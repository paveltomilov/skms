import style from './GateWindow.module.scss';
import { FC } from 'react';
import { useAppSelector } from '@/shared/hooks/store';
import Gate from '@/shared/UI/Gate';

const GateWindow: FC = () => {
	const { state, value } = useAppSelector(state => state.gateReducer);

	return (
		<div className={style.window}>
			<Gate state={state} />
			<div className={style.indication}>
				<span className={style.value}>{value}</span>
				<span className={style.measurements}>м3/ч</span>
			</div>
		</div>
	);
};

export default GateWindow;
