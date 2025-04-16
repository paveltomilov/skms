import { FC, useRef } from 'react';
import styles from './ControlPanel.module.scss';
import { MultimeterMode } from '@/shared/types/multimeter';
import { ARROW_ANGLES } from '@/shared/configs/multimeter';
import { useMultimeterKnob } from '@/shared/hooks/useMultimeterKnob';

interface Props {
	mode: MultimeterMode;
}

const ControlPanel: FC<Props> = ({ mode }) => {
	const knobRef = useRef<SVGSVGElement | null>(null);
	const { currentMode, currentAngle, onMouseDown } = useMultimeterKnob(
		knobRef,
		ARROW_ANGLES,
		mode,
	);

	console.log(currentMode);

	return (
		<div className={styles.panel}>
			<svg
				ref={knobRef}
				onMouseDown={onMouseDown}
				className={styles.panel__arrow}
				transform={`rotate(${currentAngle})`}
			>
				<use xlinkHref={'/svg/sprite.svg#multimeter-arrow'} />
			</svg>
		</div>
	);
};
export default ControlPanel;
