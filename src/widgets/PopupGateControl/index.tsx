import styles from './styles.module.scss';
import { FC } from 'react';
import Button from '@/shared/UI/Button';
import Gate from '@/shared/UI/Gate';
import { useAppSelector } from '@/shared/hooks/store';

export const PopupGateControl: FC = () => {
	const { state, position } = useAppSelector(state => state.gate);

	return (
		<div className={styles.popup}>
			<div className={styles.message}>3и до слива из ПВД-5 в конд-р</div>
			<div className={styles.diagnostic}>
				<div className={styles.hash}>#</div>
				<Button
					className={styles.popup__button}
					width={132}
					height={38}
					id="openDiagnostic"
					text="Откр Диагн"
					onClick={() => console.log('Нажата кнопка Откр Диагн')}
				/>
			</div>
			<div className={styles.line}></div>
			<div className={styles.gate}>
				<div className={styles.percent}>{position}</div>
				<div className={styles.percentSymbol}>%Откр.</div>
				<Gate className={styles.symbol} state={state} disable />
			</div>
			<div className={styles.buttons}>
				<Button
					className={styles.popup__button}
					width={105}
					height={38}
					id="openGate"
					text="Открыть"
					onClick={() => console.log('Нажата кнопка Открыть')}
				/>
				<Button
					className={styles.popup__button}
					width={76}
					height={38}
					id="stopGate"
					text="Стоп"
					onClick={() => console.log('Нажата кнопка Стоп')}
				/>
				<Button
					className={styles.popup__button}
					width={98}
					height={38}
					id="closeGate"
					text="Закрыть"
					onClick={() => console.log('Нажата кнопка Закрыть')}
				/>
			</div>
		</div>
	);
};
