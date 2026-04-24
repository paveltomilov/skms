'use client';

// Тумблер автомата управления (цепь управления).
import Tumbler from '@/shared/UI/Tumbler';
// SCSS-модули для стилей виджета.
import styles from './styles.module.scss';
// Тип компонента Function Component.
import { FC } from 'react';
// Переключатель силового вводного автомата.
import Switcher from '@/shared/UI/Switcher';
// Кнопки "Открыть/Закрыть" для КРУЗАП.
import { AutomatButton } from '@/shared/UI/AutomatButton';
// Typed-хук для чтения данных из Redux store.
import { useAppSelector } from '@/shared/hooks/store';
// Поиск элемента схемы по ID в дереве circuit.
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
// ID автомата управления.
import { CONTROL_CIRCUIT_BREAKER_ID } from '@/shared/configs/controlCircuit/constants';
// Базовые электрические константы (в т.ч. highResistance).
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
// Получение текущего режима силового автомата ('on' | 'off').
import { getInputCircuitBreakerState } from '@/shared/utils/getInputCircuitBreakerState/getInputCircuitBreakerState';
// Единый API управления кнопками задвижки.
import { useGateControlButtons } from '@/shared/hooks/useGateControlButtons';
// Состояние ламп индикации ("Открыто"/"Закрыто").
import { useLampIndicators } from '@/shared/hooks/useLampIndicators';
// ID контакта фазы A вводного автомата.
import { INPUT_BREAKER_CONTACT_PHASE_A_ID } from '@/shared/configs/powerCircuit/constants';

// Виджет "Автомат" в модальном окне.
export const Automatic: FC = () => {
	// Обработчики удержания/остановки движения задвижки.
	const { handleButton, stopGateMovement } = useGateControlButtons();
	// Текущее состояние схемы (circuit) из Redux.
	const circuit = useAppSelector(store => store.circuit);
	// Актуальные состояния ламп индикации.
	const lampIndicators = useLampIndicators();
	// Лампа "Закрыто".
	const closedLamp = lampIndicators.find(lamp => lamp.id === 'closed');
	// Лампа "Открыто".
	const openLamp = lampIndicators.find(lamp => lamp.id === 'open');

	// Находим элемент автомата управления в схеме.
	const controlCircuitBreaker = findElementByID(
		CONTROL_CIRCUIT_BREAKER_ID,
		circuit,
	);
	// Берем сопротивление фазы A силового автомата.
	const resistancePhaseAInputBreaker = findElementByID(
		INPUT_BREAKER_CONTACT_PHASE_A_ID,
		circuit,
	).resistance;

	// Режим силового автомата по состоянию трех фаз.
	const switcherMode = getInputCircuitBreakerState();

	// Тумблер считается "off", если разомкнут автомат управления
	// или отсутствует питание по фазе A силового автомата.
	const tumblerMode =
		controlCircuitBreaker.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance ||
		resistancePhaseAInputBreaker === BASE_RESISTANCE_CONSTANT.highResistance
			? 'off'
			: 'on';

	// Доступность кнопок: оба автомата должны быть в состоянии "on".
	const isAssembled = switcherMode === 'on' && tumblerMode === 'on';

	return (
		// Контейнер попапа "Автомат".
		<div className={styles.automatic}>
			{/* Блок кнопок управления задвижкой. */}
			<div className={styles.automatic__buttons}>
				<AutomatButton
					// Индикация кнопки "open" берется с лампы "Открыто".
					state={openLamp?.isOn ? 'on' : 'off'}
					// Кнопка команды открытия.
					type="open"
					// Если автоматы не собраны, кнопки блокируются.
					disabled={!isAssembled}
					// Запуск движения "открыть" при зажатии.
					onMouseDown={() => handleButton('kruzap', 'open')}
					// Остановка движения при отпускании.
					onMouseUp={() => stopGateMovement('kruzap')}
				/>
				<AutomatButton
					// Индикация кнопки "close" берется с лампы "Закрыто".
					state={closedLamp?.isOn ? 'on' : 'off'}
					// Кнопка команды закрытия.
					type="close"
					// Если автоматы не собраны, кнопки блокируются.
					disabled={!isAssembled}
					// Запуск движения "закрыть" при зажатии.
					onMouseDown={() => handleButton('kruzap', 'close')}
					// Остановка движения при отпускании.
					onMouseUp={() => stopGateMovement('kruzap')}
				/>
			</div>
			{/* Переключатель силового автомата. */}
			<Switcher mode={switcherMode} />
			{/* Тумблер автомата управления. */}
			<Tumbler mode={tumblerMode} />
		</div>
	);
};
