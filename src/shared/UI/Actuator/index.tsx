import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { FC } from 'react';
import { IconTransform } from '@/shared/types/icon';
import cn from 'classnames';
import styles from './styles.module.scss';

interface Props {
	state?: 'on' | 'off' | 'no power';
	disable?: boolean;
	transform?: keyof Pick<
		IconTransform,
		'rotate90' | 'rotateLeft90' | 'rotate180'
	>;
	textTop?: string;
	textTopLeft?: string;
	textTopRight?: string;
	textBottom?: string;
	textBottomLeft?: string;
	textBottomRight?: string;
	textLeft?: string;
	textRight?: string;
	className?: string;
}

const Actuator: FC<Props> = ({
	state = 'on',
	disable = false,
	transform,
	textTop,
	textTopLeft,
	textTopRight,
	textBottom,
	textBottomLeft,
	textBottomRight,
	textLeft,
	textRight,
	className,
}) => {
	const color =
		state === 'on' ? 'green' : state === 'off' ? 'white' : 'disabled';
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<div className={`${styles.arrow} ${className && className}`}>
			<svg
				className={styles.arrow__icon}
				width="36"
				height="36"
				viewBox="0 0 36 36"
				fill={colors}
				color={colors}
				transform={transforms}
				preserveAspectRatio="xMidYMid meet"
			>
				<use
					xlinkHref={'/svg/sprite.svg#circle_arrow'}
					width="100%"
					height="100%"
				/>
				{disable && (
					<>
						<path d="M0 36L36 0" stroke="#DE1212" strokeWidth="2" />
						<path
							d="M1.43051e-06 -1.57361e-06L36 36"
							stroke="#DE1212"
							strokeWidth="2"
						/>
					</>
				)}
			</svg>
			{textTop && (
				<span
					className={cn(styles.arrow__text, styles.arrow__text_top)}
				>
					{textTop}
				</span>
			)}
			{textTopLeft && (
				<span
					className={cn(
						styles.arrow__text,
						styles.arrow__text_top_left,
					)}
				>
					{textTopLeft}
				</span>
			)}
			{textTopRight && (
				<span
					className={cn(
						styles.arrow__text,
						styles.arrow__text_top_right,
					)}
				>
					{textTopRight}
				</span>
			)}
			{textBottom && (
				<span
					className={cn(
						styles.arrow__text,
						styles.arrow__text_bottom,
					)}
				>
					{textBottom}
				</span>
			)}
			{textBottomLeft && (
				<span
					className={cn(
						styles.arrow__text,
						styles.arrow__text_bottom_left,
					)}
				>
					{textBottomLeft}
				</span>
			)}
			{textBottomRight && (
				<span
					className={cn(
						styles.arrow__text,
						styles.arrow__text_bottom_right,
					)}
				>
					{textBottomRight}
				</span>
			)}
			{textLeft && (
				<span
					className={cn(styles.arrow__text, styles.arrow__text_left)}
				>
					{textLeft}
				</span>
			)}
			{textRight && (
				<span
					className={cn(styles.arrow__text, styles.arrow__text_right)}
				>
					{textRight}
				</span>
			)}
		</div>
	);
};

export default Actuator;
