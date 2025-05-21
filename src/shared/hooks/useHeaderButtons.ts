import {
	BASE_RESISTANCE,
	CLOSE_FROM_KRUZAP_ID,
	OPEN_FROM_KRUZAP_ID,
	HIGH_RESISTANCE,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	OPEN_FROM_PTK_ID,
	CLOSE_FROM_PTK_ID,
} from '../configs/scheme';
import { findElementByID } from '../utils/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';

export const useHeaderButtons = () => {
	const dispatch = useAppDispatch();

	// получаем элемент схемы, от которого зависит disabled состояние кнопки открыть крузап и птк
	const openButtonElement = findElementByID(
		LIMIT_SWITCH_OPEN_ID,
		useAppSelector(state => state.circuit),
	);

	// получаем элемент схемы, от которого зависит disabled состояние кнопки закрыть крузап и птк
	const closeButtonElement = findElementByID(
		LIMIT_SWITCH_CLOSE_ID,
		useAppSelector(state => state.circuit),
	);

	//если у этих элементов сопротивление 1 млрд, то кнопки открыть/закрыть крузап и птк disabled
	const closeDisabled = closeButtonElement.resistance === HIGH_RESISTANCE;
	const openDisabled = openButtonElement.resistance === HIGH_RESISTANCE;

	// получаем элемент схемы, от которого зависит active (нажатое) состояние кнопки открыть птк
	const openFromPtkElement = findElementByID(
		OPEN_FROM_PTK_ID,
		useAppSelector(state => state.circuit),
	);

	// получаем элемент схемы, от которого зависит active (нажатое) состояние кнопки закрыть птк
	const closeFromPtkElement = findElementByID(
		CLOSE_FROM_PTK_ID,
		useAppSelector(state => state.circuit),
	);

	//если у этих элементов базовое сопротивление (~ 0), то кнопки открыть/закрыть птк active (нажата)
	const openActive =
		openFromPtkElement.resistance === BASE_RESISTANCE[OPEN_FROM_PTK_ID];
	const closeActive =
		closeFromPtkElement.resistance === BASE_RESISTANCE[CLOSE_FROM_PTK_ID];

	//кнопка стоп дизэйблена когда не нажаты кнопки открыть и закрыть птк
	const stopDisabled = !openActive && !closeActive;

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

	const handlePtkButton = (button: 'close' | 'open' | 'stop') => {
		const config = {
			open: [
				{
					id: OPEN_FROM_PTK_ID,
					value: BASE_RESISTANCE[OPEN_FROM_PTK_ID],
				},
				{ id: CLOSE_FROM_PTK_ID, value: HIGH_RESISTANCE },
			],
			close: [
				{
					id: CLOSE_FROM_PTK_ID,
					value: BASE_RESISTANCE[CLOSE_FROM_PTK_ID],
				},
				{ id: OPEN_FROM_PTK_ID, value: HIGH_RESISTANCE },
			],
			stop: [
				{ id: OPEN_FROM_PTK_ID, value: HIGH_RESISTANCE },
				{ id: CLOSE_FROM_PTK_ID, value: HIGH_RESISTANCE },
			],
		};

		config[button].forEach(action => dispatch(setResistance(action)));
	};

	return {
		handleKruzapButton,
		handlePtkButton,
		closeDisabled,
		openDisabled,
		stopDisabled,
		closeActive,
		openActive,
	};
};
