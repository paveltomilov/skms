import {
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	INSERT_NDO_CMD_OPEN_PTK_ID,
	INSERT_NDO_CMD_CLOSE_PTK_ID,
} from '../configs/controlCircuit/constants';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';
import { useEffect, useMemo } from 'react';
import { BASE_RESISTANCE } from '../configs/schemeElements';
import { BASE_RESISTANCE_CONSTANT } from '../configs/elementKind';
import {
	INPUT_CIRCUIT_BREAKER_ID,
} from '../configs/powerCircuit/constants';
import { useGetMalfunctionSwitchLimit } from './useGetMalfunctionSwitchLimit';
import { useGetMalfunctionKruzapButtons } from './useGetMalfunctionKruzapButtons';
import { TypeButtons } from './useGateControlButtons';
import {
	startKruzapMovementThunk,
	stopKruzapMovementThunk,
} from '@/store/kruzapMovementThunks';

/**
 * Хук для управления кнопками КРУЗАП.
 * Обрабатывает нажатия кнопок "Открыть" и "Закрыть" для управления задвижкой через КРУЗАП.
 * Кнопки работают по принципу удержания (onMouseDown/onMouseUp).
 */

export const useKruzapButtons = () => {
	const dispatch = useAppDispatch();
	const circuit = useAppSelector(state => state.circuit);
	// Получаем возможные неисправсноии кнопок КРУЗА-П

	const {
		hasMalfunctionNoContactKruzapOpenButton,
		hasMalfunctionNoContactKruzapCloseButton,
	} = useGetMalfunctionKruzapButtons();

	// Получаем id активной задвижки из стора
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';

	// Получаем концевые выключатели для проверки состояния и получения возможных неисправностей
	const {
		limitSwitchCloseElement,
		limitSwitchOpenElement,
		hasMalfunctionNoContactSwitchOpenElement,
		hasMalfunctionNoContactSwitchCloseElement,
		hasMalfunctionStuckContactSwitchOpenElement,
		hasMalfunctionStuckContactSwitchCloseElement,
	} = useGetMalfunctionSwitchLimit();

	// Получаем фазу А вводного автомата от которой запитывается схемы управления
	/** Фаза вводного автомата питающая сеть управления */
	const inputCircuitBreakerPhaseAElement = findElementByID(
		INPUT_CIRCUIT_BREAKER_ID[0],
		useAppSelector(state => state.circuit),
	);
	// Проверяем состояние контактов вводного автомата фазы А
	const isOpenInputBreakerPhaseA =
		inputCircuitBreakerPhaseAElement.resistance >=
		BASE_RESISTANCE_CONSTANT.highResistance;

	useEffect(() => {
		if (hasMalfunctionNoContactSwitchCloseElement) {
			dispatch(
				setResistance({
					id: LIMIT_SWITCH_CLOSE_ID,
					value: BASE_RESISTANCE_CONSTANT.highResistance,
				}),
			);
		}

		if (hasMalfunctionNoContactSwitchOpenElement) {
			dispatch(
				setResistance({
					id: LIMIT_SWITCH_OPEN_ID,
					value: BASE_RESISTANCE_CONSTANT.highResistance,
				}),
			);
		}
	}, [
		hasMalfunctionNoContactSwitchCloseElement,
		hasMalfunctionNoContactSwitchOpenElement,
		dispatch,
	]);

	// Получаем элементы кнопок ПТК из схемы для проверки их состояния
	const openPtkElement = useMemo(
		() => findElementByID(INSERT_NDO_CMD_OPEN_PTK_ID, circuit),
		[circuit],
	);

	const closePtkElement = useMemo(
		() => findElementByID(INSERT_NDO_CMD_CLOSE_PTK_ID, circuit),
		[circuit],
	);

	// Проверяем, активна ли какая-либо кнопка ПТК (сопротивление = 0)
	const isAnyPtkButtonActive =
		openPtkElement.resistance === 0 || closePtkElement.resistance === 0;

	// Кнопки КРУЗАП дизейблены, если:
	// - соответствующий концевой выключатель разомкнут ИЛИ
	// - какая-либо кнопка ПТК активна (сопротивление = 0)
	const openKruzapDisabled =
		hasMalfunctionNoContactSwitchOpenElement ||
		hasMalfunctionStuckContactSwitchOpenElement
			? false
			: limitSwitchOpenElement.resistance ===
					BASE_RESISTANCE_CONSTANT.highResistance ||
				isAnyPtkButtonActive;
	const closeKruzapDisabled =
		hasMalfunctionNoContactSwitchCloseElement ||
		hasMalfunctionStuckContactSwitchCloseElement
			? false
			: limitSwitchCloseElement.resistance ===
					BASE_RESISTANCE_CONSTANT.highResistance ||
				isAnyPtkButtonActive;

	// Определяем состояние задвижки (закрыта/открыта) на основе концевых выключателей
	const openOn =
		limitSwitchCloseElement.resistance ===
		BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID];
	const closeOn =
		limitSwitchOpenElement.resistance ===
		BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID];

	// Получаем текущее положение задвижки из стора
	const currentGatePosition = useAppSelector(
		state => state.gate.gates[gateId].position,
	);

	// Функция для остановки движения задвижки через КРУЗАП
	const stopKruzapMovement = () => {
		dispatch(
			stopKruzapMovementThunk({
				gateId,
				hasMalfunctionStuckContactSwitchOpenElement,
				hasMalfunctionStuckContactSwitchCloseElement,
			}),
		);
	};

	const handleKruzapButton = (button: TypeButtons) => {
		// При наличии неисправности останавливаем обработчик событий
		if (hasMalfunctionNoContactSwitchCloseElement && button === 'close') {
			console.info(
				'Активна неиспраность <Нет контакта> концевого выключателя цепи ЗАКРЫТЬ ',
			);
			return;
		}
		if (hasMalfunctionNoContactSwitchOpenElement && button === 'open') {
			console.info(
				'Активна неиспраность <Нет контакта> концевого выключателя цепи ОТКРЫТЬ ',
			);
			return;
		}
		// Проверяем кнопки на наличие неисправности 'Нет контакта, цепь не замыкается'
		if (button === 'open' && hasMalfunctionNoContactKruzapOpenButton) {
			console.info(
				'Кнопка ОТКРЫТЬ КРУЗА-П имеет активную неисправность "Нет контакта, цепь не замыкается"',
			);
			return;
		}
		if (button === 'close' && hasMalfunctionNoContactKruzapCloseButton) {
			console.info(
				'Кнопка ЗАКРЫТЬ КРУЗА-П имеет активную неисправность "Нет контакта, цепь не замыкается"',
			);
			return;
		}
		// Проверяем наличие питания в цепи управления
		if (isOpenInputBreakerPhaseA) {
			console.info(
				'Нет питания сети управления ВВОДНОЙ АВТОМАТ РАЗОБРАН',
			);
			return;
		}

		dispatch(
			startKruzapMovementThunk({
				button,
				gateId,
				hasMalfunctionStuckContactSwitchOpenElement,
				hasMalfunctionStuckContactSwitchCloseElement,
			}),
		);
	};

	return {
		handleKruzapButton,
		stopKruzapMovement,
		openKruzapDisabled,
		closeKruzapDisabled,
		openOn,
		closeOn,
		currentPosition: currentGatePosition,
	};
};
