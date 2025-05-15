import { useState } from 'react';
import { findElementByID } from '../utils/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { BASE_RESISTANCE, HIGH_RESISTANCE } from '../configs/scheme';
import { setResistance } from '@/store/circuitSlice';
import { BLOCKS_CONFIG } from '../configs/header';

export const useHeaderButtons = () => {
	const dispatch = useAppDispatch();

	// получаем элемент схемы, от которого зависит состояние кнопки закрыть крузап
	const closeButtonElement = findElementByID(
		'c.3.2.1',
		useAppSelector(state => state.circuit),
	);

	// получаем элемент схемы, от которого зависит состояние кнопки открыть крузап
	const openButtonElement = findElementByID(
		'c.3.1.1',
		useAppSelector(state => state.circuit),
	);

	// Состояние кнопок
	const [buttonsState, setButtonsState] = useState({
		/* ptk: { состояние кнопок птк }, */
		kruzap: {
			// если сопротивление closeButtonElement млрд, то кнопка closeKruzapBtn не активна
			closeDisabled: closeButtonElement.resistance === HIGH_RESISTANCE,
			// если сопротивление openButtonElement млрд, то кнопка openKruzapBtn не активна
			openDisabled: openButtonElement.resistance === HIGH_RESISTANCE,
		},
	});

	// Обработчик для всех кнопок
	const handleButtonClick = (
		block: keyof typeof BLOCKS_CONFIG,
		action: 'close' | 'open',
	) => {
		const config = BLOCKS_CONFIG[block];
		const activeId = action === 'close' ? config.closeId : config.openId;
		const inactiveId = action === 'close' ? config.openId : config.closeId;

		// Диспатчим экшены
		dispatch(
			setResistance({
				id: activeId,
				value: BASE_RESISTANCE[
					activeId as keyof typeof BASE_RESISTANCE
				],
			}),
		);
		dispatch(
			setResistance({
				id: inactiveId,
				value: HIGH_RESISTANCE,
			}),
		);

		// Обновляем состояние кнопок
		setButtonsState(prev => ({
			...prev,
			[block]: {
				closeDisabled: action === 'close',
				openDisabled: action === 'open',
			},
		}));
	};
	return { handleButtonClick, buttonsState };
};
