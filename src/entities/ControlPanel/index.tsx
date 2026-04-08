import { FC, useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import { MultimeterMode } from '@/shared/types/multimeter';
import { MULTIMETER_ANGLES } from '@/shared/configs/knob';
import MultimeterArrow from '@/shared/UI/icons/MultimeterArrow';
import Panel from '@/shared/UI/icons/Panel';
import { useAppDispatch } from '@/shared/hooks/store';
import { setCurrentMode, toggleAllowedMode } from '@/store/multimeterSlice';
import { useRotateKnob } from '@/shared/hooks/useRotateKnob';

interface Props {
	mode: MultimeterMode;
}

const ControlPanel: FC<Props> = ({ mode }) => {
	const knobRef = useRef<SVGSVGElement | null>(null);

	// логика вращения колеса внутри кастомного хука
	const { angle, onMouseDown, getSelectedMode } =
		useRotateKnob<MultimeterMode>(knobRef, MULTIMETER_ANGLES, mode);

	const dispatch = useAppDispatch();

	const handleMouseUp = useCallback(() => {
		const selectedMode: MultimeterMode | null = getSelectedMode();
		if (selectedMode) {
			dispatch(setCurrentMode(selectedMode));
			return;
		}
		dispatch(toggleAllowedMode());
	}, [getSelectedMode, dispatch]);

	return (
		<Panel className={styles.panel}>
			<MultimeterArrow
				ref={knobRef}
				onMouseDown={onMouseDown}
				onMouseUp={handleMouseUp}
				className={styles.panel__arrow}
				angle={angle}
			/>
		</Panel>
	);
};
export default ControlPanel;
