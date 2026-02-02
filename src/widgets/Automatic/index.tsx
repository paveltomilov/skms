'use client';

import Tumbler from '@/shared/UI/Tumbler';
import styles from './styles.module.scss';
import { FC } from 'react';
import Switcher from '@/shared/UI/Switcher';
import { AutomatButton } from '@/shared/UI/AutomatButton';
import { useAppSelector } from '@/shared/hooks/store';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { CONTROL_CIRCUIT_BREAKER_ID } from '@/shared/configs/controlCircuit/constants';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import { getInputCircuitBreakerState } from '@/shared/utils/getInputCircuitBreakerState/getInputCircuitBreakerState';
import { useGateControlButtons } from '@/shared/hooks/useGateControlButtons';

export const Automatic: FC = () => {
	const { handleButton, stopGateMovement, openOn, closeOn } =
		useGateControlButtons();

	const controlCircuitBreaker = findElementByID(
		CONTROL_CIRCUIT_BREAKER_ID,
		useAppSelector(state => state.circuit),
	);

	const switcherMode = getInputCircuitBreakerState();

	const tumblerMode =
		controlCircuitBreaker.resistance ===
		BASE_RESISTANCE_CONSTANT.highResistance
			? 'off'
			: 'on';

	const isAssembled = switcherMode === 'on' && tumblerMode === 'on';

	return (
		<div className={styles.automatic}>
			<div className={styles.automatic__buttons}>
				<AutomatButton
					state={isAssembled && closeOn ? 'on' : 'off'}
					type="open"
					disabled={!isAssembled}
					onMouseDown={() => handleButton('kruzap', 'open')}
					onMouseUp={() => stopGateMovement('kruzap')}
				/>
				<AutomatButton
					state={isAssembled && openOn ? 'on' : 'off'}
					type="close"
					disabled={!isAssembled}
					onMouseDown={() => handleButton('kruzap', 'close')}
					onMouseUp={() => stopGateMovement('kruzap')}
				/>
			</div>
			<Switcher mode={switcherMode} />
			<Tumbler mode={tumblerMode} switcherValue={switcherMode}/>
		</div>
	);
};
