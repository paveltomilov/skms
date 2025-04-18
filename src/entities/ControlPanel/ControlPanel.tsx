import { FC, useEffect, useRef } from 'react';
import styles from './ControlPanel.module.scss';
import { MultimeterMode } from '@/shared/types/multimeter';
import { ARROW_ANGLES } from '@/shared/configs/multimeter';
import { useMultimeterKnob } from '@/shared/hooks/useMultimeterKnob';
import { useAppDispatch } from '@/shared/hooks/store';
import { setCurrentMode } from '@/store/multimeterSlice';
import { useDebounce } from '@/shared/hooks/useDebounce';
import ProbeWire from '@/shared/UI/icons/ProbeWire';
import MultimeterArrow from '@/shared/UI/icons/MultimeterArrow';

interface Props {
	mode: MultimeterMode;
}

const ControlPanel: FC<Props> = ({ mode }) => {
	const dispatch = useAppDispatch();
	const knobRef = useRef<SVGSVGElement | null>(null);

	// логика вращения колеса внутри кастомного хука
	const { currentMode, currentAngle, onMouseDown } =
		useMultimeterKnob<MultimeterMode>(knobRef, ARROW_ANGLES, mode);

	// useDebounce для задержки(чтобы не диспатчить экшены на каждое движение колеса)
	const activeMode = useDebounce(currentMode, 5000);

	// useEffect для того чтобы не диспатчить экшн во время рендеринга компонента ControlPanel
	useEffect(() => {
		if (activeMode !== mode) {
			dispatch(setCurrentMode(activeMode));
		}
	}, [activeMode, mode, dispatch]);

	return (
		<div className={styles.panel}>
			<MultimeterArrow
				ref={knobRef}
				onMouseDown={onMouseDown}
				className={styles.panel__arrow}
				angle={currentAngle}
			/>
			<ProbeWire className={styles.panel__blackWire} />
			<ProbeWire color="grey" className={styles.panel__greyWire} />
			<ProbeWire color="red" className={styles.panel__redWire} />
		</div>
	);
};
export default ControlPanel;
