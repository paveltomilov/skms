import { BASE_RESISTANCE, HIGH_RESISTANCE } from '../configs/scheme';
import { findElementByID } from '../utils/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';

export const useKruzapButtons = () => {
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

	//если у этих элементов сопротивление 1 млрд, то кнопки disabled
	const closeDisabled = closeButtonElement.resistance === HIGH_RESISTANCE;
	const openDisabled = openButtonElement.resistance === HIGH_RESISTANCE;

	const handleButton = (
		button: 'close' | 'open',
		action: 'onMouseDown' | 'onMouseUp',
	) => {
		const id = button === 'close' ? 'c.3.2.3.2.1.2' : 'c.3.1.3.2.1.2';
		const value =
			action === 'onMouseDown' ? BASE_RESISTANCE[id] : HIGH_RESISTANCE;

		dispatch(
			setResistance({
				id,
				value,
			}),
		);
	};
	return { handleButton, closeDisabled, openDisabled };
};
