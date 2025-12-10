import { GateStates } from '@/shared/types/gate';
import styles from './styles.module.scss';
import { FC } from 'react';
import Triangle from '../icons/Triangle';
import { GATE_POSITION, GATE_STATE } from '@/shared/configs/gate';
import Close from '../icons/Close';
import Power from '../icons/Power';
import cn from 'classnames';

interface Props {
	state: keyof GateStates;
	disable?: boolean;
	power?: boolean;
	shadow?: boolean;
	position?: 'horizontal' | 'vertical';
	textTop?: string;
	textTopLeft?: string;
	textTopRight?: string;
	textBottom?: string;
	textBottomLeft?: string;
	textBottomRight?: string;
	textLeft?: string;
	textRight?: string;
	onClick?: () => void;
	className?: string;
	malfunctions?: string[];
}

const Gate: FC<Props> = ({
	state,
	position = 'horizontal',
	disable = false,
	power = false,
	shadow = false,
	textTop,
	textTopLeft,
	textTopRight,
	textBottom,
	textBottomLeft,
	textBottomRight,
	textLeft,
	textRight,
	onClick,
	className,
	malfunctions = [],
}) => {
	const states = GATE_STATE[state];
	const positions = GATE_POSITION[position];
	const isVertical = position === 'vertical';
	const hasGateError: boolean = malfunctions.length > 0;
	return (
		<div className={cn(styles.gate__wrapper, className)} onClick={onClick}>
			<div
				className={cn(styles.gate, {
					[styles.gate_vertical]: isVertical,
					[styles.gate_shadow]: shadow,
					[styles.isActiveError]: hasGateError,
				})}
			>
				<Triangle
					color={states.left.color}
					transform={positions.left}
					className={
						states.left.animation ? styles.gate__animation : ''
					}
				/>
				<Triangle
					color={states.right.color}
					transform={positions.right}
					className={
						states.right.animation ? styles.gate__animation : ''
					}
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
			{textTop && (
				<span className={cn(styles.gate__text, styles.gate__text_top)}>
					{textTop}
				</span>
			)}
			{textTopLeft && (
				<span
					className={cn(
						styles.gate__text,
						styles.gate__text_top_left,
					)}
				>
					{textTopLeft}
				</span>
			)}
			{textTopRight && (
				<span
					className={cn(
						styles.gate__text,
						styles.gate__text_top_right,
					)}
				>
					{textTopRight}
				</span>
			)}
			{textBottom && (
				<span
					className={cn(styles.gate__text, styles.gate__text_bottom)}
				>
					{textBottom}
				</span>
			)}
			{textBottomLeft && (
				<span
					className={cn(
						styles.gate__text,
						styles.gate__text_bottom_left,
					)}
				>
					{textBottomLeft}
				</span>
			)}
			{textBottomRight && (
				<span
					className={cn(
						styles.gate__text,
						styles.gate__text_bottom_right,
					)}
				>
					{textBottomRight}
				</span>
			)}
			{textLeft && (
				<span className={cn(styles.gate__text, styles.gate__text_left)}>
					{textLeft}
				</span>
			)}
			{textRight && (
				<span
					className={cn(styles.gate__text, styles.gate__text_right)}
				>
					{textRight}
				</span>
			)}
		</div>
	);
};

export default Gate;
