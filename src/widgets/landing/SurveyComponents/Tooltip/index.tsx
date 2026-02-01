'use client';

import Info from '../../IconSvg/info';
import styles from './styles.module.scss';
import { CSSProperties } from 'react';

interface InfoTooltipProps {
	text?: string;
	size?: number;
	right?: number | string;
	bottom?: number | string;
	className?: string;
	show?: boolean;
}

const InfoTooltip = ({
	text = 'Можно выбрать не более трех вариантов',
	size = 13,
	right,
	bottom,
	className = '',
	show = false,
}: InfoTooltipProps) => {
	const tooltipStyle: CSSProperties = {};

	if (right !== undefined) {
		tooltipStyle.right = typeof right === 'number' ? `${right}px` : right;
	}

	if (bottom !== undefined) {
		tooltipStyle.bottom =
			typeof bottom === 'number' ? `${bottom}px` : bottom;
	}

	return (
		<div className={`${styles.tooltip} ${className}`}>
			<Info size={size} />
			<div
				className={`${styles.tooltip__content} ${show ? styles.tooltip__content_visible : ''}`}
				onClick={e => e.stopPropagation()}
				style={
					Object.keys(tooltipStyle).length > 0
						? tooltipStyle
						: undefined
				}
			>
				<Info className={styles.tooltip__content_svg} size={19} />
				<p className={styles.tooltip__content_description}>{text}</p>
			</div>
		</div>
	);
};

export default InfoTooltip;
