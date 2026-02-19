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
import { useLampIndicators } from '@/shared/hooks/useLampIndicators';
import { INPUT_BREAKER_CONTACT_PHASE_A_ID } from '@/shared/configs/powerCircuit/constants';

export const Automatic: FC = () => {
	const { handleButton, stopGateMovement } = useGateControlButtons();
	const circuit = useAppSelector(store => store.circuit);
	const lampIndicators = useLampIndicators();
	const closedLamp = lampIndicators.find(lamp => lamp.id === 'closed');
	const openLamp = lampIndicators.find(lamp => lamp.id === 'open');

	const controlCircuitBreaker = findElementByID(
		CONTROL_CIRCUIT_BREAKER_ID,
		circuit,
	);
	const resistancePhaseAInputBreaker = findElementByID(
		INPUT_BREAKER_CONTACT_PHASE_A_ID,
		circuit,
	).resistance;

	const switcherMode = getInputCircuitBreakerState();

	const tumblerMode =
		controlCircuitBreaker.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance ||
		resistancePhaseAInputBreaker === BASE_RESISTANCE_CONSTANT.highResistance
			? 'off'
			: 'on';

	const isAssembled = switcherMode === 'on' && tumblerMode === 'on';

	return (
		<div className={styles.automatic}>
			<div className={styles.automatic__buttons}>
				<AutomatButton
					state={closedLamp?.isOn ? 'on' : 'off'}
					type="open"
					disabled={!isAssembled}
					onMouseDown={() => handleButton('kruzap', 'open')}
					onMouseUp={() => stopGateMovement('kruzap')}
				/>
				<AutomatButton
					state={openLamp?.isOn ? 'on' : 'off'}
					type="close"
					disabled={!isAssembled}
					onMouseDown={() => handleButton('kruzap', 'close')}
					onMouseUp={() => stopGateMovement('kruzap')}
				/>
			</div>
			<Switcher mode={switcherMode} />
			<Tumbler mode={tumblerMode} />
		</div>
	);
};
