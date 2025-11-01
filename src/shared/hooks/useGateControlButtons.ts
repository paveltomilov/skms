import { setGatePosition, setGateState } from '@/store/gateSlice';
import {
	BASE_RESISTANCE,
	HIGH_RESISTANCE,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
} from '../configs/scheme';
import {
	CLOSE_COMMAND_FROM_PTK_INSERT_ID,
	OPEN_COMMAND_FROM_PTK_INSERT_ID,
} from '../constants';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';
import { KRUZAP_BUTTONS_CONFIG, PTK_BUTTONS_CONFIG } from '../configs/header';
import { useRef } from 'react';
import { GATE_STATE_TYPE } from '../types/gate';

export const useGateControlButtons = () => {
	const dispatch = useAppDispatch();

	// Получаем id активной задвижки из стора
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';

	const limitSwitchOpenElement = findElementByID(
		LIMIT_SWITCH_OPEN_ID,
		useAppSelector(state => state.circuit),
	);

	const limitSwitchCloseElement = findElementByID(
		LIMIT_SWITCH_CLOSE_ID,
		useAppSelector(state => state.circuit),
	);

	const openDisabled = limitSwitchOpenElement.resistance === HIGH_RESISTANCE;
	const closeDisabled =
		limitSwitchCloseElement.resistance === HIGH_RESISTANCE;

	const openOn =
		limitSwitchCloseElement.resistance ===
		BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID];
	const closeOn =
		limitSwitchOpenElement.resistance ===
		BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID];

	const openFromPtkElement = findElementByID(
		OPEN_COMMAND_FROM_PTK_INSERT_ID,
		useAppSelector(state => state.circuit),
	);

	const closeFromPtkElement = findElementByID(
		CLOSE_COMMAND_FROM_PTK_INSERT_ID,
		useAppSelector(state => state.circuit),
	);

	// Получаем текущее состояние задвижки
	const gateState = useAppSelector(state => state.gate.gates[gateId].states);

	// Кнопки "Открыть"/"Закрыть" ПТК активны (визуально нажаты) только когда задвижка реально движется
	const openPtkActive = gateState === GATE_STATE_TYPE.toOpen;
	const closePtkActive = gateState === GATE_STATE_TYPE.toClose;

	// У кнопок ПТК, когда сопротивление = 1 млрд, кнопка дизейбл
	const openPtkDisabled = openFromPtkElement.resistance === HIGH_RESISTANCE;
	const closePtkDisabled = closeFromPtkElement.resistance === HIGH_RESISTANCE;

	// Кнопка "Стоп" дизейблена, когда не нажаты кнопки "Открыть" и "Закрыть" ПТК
	const stopPtkDisabled = !openPtkActive && !closePtkActive;

	// Получаем положение задвижки из стора
	const gatePosition = useRef(
		useAppSelector(state => state.gate.gates[gateId].position),
	);

	// Создаём интервал в глобальной ОВ, чтобы к нему можно было обращаться и изменять его в функциях stopGateMovement и handleButton
	const gateInterval = useRef<NodeJS.Timeout | null>(null);

	// Функция для остановки движения задвижки
	const stopGateMovement = (type: 'ptk' | 'kruzap') => {
		const config =
			type === 'ptk' ? PTK_BUTTONS_CONFIG : KRUZAP_BUTTONS_CONFIG;

		// Обновляем сопротивления, которые меняются сразу после нажатия на кнопку "Стоп"
		config.stop.forEach(action => {
			dispatch(setResistance(action));
		});

		if (gateInterval.current) {
			clearInterval(gateInterval.current);
			gateInterval.current = null;
			dispatch(
				setGatePosition({ id: gateId, position: gatePosition.current }),
			); // Диспатчим текущее положение при остановке
			dispatch(
				setGateState({
					id: gateId,
					states: GATE_STATE_TYPE.intermediate,
				}),
			);
			console.log(
				`Задвижка остановилась в положении: ${gatePosition.current}%`,
			);
		}
	};

	const handleButton = (type: 'ptk' | 'kruzap', button: 'close' | 'open') => {
		const config =
			type === 'ptk' ? PTK_BUTTONS_CONFIG : KRUZAP_BUTTONS_CONFIG;

		// Обновляем сопротивления, которые меняются сразу после нажатия на кнопку "Открыть"/"Закрыть"
		config[button].forEach(action => {
			dispatch(setResistance(action));
		});

		// Очищаем предыдущий интервал
		if (gateInterval.current) {
			clearInterval(gateInterval.current);
			gateInterval.current = null;
		}

		// Запускаем новый интервал
		gateInterval.current = setInterval(() => {
			// Обновляем положение задвижки
			if (button === 'open') {
				gatePosition.current += 1;
				dispatch(
					setGateState({
						id: gateId,
						states: GATE_STATE_TYPE.toOpen,
					}),
				);

				if (gatePosition.current >= 100) {
					gatePosition.current = 100;
					stopGateMovement(type);
					dispatch(
						setGateState({
							id: gateId,
							states: GATE_STATE_TYPE.open,
						}),
					);

					config.opening.forEach(action => {
						dispatch(setResistance(action));
					});
				}

				// Диспатчим обновлённую позицию в Redux store
				dispatch(
					setGatePosition({
						id: gateId,
						position: gatePosition.current,
					}),
				);
			} else if (button === 'close') {
				gatePosition.current -= 1;
				dispatch(
					setGateState({
						id: gateId,
						states: GATE_STATE_TYPE.toClose,
					}),
				);

				if (gatePosition.current <= 0) {
					gatePosition.current = 0;
					stopGateMovement(type);
					dispatch(
						setGateState({
							id: gateId,
							states: GATE_STATE_TYPE.close,
						}),
					);

					config.closing.forEach(action => {
						dispatch(setResistance(action));
					});
				}

				// Диспатчим обновлённую позицию в Redux store
				dispatch(
					setGatePosition({
						id: gateId,
						position: gatePosition.current,
					}),
				);
			}

			// Логируем текущее положение задвижки для отладки
			console.log(`Положение задвижки: ${gatePosition.current}%`);
		}, 100);
	};

	return {
		handleButton,
		stopGateMovement,
		// Когда кнопки Крузап в хедере дизейблены
		openKruzapDisabled: openDisabled,
		closeKruzapDisabled: closeDisabled,
		// Когда кнопки на автомате в модалке включены
		openOn: openOn,
		closeOn: closeOn,
		// Когда кнопки ПТК в хедере дизейблены
		openPtkDisabled: openDisabled || (openPtkDisabled && closePtkActive),
		closePtkDisabled: closeDisabled || (closePtkDisabled && openPtkActive),
		stopPtkDisabled,
		// Когда кнопки ПТК в хедере нажаты
		openPtkActive,
		closePtkActive,

		currentPosition: gatePosition.current,
	};
};
