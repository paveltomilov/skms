'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppSelector } from '@/shared/hooks/store';
import FormMalfunction from '../FormMalfunction/FormMalfunction';
import type { GateState } from '@/store/gateSlice';

export const PopupSetSimulation: FC = () => {
	const gates = useAppSelector((state): GateState => state.gate);

	const gateName =
		gates.activeGateId && gates.gates[gates.activeGateId]
			? gates.gates[gates.activeGateId].name
			: '';

	return (
		<div className={styles.popup}>
			<Button
				width={307}
				height={38}
				disabled
				text="+ Добавить элемент"
			/>
			<div className={styles.gate}>{gateName}</div>
			<FormMalfunction />
		</div>
	);
};
