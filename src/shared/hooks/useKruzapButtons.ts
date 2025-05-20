import {
	BASE_RESISTANCE,
	CLOSE_FROM_KRUZAP_ID,
	OPEN_FROM_KRUZAP_ID,
	HIGH_RESISTANCE,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
} from '../configs/scheme';
import { findElementByID } from '../utils/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';

export const useKruzapButtons = () => {
	const dispatch = useAppDispatch();

	// получаем элемент схемы, от которого зависит состояние кнопки закрыть крузап
	const closeButtonElement = findElementByID(
		LIMIT_SWITCH_CLOSE_ID,
		useAppSelector(state => state.circuit),
	);

	// получаем элемент схемы, от которого зависит состояние кнопки открыть крузап
	const openButtonElement = findElementByID(
		LIMIT_SWITCH_OPEN_ID,
		useAppSelector(state => state.circuit),
	);

	//если у этих элементов сопротивление 1 млрд, то кнопки disabled
	const closeDisabled = closeButtonElement.resistance === HIGH_RESISTANCE;
	const openDisabled = openButtonElement.resistance === HIGH_RESISTANCE;

	const handleKruzapButton = (
		button: 'close' | 'open',
		action: 'onMouseDown' | 'onMouseUp',
	) => {
		const id =
			button === 'close' ? CLOSE_FROM_KRUZAP_ID : OPEN_FROM_KRUZAP_ID;
		const value =
			action === 'onMouseDown' ? BASE_RESISTANCE[id] : HIGH_RESISTANCE;

		dispatch(
			setResistance({
				id,
				value,
			}),
		);
	};
	return { handleKruzapButton, closeDisabled, openDisabled };
};
