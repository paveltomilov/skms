'use client';
import { useState, useCallback } from 'react';
import styles from './Multimeter.module.scss';
import { Display } from '@/entities/Display/Display';
import { Dial } from '@/entities/Dial/Dial';
import { InputJacks } from '@/entities/InputJacks/InputJacks';
import type { MultimeterMode } from '@/shared/types/multimeter';
import ControlPanel from '@/entities/ControlPanel/ControlPanel';

const Multimeter: React.FC = () => {
	/* const [currentMode, setCurrentMode] = useState<MultimeterMode>('OFF');
	const [displayValue, setDisplayValue] = useState<string | number>(''); */

	/* 	const handleModeSelected = useCallback((mode: MultimeterMode) => {
		setCurrentMode(mode);
		if (mode === 'OFF') {
			setDisplayValue('');
		} else if (
			mode.startsWith('DCV_') ||
			mode.startsWith('ACV_') ||
			mode.startsWith('DCA_') ||
			mode === 'HFE'
		) {
			setDisplayValue('0.00');
		} else if (mode.startsWith('OHM_') || mode === 'DIODE') {
			setDisplayValue('OL');
		} else {
			setDisplayValue('---');
		}
	}, []); */

	return (
		<div className={styles.multimeter}>
			<Display value={0.0} />
			<ControlPanel
				mode={'OFF'}
				/*modeAngles={modeAngles}
				onModeSelect={handleModeSelected} */
			/>
		</div>
	);

	/* return (
		<div className={styles.multimeterContainer}>
			<svg
				viewBox="0 0 200 300"
				className={styles.multimeterSvgBase}
				xmlns="http://www.w3.org/2000/svg"
				aria-labelledby="multimeterTitle"
			>
				<title id="multimeterTitle">Виртуальный мультиметр (UI)</title>
				<use
					id="displayArea"
					href={`${spritePath}#multimeter-display-area`}
				/>
				<use href={`${spritePath}#multimeter-bg-lines`} />
				<use
					id="sectionHeaders"
					href={`${spritePath}#multimeter-section-headers`}
				/>
				<g className={styles.scaleLabels}>
					{Object.entries(labelPositions).map(
						([key, { angle, text, small }]) => {
							const textPos = getCoords(angle, labelRadius);
							const dotPos = getCoords(angle, indicatorDotRadius);
							return (
								<g
									key={`label-${key}`}
									className={styles.labelGroup}
								>
									<circle
										cx={dotPos.x}
										cy={dotPos.y}
										r="2"
										className={styles.indicatorDot}
										filter="url(#indicatorDotGlow)"
									/>
									<text
										x={textPos.x}
										y={textPos.y}
										className={`${styles.rangeLabel} ${
											small ? styles.smallLabel : ''
										}`}
									>
										{text}
									</text>
								</g>
							);
						},
					)}
				</g>
			</svg>
			<div className={styles.displayWrapper}>
				<Display value={displayValue} />
			</div>
			<div
				className={styles.dialWrapper}
				style={{ top: `${dialWrapperTopOffset}px` }}
			>
				<Dial
					currentMode={currentMode}
					modeAngles={modeAngles}
					onModeSelect={handleModeSelected}
				/>
			</div>
		</div>
	);*/
};

export default Multimeter;
