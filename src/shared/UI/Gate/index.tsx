import { GATE_STATE_TYPE } from '@/shared/types/gate';
import Icon from '../svg/Icon';
import styles from './styles.module.scss';
import { FC } from 'react';
import Triangle from '../svg/Triangle';
import { GATE_POSITION, GATE_STATE } from '@/shared/configs/gate';

interface Props {
	state: GATE_STATE_TYPE;
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
				<Icon
					className={`${styles.gate__cross}
		${isVertical && styles.gate__cross_vertical}`}
					name="close"
					size={{ width: 22, height: 22 }}
					color="red"
					strokeWidth={1}
				/>
			)}
			{power && (
				<Icon
					className={`${styles.gate__power}
		${isVertical && styles.gate__power_vertical}`}
					name="power"
					size={{ width: 10, height: 10 }}
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
