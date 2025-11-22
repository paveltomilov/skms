'use client';
import styles from './styles.module.scss';
import { FC, useCallback, useRef } from 'react';
import { INPUT_CIRCUIT_BREAKER_ID } from '@/shared/configs/powerCircuit/constants';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';
import { HIGH_RESISTANCE } from '@/shared/configs/elementKind';
import { useAppDispatch } from '@/shared/hooks/store';
import SwitchHandle from '../icons/SwitchHandle';
import { SWITCHER_ANGLES } from '@/shared/configs/knob';
import { setResistance } from '@/store/circuitSlice';
import { SwitchMode } from '@/shared/types/switch';
import { useRotateKnob } from '@/shared/hooks/useRotateKnob';
//import { getResistanceByKind } from '@/shared/utils/getResistanceByKind/getResistanceByKind';
interface Props {
	mode: SwitchMode;
}

const Switcher: FC<Props> = ({ mode }) => {
	const handleRef = useRef<SVGSVGElement | null>(null);
	const dispatch = useAppDispatch();
	const { angle, onMouseDown, getSelectedMode } = useRotateKnob(
		handleRef,
		SWITCHER_ANGLES,
		mode,
	);

	const handleMouseUp = useCallback(() => {
		const selectedMode = getSelectedMode();
		if (selectedMode) {
			for (const id of INPUT_CIRCUIT_BREAKER_ID) {
				const resistance =
					selectedMode === 'on'
						? BASE_RESISTANCE[id]
						: HIGH_RESISTANCE;
				dispatch(setResistance({ id, value: resistance }));
			}
		}
	}, [getSelectedMode, dispatch]);

	return (
		<div className={styles.switcher}>
			<SwitchHandle
				ref={handleRef}
				onMouseDown={onMouseDown}
				onMouseUp={handleMouseUp}
				className={styles.switcher__handle}
				angle={angle}
			/>
		</div>
	);
};

export default Switcher;
