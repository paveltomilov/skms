import { FC, useRef } from 'react';
import styles from './styles.module.scss';
import { MultimeterMode } from '@/shared/types/multimeter';
import { ARROW_ANGLES } from '@/shared/configs/multimeter';
import { useMultimeterKnob } from '@/shared/hooks/useMultimeterKnob';
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
		</Panel>
	);
};
export default ControlPanel;
