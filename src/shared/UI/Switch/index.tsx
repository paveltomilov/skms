'use client';
import { useSwitchingSwitch } from '@/shared/hooks/useSwitchingSwitch';
import styles from './styles.module.scss';
import { useRef } from 'react';
import { getInputCircuitBreakerState } from '@/shared/utils/getInputCircuitBreakerState/getInputCircuitBreakerState';

const Switch = () => {
	const handleRef = useRef<HTMLDivElement | null>(null);

	const mode = getInputCircuitBreakerState();

	// логика перемещения свича внутри кастомного хука
	const { currentMode, onMouseDown } = useSwitchingSwitch(handleRef, mode);

	return (
		<div className={styles.switch}>
			<div
				ref={handleRef}
				className={`${styles.switch__handle} ${
					currentMode === 'off' && styles.switch__handle_off
				} `}
				onMouseDown={onMouseDown}
			/>
		</div>
	);
};

export default Switch;
