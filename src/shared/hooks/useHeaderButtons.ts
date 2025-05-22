import { setGatePosition } from '@/store/gateSlice';
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
import { PTK_BUTTONS_CONFIG } from '../configs/header';
import { useRef } from 'react';

export const useHeaderButtons = () => {
	const dispatch = useAppDispatch();

	// получаем элемент схемы, от которого зависит disabled состояние кнопки открыть крузап и птк
	const limitSwitchOpenElement = findElementByID(
		LIMIT_SWITCH_OPEN_ID,
		useAppSelector(state => state.circuit),
	);

	// получаем элемент схемы, от которого зависит disabled состояние кнопки закрыть крузап и птк
	const limitSwitchCloseElement = findElementByID(
		LIMIT_SWITCH_CLOSE_ID,
		useAppSelector(state => state.circuit),
	);

	//если у этих элементов сопротивление 1 млрд, то кнопки открыть/закрыть крузап и птк disabled
	const openDisabled = limitSwitchOpenElement.resistance === HIGH_RESISTANCE;
	const closeDisabled =
		limitSwitchCloseElement.resistance === HIGH_RESISTANCE;

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
	const openPtkActive =
		openFromPtkElement.resistance === BASE_RESISTANCE[OPEN_FROM_PTK_ID];
	const closePtkActive =
		closeFromPtkElement.resistance === BASE_RESISTANCE[CLOSE_FROM_PTK_ID];

	// у кнопок птк когда сопротивление 1млрд то она дизейбл
	const openPtkDisabled = openFromPtkElement.resistance === HIGH_RESISTANCE;
	const closePtkDisabled = closeFromPtkElement.resistance === HIGH_RESISTANCE;

	//кнопка стоп дизэйблена когда не нажаты кнопки открыть и закрыть птк
	const stopPtkDisabled = !openPtkActive && !closePtkActive;

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

	// получаем положение задвижки из стора
	const gatePosition = useRef(useAppSelector(state => state.gate.position));
	const gateIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Функция для остановки движения ворот
	const stopGateMovement = () => {
		// обновляем сопротивления, которые меняются сразу после нажатия на кнопку стоп
		PTK_BUTTONS_CONFIG.stop.forEach(action => {
			dispatch(setResistance(action));
		});

		if (gateIntervalRef.current) {
			clearInterval(gateIntervalRef.current);
			gateIntervalRef.current = null;
			dispatch(setGatePosition(gatePosition.current)); // Диспатчим текущее положение при остановке

			// удалить после аппрува
			console.log(`Gate stopped at position: ${gatePosition.current}%`);
		}
	};

	const handlePtkButton = (button: 'close' | 'open') => {
		// обновляем сопротивления, которые меняются сразу после нажатия на кнопку открыть/закрыть
		PTK_BUTTONS_CONFIG[button].forEach(action => {
			dispatch(setResistance(action));
		});

		// Очищаем предыдущий интервал
		if (gateIntervalRef.current) {
			clearInterval(gateIntervalRef.current);
			gateIntervalRef.current = null;
		}

		// Запускаем новый интервал
		gateIntervalRef.current = setInterval(() => {
			// Обновляем положение
			if (button === 'open') {
				gatePosition.current += 1;

				if (gatePosition.current >= 100) {
					gatePosition.current = 100;
					stopGateMovement();

					PTK_BUTTONS_CONFIG.opening.forEach(action => {
						dispatch(setResistance(action));
					});
				}
			} else if (button === 'close') {
				gatePosition.current -= 1;
				if (gatePosition.current <= 0) {
					gatePosition.current = 0;
					stopGateMovement();

					PTK_BUTTONS_CONFIG.closing.forEach(action => {
						dispatch(setResistance(action));
					});
				}
			}
			// удалить после аппрува
			console.log(`Gate position: ${gatePosition.current}%`);
		}, 100);
	};

	return {
		handleKruzapButton,
		handlePtkButton,
		stopGateMovement,
		openKruzapDisabled: openDisabled,
		closeKruzapDisabled: closeDisabled,
		openPtkDisabled: openDisabled || (openPtkDisabled && closePtkActive),
		closePtkDisabled: closeDisabled || (closePtkDisabled && openPtkActive),
		stopPtkDisabled,
		openPtkActive,
		closePtkActive,
	};
};
