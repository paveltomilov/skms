'use client';
import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';
import {
	BASE_RESISTANCE,
	CONTROL_CIRCUIT_BREAKER_ID,
	HIGH_RESISTANCE,
} from '@/shared/configs/scheme';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import SwitchHandle from '../icons/SwitchHandle';
import { useSwitchingKnob } from '@/shared/hooks/useSwitchingKnob';
import { SwitchMode } from '@/shared/hooks/useSwitchingTumbler';
import { SWITCHER_ANGLES } from '@/shared/configs/knob';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { setResistance } from '@/store/circuitSlice';

const Switcher = () => {
	const handleRef = useRef<SVGSVGElement | null>(null);

	const controlCircuitBreaker = findElementByID(
		CONTROL_CIRCUIT_BREAKER_ID,
		useAppSelector(state => state.circuit),
	);

	const mode =
		controlCircuitBreaker.resistance === HIGH_RESISTANCE ? 'off' : 'on';

	// логика вращения колеса внутри кастомного хука
	const { currentMode, onMouseDown } = useSwitchingKnob<SwitchMode>(
		handleRef,
		SWITCHER_ANGLES,
		mode,
	);

	const dispatch = useAppDispatch();

	const debouncedMode = useDebounce(currentMode, 1000);

	// Диспатчим debounced значение в store
	useEffect(() => {
		const resistance =
			debouncedMode === 'on'
				? BASE_RESISTANCE[CONTROL_CIRCUIT_BREAKER_ID]
				: HIGH_RESISTANCE;
		dispatch(
			setResistance({
				id: CONTROL_CIRCUIT_BREAKER_ID,
				value: resistance,
			}),
		);
	}, [debouncedMode, dispatch]);

	return (
		<div className={styles.switcher}>
			<SwitchHandle
				ref={handleRef}
				onMouseDown={onMouseDown}
				className={styles.switcher__handle}
				angle={SWITCHER_ANGLES[currentMode]}
			/>
		</div>
	);
};

export default Switcher;
