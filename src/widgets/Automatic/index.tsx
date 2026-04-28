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
import { useAppSelector } from '@/shared/hooks/store';
// Единый API управления кнопками задвижки.
import { useGateControlButtons } from '@/shared/hooks/useGateControlButtons';
// Состояние ламп индикации ("Открыто"/"Закрыто").
import { useLampIndicators } from '@/shared/hooks/useLampIndicators';
import { selectAutomaticPanelState } from '@/features/scheme-simulation';
import type { SwitchMode } from '@/shared/types/switch';

// Виджет "Автомат" в модальном окне.
export const Automatic: FC = () => {
	// Обработчики удержания/остановки движения задвижки.
	const { handleButton, stopGateMovement } = useGateControlButtons();
	const { switcherMode, tumblerMode, hasVoltageOnControlBreakerInput } =
		useAppSelector(selectAutomaticPanelState);
	const switcherModeState = switcherMode as SwitchMode;
	const tumblerModeState = tumblerMode as SwitchMode;
	// Актуальные состояния ламп индикации.
	const lampIndicators = useLampIndicators();
	// Лампа "Закрыто".
	const closedLamp = lampIndicators.find(lamp => lamp.id === 'closed');
	// Лампа "Открыто".
	const openLamp = lampIndicators.find(lamp => lamp.id === 'open');

	// Доступность кнопок: на входе автомата управления есть питание.
	const isAssembled = Boolean(hasVoltageOnControlBreakerInput);

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
			<Switcher mode={switcherModeState} />
			{/* Тумблер автомата управления. */}
			<Tumbler mode={tumblerModeState} />
		</div>
	);
};
