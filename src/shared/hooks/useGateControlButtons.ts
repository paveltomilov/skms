import { setGatePosition, setGateState } from '@/store/gateSlice';
import {
	BASE_RESISTANCE,
	CLOSE_FROM_KRUZAP_ID,
	CLOSE_FROM_PTK_ID,
	HIGH_RESISTANCE,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	OPEN_FROM_KRUZAP_ID,
	OPEN_FROM_PTK_ID,
} from '../configs/scheme';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { setResistance } from '@/store/circuitSlice';
import { KRUZAP_BUTTONS_CONFIG, PTK_BUTTONS_CONFIG } from '../configs/header';
import { useRef } from 'react';
import { GATE_STATE_TYPE } from '../types/gate';

export const useGateControlButtons = () => {
	const dispatch = useAppDispatch();

	// получаем id активной задвижки из стора
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
	const circuitState = useAppSelector(state => state.circuit);

	const limitSwitchOpenElement = findElementByID(
		LIMIT_SWITCH_OPEN_ID,
		circuitState,
	);

	const limitSwitchCloseElement = findElementByID(
		LIMIT_SWITCH_CLOSE_ID,
		circuitState,
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

	const openFromPtkElement = findElementByID(OPEN_FROM_PTK_ID, circuitState);

	const closeFromPtkElement = findElementByID(
		CLOSE_FROM_PTK_ID,
		circuitState,
	);

	const openFromKruzapElement = findElementByID(
		OPEN_FROM_KRUZAP_ID,
		circuitState,
	);

	const closeFromKruzapElement = findElementByID(
		CLOSE_FROM_KRUZAP_ID,
		circuitState,
	);

	// если у этих элементов базовое сопротивление (~ 0), то кнопки открыть/закрыть ПТК активны (нажаты)
	const openPtkActive =
		openFromPtkElement.resistance === BASE_RESISTANCE[OPEN_FROM_PTK_ID];
	const closePtkActive =
		closeFromPtkElement.resistance === BASE_RESISTANCE[CLOSE_FROM_PTK_ID];

	// у кнопок ПТК когда сопротивление 1 млрд — она дизейбл
	const openPtkDisabled = openFromPtkElement.resistance === HIGH_RESISTANCE;
	const closePtkDisabled = closeFromPtkElement.resistance === HIGH_RESISTANCE;

	// кнопка Стоп дизейблена, когда не нажаты кнопки Открыть и Закрыть ПТК
	const stopPtkDisabled = !openPtkActive && !closePtkActive;

	const openKruzapMalfunctionActive = openFromKruzapElement.malfunctions.some(
		malfunction =>
			malfunction.id === 'c.3.1.3.2.1.2.1' && malfunction.active,
	);
	const closeKruzapMalfunctionActive =
		closeFromKruzapElement.malfunctions.some(
			malfunction =>
				malfunction.id === 'c.3.2.3.2.1.2.1' && malfunction.active,
		);
	const openPtkMalfunctionActive = openFromPtkElement.malfunctions.some(
		malfunction =>
			malfunction.id === 'c.3.1.3.2.1.1.1' && malfunction.active,
	);
	const closePtkMalfunctionActive = closeFromPtkElement.malfunctions.some(
		malfunction =>
			malfunction.id === 'c.3.2.3.2.1.1.1' && malfunction.active,
	);

	// получаем положение задвижки из стора
	const gatePosition = useRef(
		useAppSelector(state => state.gate.gates[gateId].position),
	);

	// создаем интервал в глобальной ОВ
	const gateInterval = useRef<NodeJS.Timeout | null>(null);

	// Функция для остановки движения задвижки
	const stopGateMovement = (type: 'ptk' | 'kruzap') => {
		const config =
			type === 'ptk' ? PTK_BUTTONS_CONFIG : KRUZAP_BUTTONS_CONFIG;

		// обновляем сопротивления, которые меняются сразу после нажатия на кнопку Стоп
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

		// проверяем на наличие неисправностей
		const malfunctionIsActive =
			(type === 'kruzap' &&
				((button === 'open' && openKruzapMalfunctionActive) ||
					(button === 'close' && closeKruzapMalfunctionActive))) ||
			(type === 'ptk' &&
				((button === 'open' && openPtkMalfunctionActive) ||
					(button === 'close' && closePtkMalfunctionActive)));

		if (malfunctionIsActive) {
			const typeLabel = type === 'ptk' ? 'ПТК' : 'КРУЗАП';
			const buttonLabel = button === 'open' ? 'Открыть' : 'Закрыть';
			console.log(
				`[управление-задвижкой] Команда заблокирована неисправностью: ${typeLabel} — ${buttonLabel}`,
			);
			return;
		}

		// обновляем сопротивления, которые меняются сразу после нажатия на кнопку Открыть/Закрыть
		config[button].forEach(action => {
			dispatch(setResistance(action));
		});

		// очищаем предыдущий интервал
		if (gateInterval.current) {
			clearInterval(gateInterval.current);
			gateInterval.current = null;
		}

		// запускаем новый интервал
		gateInterval.current = setInterval(() => {
			// обновляем положение
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
			}
			console.log(`Положение задвижки: ${gatePosition.current}%`);
		}, 100);
	};

	return {
		handleButton,
		stopGateMovement,
		// когда кнопки КРУЗАП в хедере Disabled
		openKruzapDisabled: openDisabled,
		closeKruzapDisabled: closeDisabled,
		// когда концевики «нажаты» (по базовым сопротивлениям)
		openOn,
		closeOn,
		// когда кнопки ПТК в хедере Disabled
		openPtkDisabled: openDisabled || (openPtkDisabled && closePtkActive),
		closePtkDisabled: closeDisabled || (closePtkDisabled && openPtkActive),
		stopPtkDisabled,
		// когда кнопки ПТК в хедере нажаты
		openPtkActive,
		closePtkActive,

		currentPosition: gatePosition.current,
	};
};
