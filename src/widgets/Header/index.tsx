'use client';
import { FC } from 'react';
import style from './styles.module.scss';
import Button from '@/shared/UI/Button';
import GateWindow from '@/entities/GateWindow/GateWindow';
import { useHeaderButtons } from '@/shared/hooks/useHeaderButtons';

const Header: FC = () => {
	const {
		handleKruzapButton,
		handlePtkButton,
		stopGateMovement,
		closeKruzapDisabled,
		openKruzapDisabled,
		closePtkDisabled,
		openPtkDisabled,
		stopPtkDisabled,
		closePtkActive,
		openPtkActive,
	} = useHeaderButtons();

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
						disabled={closePtkDisabled}
						active={closePtkActive}
						onClick={() => handlePtkButton('close')}
					/>
					<Button
						width={70}
						height={38}
						id="stopPtkBtn"
						text="Стоп"
						disabled={stopPtkDisabled}
						onClick={() => stopGateMovement()}
					/>
					<Button
						width={106}
						height={38}
						id="openPtkBtn"
						text="Открыть"
						disabled={openPtkDisabled}
						active={openPtkActive}
						onClick={() => handlePtkButton('open')}
					/>
				</div>

				<GateWindow />

				<div className={style.part}>
					<Button
						width={105}
						height={38}
						id="closeKruzapBtn"
						text="Закрыть"
						disabled={closeKruzapDisabled}
						onMouseDown={() =>
							handleKruzapButton('close', 'onMouseDown')
						}
						onMouseUp={() =>
							handleKruzapButton('close', 'onMouseUp')
						}
					/>
					<Button
						width={106}
						height={38}
						id="openKruzapBtn"
						text="Открыть"
						disabled={openKruzapDisabled}
						onMouseDown={() =>
							handleKruzapButton('open', 'onMouseDown')
						}
						onMouseUp={() =>
							handleKruzapButton('open', 'onMouseUp')
						}
					/>
					<span className={style.name}>Круза-п</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
