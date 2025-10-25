import { SCHEME_ICON_SIZE } from '@/shared/configs/icon';
import { getVisualConfigByColor } from '@/shared/configs/lampIndicator';
import type { LampIndicatorColor } from '@/shared/types/icon';
import type { SchemeIconType } from '@/shared/types/scheme';
import cn from 'classnames';
import { FC, SVGProps } from 'react';
import styles from './styles.module.scss';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'color'>;

interface Props extends SvgProps {
	type?: Extract<SchemeIconType, 'lamp'>;
	color?: LampIndicatorColor;
}

const COLOR_CLASSNAME: Record<LampIndicatorColor, string> = {
	lamp_white_off: styles.lamp_white_off,
	lamp_white_on: styles.lamp_white_on,
	lamp_green_off: styles.lamp_green_off,
	lamp_green_on: styles.lamp_green_on,
};

const LampIndicator: FC<Props> = ({
	type = 'lamp',
	color = 'lamp_white_off',
	className,
	...rest
}) => {
	const sizes = SCHEME_ICON_SIZE[type];
	const { showGlow, showTop, topOpacity } = getVisualConfigByColor(color);
	const colorClassName = COLOR_CLASSNAME[color] ?? styles.lamp_white_off;

	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox="0 0 291 403"
			role="presentation"
			aria-hidden="true"
			className={cn(styles.root, colorClassName, className)}
			preserveAspectRatio="xMidYMid meet"
			{...rest}
		>
			<use
				href="/svg/sprite.svg#lampIndicator-base"
				width="100%"
				height="100%"
				className={styles.base}
			/>
			{showGlow && (
				<use
					href="/svg/sprite.svg#lampIndicator-light"
					width="100%"
					height="100%"
					className={styles.glow}
				/>
			)}
			{showTop && topOpacity > 0 && (
				<use
					href="/svg/sprite.svg#lampIndicator-top"
					width="100%"
					height="100%"
					className={styles.top}
				/>
			)}
		</svg>
	);
};

export default LampIndicator;
