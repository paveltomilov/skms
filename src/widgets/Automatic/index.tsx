'use client';

import Tumbler from '@/shared/UI/Tumbler';
import styles from './styles.module.scss';
import { FC } from 'react';
import Switcher from '@/shared/UI/Switcher';
import { AutomatButton } from '@/shared/UI/AutomatButton';
import { useAppSelector } from '@/shared/hooks/store';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import {
	CONTROL_CIRCUIT_BREAKER_ID,
	HIGH_RESISTANCE,
} from '@/shared/configs/scheme';
import { getInputCircuitBreakerState } from '@/shared/utils/getInputCircuitBreakerState/getInputCircuitBreakerState';

export const Automatic: FC = () => {
	const gatePosition = useAppSelector(store => store.gate.position);

	const controlCircuitBreaker = findElementByID(
		CONTROL_CIRCUIT_BREAKER_ID,
		useAppSelector(state => state.circuit),
	);

	const switcherMode =
		controlCircuitBreaker.resistance === HIGH_RESISTANCE ? 'off' : 'on';

	const tumblerMode = getInputCircuitBreakerState();

	const isAssembled = switcherMode === 'on' && tumblerMode === 'on';
	return (
		<div className={styles.automatic}>
			<div className={styles.automatic__buttons}>
				<AutomatButton
					state={!isAssembled || gatePosition === 0 ? 'off' : 'on'}
					type="open"
				/>
				<AutomatButton
					state={!isAssembled || gatePosition === 100 ? 'off' : 'on'}
					type="close"
				/>
			</div>
			<Switcher />
			<Tumbler />
		</div>
	);
};
