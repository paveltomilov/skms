'use client';
import styles from './styles.module.scss';
import { FC, useEffect, useRef } from 'react';
import { useSwitchingTumbler } from '@/shared/hooks/useSwitchingTumbler';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';
import { CONTROL_CIRCUIT_BREAKER_ID } from '@/shared/configs/controlCircuit/constants';
import { HIGH_RESISTANCE } from '@/shared/configs/elementKind';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useAppDispatch } from '@/shared/hooks/store';
import { setResistance } from '@/store/circuitSlice';
import { SwitchMode } from '@/shared/types/switch';

interface Props {
	mode: SwitchMode;
}

const Tumbler: FC<Props> = ({ mode }) => {
	const handleRef = useRef<HTMLDivElement | null>(null);

	// логика перемещения тумблера внутри кастомного хука
	const { currentMode, onMouseDown } = useSwitchingTumbler(handleRef, mode);

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
