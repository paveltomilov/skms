import { GateStates } from '@/shared/types/gate';
import styles from './styles.module.scss';
import { FC } from 'react';
import Triangle from '../icons/Triangle';
import { GATE_POSITION, GATE_STATE } from '@/shared/configs/gate';
import Close from '../icons/Close';
import Power from '../icons/Power';

interface Props {
	state: keyof GateStates;
	disable?: boolean;
	power?: boolean;
	position?: 'horizontal' | 'vertical';
}

const Gate: FC<Props> = ({
	state,
	position = 'horizontal',
	disable = false,
	power = false,
}) => {
	const states = GATE_STATE[state];
	const positions = GATE_POSITION[position];
	const isVertical = position === 'vertical';
	return (
		<div
			className={`${styles.gate}
		${isVertical && styles.gate_vertical}`}
		>
			<Triangle
				color={states.left.color}
				transform={positions.left}
				className={states.left.animation ? styles.gate__animation : ''}
			/>
			<Triangle
				color={states.right.color}
				transform={positions.right}
				className={states.right.animation ? styles.gate__animation : ''}
			/>
			{disable && (
				<Close
					className={`${styles.gate__cross}
		${isVertical && styles.gate__cross_vertical}`}
					size={{ width: 22, height: 22 }}
					color="red"
					strokeWidth={1}
				/>
			)}
			{power && (
				<Power
					className={`${styles.gate__power}
		${isVertical && styles.gate__power_vertical}`}
					transform={isVertical ? 'rotate180' : 'rotateLeft90'}
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
