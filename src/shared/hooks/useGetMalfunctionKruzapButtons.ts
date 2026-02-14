import {
	BUTTON_KRUZA_P_CLOSE_ID,
	BUTTON_KRUZA_P_OPEN_ID,
} from '../configs/controlCircuit/constants';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppSelector } from './store';

export const useGetMalfunctionKruzapButtons = () => {
	// Получаем элементы кнопки КРУЗА-П
	const buttonKruzapOpen = findElementByID(
		BUTTON_KRUZA_P_OPEN_ID,
		useAppSelector(state => state.circuit),
	);

	const buttonKruzapСlose = findElementByID(
		BUTTON_KRUZA_P_CLOSE_ID,
		useAppSelector(state => state.circuit),
	);

	// Получаем массив с неисправностями
	const listActiveMalfunctionKruzapButtonOpen =
		buttonKruzapOpen.malfunctions.filter(m => {
			return m.active;
		});

	const listActiveMalfunctionKruzapButtonClose =
		buttonKruzapСlose.malfunctions.filter(m => {
			return m.active;
		});

	// Проверяем на наличие неисправности 'Нет контакта, цепь не замыкается'

	const hasMalfunctionNoContactKruzapOpenButton =
		listActiveMalfunctionKruzapButtonOpen.some(
			m => m.name === 'Нет контакта, цепь не замыкается',
		);

	const hasMalfunctionNoContactKruzapCloseButton =
		listActiveMalfunctionKruzapButtonClose.some(
			m => m.name === 'Нет контакта, цепь не замыкается',
		);

	// Проверяем на наличие неисправности 'Ложно сработала, цепь не размыкается'

	const hasMalfunctionFalseTriggerKruzapOpenButton =
		listActiveMalfunctionKruzapButtonOpen.some(
			m => m.name === 'Ложно сработала, цепь не размыкается',
		);

	const hasMalfunctionFalseTriggerKruzapCloseButton =
		listActiveMalfunctionKruzapButtonClose.some(
			m => m.name === 'Ложно сработала, цепь не размыкается',
		);

	return {
		hasMalfunctionNoContactKruzapOpenButton,
		hasMalfunctionNoContactKruzapCloseButton,
		hasMalfunctionFalseTriggerKruzapOpenButton,
		hasMalfunctionFalseTriggerKruzapCloseButton,
	};
};
