import { FC, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { MultimeterMode } from '@/shared/types/multimeter';
import { MULTIMETER_ANGLES } from '@/shared/configs/knob';
import { useSwitchingKnob } from '@/shared/hooks/useSwitchingKnob';
import MultimeterArrow from '@/shared/UI/icons/MultimeterArrow';
import Panel from '@/shared/UI/icons/Panel';
import { useAppDispatch } from '@/shared/hooks/store';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { setCurrentMode } from '@/store/multimeterSlice';
interface Props {
	mode: MultimeterMode;
}

const ControlPanel: FC<Props> = ({ mode }) => {
	const knobRef = useRef<SVGSVGElement | null>(null);

	// логика вращения колеса внутри кастомного хука
	const { currentMode, onMouseDown } = useSwitchingKnob<MultimeterMode>(
		knobRef,
		MULTIMETER_ANGLES,
		mode,
	);

	const dispatch = useAppDispatch();

	const debouncedMode = useDebounce(currentMode, 1000);

	// Диспатчим debounced значение в store
	useEffect(() => {
		dispatch(setCurrentMode(debouncedMode));
	}, [debouncedMode, dispatch]);

	return (
		<Panel className={styles.panel}>
			<MultimeterArrow
				ref={knobRef}
				onMouseDown={onMouseDown}
				className={styles.panel__arrow}
				angle={MULTIMETER_ANGLES[currentMode]}
			/>
		</Panel>
	);
};
export default ControlPanel;
