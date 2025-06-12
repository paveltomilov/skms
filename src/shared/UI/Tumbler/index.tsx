'use client';
import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';
import { getInputCircuitBreakerState } from '@/shared/utils/getInputCircuitBreakerState/getInputCircuitBreakerState';
import { useSwitchingTumbler } from '@/shared/hooks/useSwitchingTumbler';
import {
	BASE_RESISTANCE,
	HIGH_RESISTANCE,
	INPUT_CIRCUIT_BREAKER_ID,
} from '@/shared/configs/scheme';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useAppDispatch } from '@/shared/hooks/store';
import { setResistance } from '@/store/circuitSlice';

const Tumbler = () => {
	const handleRef = useRef<HTMLDivElement | null>(null);

	const mode = getInputCircuitBreakerState();

	// логика перемещения тумблера внутри кастомного хука
	const { currentMode, onMouseDown } = useSwitchingTumbler(handleRef, mode);

	const dispatch = useAppDispatch();

	const debouncedMode = useDebounce(currentMode, 1000);

	// Диспатчим debounced значение в store
	useEffect(() => {
		for (const id of INPUT_CIRCUIT_BREAKER_ID) {
			const resistance =
				debouncedMode === 'on' ? BASE_RESISTANCE[id] : HIGH_RESISTANCE;
			dispatch(setResistance({ id, value: resistance }));
		}
	}, [debouncedMode, dispatch]);

	return (
		<div className={styles.box}>
			<div className={styles.box__title}>
				<p
					className={`${styles.box__title_text} ${
						mode === 'off' && styles.box__title_text_off
					}`}
				>
					Собран
				</p>
			</div>
			<div className={styles.tumbler}>
				<div
					ref={handleRef}
					className={`${styles.tumbler__handle} ${
						currentMode === 'off' && styles.tumbler__handle_off
					} `}
					onMouseDown={onMouseDown}
				/>
			</div>
			<div className={styles.box__title}>
				<p
					className={`${styles.box__title_text} ${
						mode === 'on' && styles.box__title_text_off
					}`}
				>
					Разобран
				</p>
			</div>
		</div>
	);
};

export default Tumbler;
