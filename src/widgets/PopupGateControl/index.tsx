import styles from './styles.module.scss';
import { FC } from 'react';
import Button from '@/shared/UI/Button';
import Gate from '@/shared/UI/Gate';
import { useAppSelector } from '@/shared/hooks/store';

export const PopupGateControl: FC = () => {
	//потом передать динамически id, пока захардкодила
	const { g1 } = useAppSelector(state => state.gate);

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
					onClick={() => console.log('Нажата кнопка Откр Диагн')}
				/>
			</div>
			<div className={styles.line}></div>
			<div className={styles.gate}>
				<div className={styles.percent}>{g1.position}</div>
				<div className={styles.percentSymbol}>%Откр.</div>
				<Gate className={styles.symbol} state={g1.states} disable />
			</div>
			<div className={styles.buttons}>
				<Button
					className={styles.popup__button}
					width={105}
					height={38}
					text="Открыть"
					onClick={() => console.log('Нажата кнопка Открыть')}
				/>
				<Button
					className={styles.popup__button}
					width={76}
					height={38}
					text="Стоп"
					onClick={() => console.log('Нажата кнопка Стоп')}
				/>
				<Button
					className={styles.popup__button}
					width={98}
					height={38}
					text="Закрыть"
					onClick={() => console.log('Нажата кнопка Закрыть')}
				/>
			</div>
		</div>
	);
};
