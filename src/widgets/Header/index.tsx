'use client';
import { FC, useState } from 'react';
import style from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch } from '@/shared/hooks/store';
import GateWindow from '@/entities/GateWindow/GateWindow';
import { BLOCKS_CONFIG } from '@/shared/configs/header';
import { setResistance } from '@/store/circuitSlice';
import { BASE_RESISTANCE, HIGH_RESISTANCE } from '@/shared/configs/scheme';

const Header: FC = () => {
	const dispatch = useAppDispatch();

	// Состояние кнопок
	const [buttonsState, setButtonsState] = useState({
		ptk: {
			closeDisabled: false,
			openDisabled: true,
		},
		kruzap: {
			closeDisabled: false,
			openDisabled: true,
		},
	});

	// Обработчик для всех кнопок
	const handleButtonClick = (
		block: keyof typeof BLOCKS_CONFIG,
		action: 'close' | 'open',
	) => {
		const config = BLOCKS_CONFIG[block];
		const activeId = action === 'close' ? config.closeId : config.openId;
		const inactiveId = action === 'close' ? config.openId : config.closeId;

		// Обновляем состояние кнопок
		setButtonsState(prev => ({
			...prev,
			[block]: {
				closeDisabled: action === 'close',
				openDisabled: action === 'open',
			},
		}));

		// Диспатчим экшены
		dispatch(
			setResistance({
				id: activeId,
				value: BASE_RESISTANCE[
					activeId as keyof typeof BASE_RESISTANCE
				],
			}),
		);
		dispatch(
			setResistance({
				id: inactiveId,
				value: HIGH_RESISTANCE,
			}),
		);
	};

	return (
		<header className={style.header}>
			<div className={style.wrapper}>
				<span className={style.defense}>Работа защит</span>

				<div className={style.part}>
					<span className={style.name}>птк</span>
					<Button
						width={105}
						height={38}
						id="closeBtn"
						text="Закрыть"
						onClick={() => handleButtonClick('ptk', 'close')}
						disabled={buttonsState.ptk.closeDisabled}
					/>
					<Button
						width={70}
						height={38}
						id="stopBtn"
						disabled
						text="Стоп"
					/>
					<Button
						width={106}
						height={38}
						id="openBtn"
						text="Открыть"
						onClick={() => handleButtonClick('ptk', 'open')}
						disabled={buttonsState.ptk.openDisabled}
					/>
				</div>

				<GateWindow />

				<div className={style.part}>
					<Button
						width={105}
						height={38}
						id="closeBtn"
						text="Закрыть"
						onClick={() => handleButtonClick('kruzap', 'close')}
						disabled={buttonsState.kruzap.closeDisabled}
					/>
					<Button
						width={106}
						height={38}
						id="openBtn"
						text="Открыть"
						onClick={() => handleButtonClick('kruzap', 'open')}
						disabled={buttonsState.kruzap.openDisabled}
					/>
					<span className={style.name}>Круза-п</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
