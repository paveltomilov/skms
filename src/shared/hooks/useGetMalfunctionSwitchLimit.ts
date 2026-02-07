import { useMemo } from 'react';
import {
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
} from '../configs/controlCircuit/constants';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppSelector } from './store';

export const useGetMalfunctionSwitchLimit = () => {
	const circuit = useAppSelector(state => state.circuit);
	// Получаем концевые выключатели для проверки состояния
	/** Концевой выключатель цепи ОТКРЫТЬ */
	const limitSwitchOpenElement = useMemo(
		() => findElementByID(LIMIT_SWITCH_OPEN_ID, circuit),
		[circuit],
	);

	/** Концевой выключатель цепи ЗАКРЫТЬ */
	const limitSwitchCloseElement = useMemo(
		() => findElementByID(LIMIT_SWITCH_CLOSE_ID, circuit),
		[circuit],
	);

	// Получаем активные несиспрановности концевых выключателей
	const listActiveMalfunctionsLimitSwitchOpenElement =
		limitSwitchOpenElement.malfunctions.filter(m => m.active);

	const listActiveMalfunctionsLimitSwitchCloseElement =
		limitSwitchCloseElement.malfunctions.filter(m => m.active);
	// Проверяем наличие неисправности 'Нет контакта' концевых выключателей
	const hasMalfunctionNoContactSwitchOpenElement =
		listActiveMalfunctionsLimitSwitchOpenElement.some(
			m => m.name === 'Нет контакта',
		);

	const hasMalfunctionNoContactSwitchCloseElement =
		listActiveMalfunctionsLimitSwitchCloseElement.some(
			m => m.name === 'Нет контакта',
		);

	// Проверяем наличие неисправности 'Залипший контакт' концевых выключателей
	const hasMalfunctionStuckContactSwitchOpenElement =
		listActiveMalfunctionsLimitSwitchOpenElement.some(
			m => m.name === 'Залипший контакт',
		);
	const hasMalfunctionStuckContactSwitchCloseElement =
		listActiveMalfunctionsLimitSwitchCloseElement.some(
			m => m.name === 'Залипший контакт',
		);

	// Проверяем наличие неисправности 'Не настроен' концевых выключателей
	const hasMalfunctionNoSettingConfiguredSwitchOpenElement =
		listActiveMalfunctionsLimitSwitchOpenElement.some(
			m => m.name === 'Не настроен',
		);

	const hasMalfunctionNoSettingConfiguredSwitchCloseElement =
		listActiveMalfunctionsLimitSwitchCloseElement.some(
			m => m.name === 'Не настроен',
		);

	return {
		limitSwitchOpenElement,
		limitSwitchCloseElement,
		hasMalfunctionNoContactSwitchOpenElement,
		hasMalfunctionNoContactSwitchCloseElement,
		hasMalfunctionStuckContactSwitchOpenElement,
		hasMalfunctionStuckContactSwitchCloseElement,
		hasMalfunctionNoSettingConfiguredSwitchOpenElement,
		hasMalfunctionNoSettingConfiguredSwitchCloseElement,
	};
};
