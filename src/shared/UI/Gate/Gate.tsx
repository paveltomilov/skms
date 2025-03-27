import { GATE_STATE_TYPE } from '@/shared/types/gate';
import Icon from '../svg/Icon';
import style from './Gate.module.scss';
import { FC } from 'react';
import Triangle from '../svg/Triangle';
import { GATE_STATE } from '@/shared/configs/gate';

interface GateProps {
	state: GATE_STATE_TYPE;
	disable?: boolean;
	power?: boolean;
}

const Gate: FC<GateProps> = ({ state, disable = false, power = false }) => {
	const states = GATE_STATE[state];
	return (
		<div className={style.gate}>
			<Triangle
				color={states.left.color}
				transform={states.left.transform}
				className={states.left.animation ? style.animation : ''}
			/>
			<Triangle
				color={states.right.color}
				transform={states.right.transform}
				className={states.right.animation ? style.animation : ''}
			/>
			{disable && (
				<Icon
					className={style.gate__cross}
					name="close"
					size={{ width: 22, height: 22 }}
					color="red"
					strokeWidth={1}
				/>
			)}
			{power && (
				<Icon
					className={style.gate__power}
					name="power"
					size={{ width: 10, height: 10 }}
					transform="rotateLeft90"
					color={
						states.left.color === 'magenta_white'
							? 'magenta'
							: 'default'
					}
				/>
			)}
		</div>
	);
};

export default Gate;
