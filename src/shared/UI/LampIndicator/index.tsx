import { ICON_COLOR, SCHEME_ICON_SIZE } from '@/shared/configs/icon';
import { getBottomGradientByColor, getVisualConfigByColor } from '@/shared/configs/lampIndicator';
import type { LampIndicatorColor } from '@/shared/types/icon';
import { LampIndicatorCssVars } from '@/shared/types/lamp';
import type { SchemeIconType } from '@/shared/types/scheme';
import { FC } from 'react';


interface Props {
	type?: Extract<SchemeIconType, 'lamp'>;
	color?: LampIndicatorColor;
	className?: string;
	style?: React.CSSProperties;
}

const LampIndicator: FC<Props> = ({
	type = 'lamp',
	color = 'lamp_white_off',
	className,
	style,
}) => {
	const sizes = SCHEME_ICON_SIZE[type];
	const topColor = (ICON_COLOR[color] ?? ICON_COLOR.lamp_white_off) as string;
	const { showGlow, showTop, topOpacity } = getVisualConfigByColor(color);
	const bottomGradient = getBottomGradientByColor(color);

	const bottomGradientVars: LampIndicatorCssVars = {
		'--lamp-bottom-start': bottomGradient.start,
		'--lamp-bottom-end': bottomGradient.end,
	};

	const styleWithVars = { ...style, ...bottomGradientVars } as React.CSSProperties;

	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox="0 0 291 403"
			aria-hidden
			className={className}
			style={styleWithVars}
			preserveAspectRatio="xMidYMid meet"
		>
			<use href="/svg/sprite.svg#lampIndicator-base" width="100%" height="100%" />
			{showGlow && (
				<use
					href="/svg/sprite.svg#lampIndicator-light"
					width="100%"
					height="100%"
					style={{ color: topColor }}
				/>
			)}
			{showTop && topOpacity > 0 && (
				<use
					href="/svg/sprite.svg#lampIndicator-top"
					width="100%"
					height="100%"
					style={{ color: topColor, opacity: topOpacity }}
				/>
			)}
		</svg>
	);
};

export default LampIndicator;
