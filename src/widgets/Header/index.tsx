'use client';
import { FC } from 'react';
import style from './styles.module.scss';
import Button from '@/shared/UI/Button';
import GateWindow from '@/entities/GateWindow/GateWindow';
import { useKruzapButtons } from '@/shared/hooks/useKruzapButtons';
import { useWebSocket } from '@/shared/hooks/useWebSocket';

const Header: FC = () => {
	const { handleButton, closeDisabled, openDisabled } = useKruzapButtons();

	const { sendMessage } = useWebSocket(
		'ws://127.0.0.1:8000/ws/simulation/student/',
	);

	const handleStart = () => {
		sendMessage({
			type: 'start_simulation',
			studentId: '12345',
		});
	};

	handleStart();

	return (
		<header className={style.header}>
			<div className={style.wrapper}>
				<span className={style.defense}>Работа защит</span>

				<div className={style.part}>
					<span className={style.name}>птк</span>
					<Button
						width={105}
						height={38}
						id="closePtkBtn"
						text="Закрыть"
					/>
					<Button
						width={70}
						height={38}
						id="stopPtkBtn"
						text="Стоп"
					/>
					<Button
						width={106}
						height={38}
						id="openPtkBtn"
						text="Открыть"
					/>
				</div>

				<GateWindow />

				<div className={style.part}>
					<Button
						width={105}
						height={38}
						id="closeKruzapBtn"
						text="Закрыть"
						disabled={closeDisabled}
						onMouseDown={() => handleButton('close', 'onMouseDown')}
						onMouseUp={() => handleButton('close', 'onMouseUp')}
					/>
					<Button
						width={106}
						height={38}
						id="openKruzapBtn"
						text="Открыть"
						disabled={openDisabled}
						onMouseDown={() => handleButton('open', 'onMouseDown')}
						onMouseUp={() => handleButton('open', 'onMouseUp')}
					/>
					<span className={style.name}>Круза-п</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
