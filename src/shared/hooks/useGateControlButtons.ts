import { usePtkButtons } from './usePtkButtons';
import { useKruzapButtons } from './useKruzapButtons';
import { useAppSelector } from './store';

/**
 * Объединяющий хук для управления кнопками задвижки.
 * Использует отдельные хуки для ПТК и КРУЗАП, обеспечивая обратную совместимость.
 */
export const useGateControlButtons = () => {
	const ptkButtons = usePtkButtons();
	const kruzapButtons = useKruzapButtons();

	// Получаем id активной задвижки из стора
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';

	// Объединяющая функция для обратной совместимости
	// При нажатии на один тип кнопок, останавливаем движение другого типа
	const handleButton = (type: 'ptk' | 'kruzap', button: 'close' | 'open') => {
		if (type === 'ptk') {
			// Останавливаем движение КРУЗАП, если оно активно
			kruzapButtons.stopKruzapMovement();
			ptkButtons.handlePtkButton(button);
		} else {
			// Останавливаем движение ПТК, если оно активно
			ptkButtons.stopPtkMovement();
			kruzapButtons.handleKruzapButton(button);
		}
	};

	// Объединяющая функция для остановки движения
	const stopGateMovement = (type: 'ptk' | 'kruzap') => {
		if (type === 'ptk') {
			ptkButtons.stopPtkMovement();
		} else {
			kruzapButtons.stopKruzapMovement();
		}
	};

	return {
		handleButton,
		stopGateMovement,
		// Состояния кнопок КРУЗАП
		openKruzapDisabled: kruzapButtons.openKruzapDisabled,
		closeKruzapDisabled: kruzapButtons.closeKruzapDisabled,
		// Состояния кнопок на автомате в модалке
		openOn: kruzapButtons.openOn,
		closeOn: kruzapButtons.closeOn,
		// Состояния кнопок ПТК (используем значения напрямую из хука)
		openPtkDisabled: ptkButtons.openPtkDisabled,
		closePtkDisabled: ptkButtons.closePtkDisabled,
		stopPtkDisabled: ptkButtons.stopPtkDisabled,
		openPtkActive: ptkButtons.openPtkActive,
		closePtkActive: ptkButtons.closePtkActive,
		currentPosition: useAppSelector(
			state => state.gate.gates[gateId].position,
		),
	};
};
