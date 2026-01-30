// components/InfoTooltip/InfoTooltip.tsx
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
	show?: boolean; // Добавляем пропс для управления видимостью
}

const InfoTooltip = ({
	text = 'Можно выбрать не более трех вариантов',
	size = 13,
	right,
	bottom,
	className = '',
	show = false, // По умолчанию скрыт
}: InfoTooltipProps) => {
	const tooltipStyle: CSSProperties = {};

	if (right !== undefined) {
		tooltipStyle.right = typeof right === 'number' ? `${right}px` : right;
	}

	if (bottom !== undefined) {
		tooltipStyle.bottom =
			typeof bottom === 'number' ? `${bottom}px` : bottom;
	}

	// Добавляем класс visible если show = true
	const tooltipClassName = `${styles.tooltip} ${show ? styles.visible : ''} ${className}`;

	return (
		<div className={styles.info__icon}>
			<Info size={size} />
			<div
				className={tooltipClassName}
				onClick={e => e.stopPropagation()}
				style={
					Object.keys(tooltipStyle).length > 0
						? tooltipStyle
						: undefined
				}
			>
				<Info className={styles.tooltip__svg} size={19} />
				<p className={styles.tooltip__description}>{text}</p>
			</div>
		</div>
	);
};

export default InfoTooltip;
