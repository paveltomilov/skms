import { Cross, Triangle } from '../../../shared/svg';
import style from './Gate.module.scss';
import { FC } from 'react';

interface GateProps {
	gateState: string;
	disable?: boolean;
}

const Gate: FC<GateProps> = ({ gateState, disable = false }) => {
	return (
		<div className={`${style.gate} ${style[gateState]}`}>
			<Triangle />
			<Triangle />
			{disable && <Cross className={style.gate__cross} />}
		</div>
	);
};

export default Gate;
