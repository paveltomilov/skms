'use client';
import { FC } from 'react';
import style from './styles.module.scss';
import Button from '@/shared/UI/Button';
import GateWindow from '@/entities/GateWindow/GateWindow';
import { useHeaderButtons } from '@/shared/hooks/useHeaderButtons';

const Header: FC = () => {
	const { handleButtonClick, buttonsState } = useHeaderButtons();

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
						onClick={() => handleButtonClick('kruzap', 'close')}
						disabled={buttonsState.kruzap.closeDisabled}
					/>
					<Button
						width={106}
						height={38}
						id="openKruzapBtn"
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
