import styles from './styles.module.scss';
import { FC } from 'react';
import Button from '@/shared/UI/Button';
import Gate from '@/shared/UI/Gate';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { openModal } from '@/store/modalSlice';
import { useGateControlButtons } from '@/shared/hooks/useGateControlButtons';

export const PopupGateControl: FC = () => {
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
	const gate = useAppSelector(state => state.gate.gates[gateId]);

	const dispatch = useAppDispatch();

	const {
		handleButton,
		stopGateMovement,
		closePtkDisabled,
		openPtkDisabled,
		stopPtkDisabled,
		closePtkActive,
		openPtkActive,
	} = useGateControlButtons();

	return (
		<div className={styles.popup}>
			<div className={styles.message}>3и до слива из ПВД-5 в конд-р</div>
			<div className={styles.diagnostic}>
				<div className={styles.hash}>#</div>
				<Button
					className={styles.popup__button}
					width={132}
					height={38}
					text="Откр Диагн"
					onClick={() => dispatch(openModal('diagnostic'))}
				/>
			</div>
			<div className={styles.line}></div>
			<div className={styles.gate}>
				<div className={styles.percent}>{gate.position}</div>
				<div className={styles.percentSymbol}>%Откр.</div>
				<Gate
					className={styles.symbol}
					state={gate.states}
					malfunctions={gate.malfunctions}
				/>
			</div>
			<div className={styles.buttons}>
				<Button
					className={styles.popup__button}
					width={105}
					height={38}
					text="Открыть"
					disabled={openPtkDisabled}
					active={openPtkActive}
					onClick={() => handleButton('ptk', 'open')}
				/>
				<Button
					className={styles.popup__button}
					width={76}
					height={38}
					text="Стоп"
					disabled={stopPtkDisabled}
					onClick={() => stopGateMovement('ptk')}
				/>
				<Button
					className={styles.popup__button}
					width={98}
					height={38}
					text="Закрыть"
					disabled={closePtkDisabled}
					active={closePtkActive}
					onClick={() => handleButton('ptk', 'close')}
				/>
			</div>
		</div>
	);
};
