import { FC, useRef } from 'react';
import styles from './ControlPanel.module.scss';
import { MultimeterMode } from '@/shared/types/multimeter';
import { ARROW_ANGLES } from '@/shared/configs/multimeter';
import { useMultimeterKnob } from '@/shared/hooks/useMultimeterKnob';
import ProbeWire from '@/shared/UI/icons/ProbeWire';
import MultimeterArrow from '@/shared/UI/icons/MultimeterArrow';
import Panel from '@/shared/UI/icons/Panel';

interface Props {
	mode: MultimeterMode;
}

const ControlPanel: FC<Props> = ({ mode }) => {
	const knobRef = useRef<SVGSVGElement | null>(null);

	// логика вращения колеса внутри кастомного хука
	const { currentAngle, onMouseDown } = useMultimeterKnob<MultimeterMode>(
		knobRef,
		ARROW_ANGLES,
		mode,
	);

	return (
		<Panel className={styles.panel}>
			<MultimeterArrow
				ref={knobRef}
				onMouseDown={onMouseDown}
				className={styles.panel__arrow}
				angle={currentAngle}
			/>
			<ProbeWire
				className={`${styles.panel__wire} ${styles.panel__wire_black}`}
			/>
			<ProbeWire
				color="grey"
				className={`${styles.panel__wire} ${styles.panel__wire_grey}`}
			/>
			<ProbeWire
				color="red"
				className={`${styles.panel__wire} ${styles.panel__wire_red}`}
			/>
		</Panel>
	);
};
export default ControlPanel;
