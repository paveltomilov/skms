import {
	BASE_RESISTANCE,
	CLOSE_FROM_PTK_ID,
	OPEN_FROM_PTK_ID,
	HIGH_RESISTANCE,
} from '../configs/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';
import { findElementByID } from '../utils/scheme';

export const usePtkButtons = () => {
	const dispatch = useAppDispatch();

	// получаем элемент схемы, от которого зависит активное (нажатое) состояние кнопки открыть птк
	const openFromPtkElement = findElementByID(
		OPEN_FROM_PTK_ID,
		useAppSelector(state => state.circuit),
	);

	// получаем элемент схемы, от которого зависит активное (нажатое) состояние кнопки закрыть птк
	const closeFromPtkElement = findElementByID(
		CLOSE_FROM_PTK_ID,
		useAppSelector(state => state.circuit),
	);

	//если у этих элементов базовое сопротивление (~ 0), то кнопка активна (нажата)
	const openActive =
		openFromPtkElement.resistance === BASE_RESISTANCE[OPEN_FROM_PTK_ID];
	const closeActive =
		closeFromPtkElement.resistance === BASE_RESISTANCE[CLOSE_FROM_PTK_ID];

	//кнопка стоп дизэйблена когда не нажаты кнопки открыть и закрыть птк
	const stopPtkDisabled = !openActive && !closeActive;

	const handlePtkButton = (button: 'close' | 'open' | 'stop') => {
		switch (button) {
			case 'open':
				dispatch(
					setResistance({
						id: OPEN_FROM_PTK_ID,
						value: BASE_RESISTANCE[OPEN_FROM_PTK_ID],
					}),
				);
				dispatch(
					setResistance({
						id: CLOSE_FROM_PTK_ID,
						value: HIGH_RESISTANCE,
					}),
				);
				break;

			case 'close':
				dispatch(
					setResistance({
						id: CLOSE_FROM_PTK_ID,
						value: BASE_RESISTANCE[CLOSE_FROM_PTK_ID],
					}),
				);
				dispatch(
					setResistance({
						id: OPEN_FROM_PTK_ID,
						value: HIGH_RESISTANCE,
					}),
				);
				break;

			case 'stop':
				dispatch(
					setResistance({
						id: OPEN_FROM_PTK_ID,
						value: HIGH_RESISTANCE,
					}),
				);
				dispatch(
					setResistance({
						id: CLOSE_FROM_PTK_ID,
						value: HIGH_RESISTANCE,
					}),
				);
				break;
		}
	};

	return {
		handlePtkButton,
		stopPtkDisabled,
		openActive,
		closeActive,
	};
};
