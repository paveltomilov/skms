'use client';

import { FC, useEffect, useState } from 'react';
import style from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useGateControlButtons } from '@/shared/hooks/useGateControlButtons';
import GateWindow from '@/entities/GateWindow';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { AppDispatch, RootState } from '@/store/store';
import { setPercent } from '@/store/percentSlice';

const HeaderZra: FC = () => {
	const dispatch = useAppDispatch<AppDispatch>();
	const [percentDef, setPercentDef] = useState<number>(0);
	const percentValue = useAppSelector((state: RootState) => state.percent);

	useEffect(() => {
		setPercentDef(percentValue);
	}, [percentValue]);

	const {
		handleButton,
		stopGateMovement,
		closeKruzapDisabled,
		openKruzapDisabled,
		closePtkDisabled,
		openPtkDisabled,
		stopPtkDisabled,
		closePtkActive,
		openPtkActive,
	} = useGateControlButtons();

	return (
		<header className={style.header}>
			<div className={style.wrapper}>
				<span className={style.defense}>Работа защит</span>

				<div className={style.part}>
					<span className={style.name}>птк</span>
					<Button
						width={105}
						height={38}
						text="Закрыть"
						disabled={closePtkDisabled}
						active={closePtkActive}
						onClick={() => handleButton('ptk', 'close')}
					/>
					<Button
						width={70}
						height={38}
						text="Стоп"
						disabled={stopPtkDisabled}
						onClick={() => stopGateMovement('ptk')}
					/>
					<Button
						width={106}
						height={38}
						text="Открыть"
						disabled={openPtkDisabled}
						active={openPtkActive}
						onClick={() => handleButton('ptk', 'open')}
					/>
				</div>

				<GateWindow />

				<div className={style.part}>
					{/* временный интерфейс для изменения базовых параметров window */}
					<select
						size={2}
						className={style.hideScrollbar}
						value={percentDef}
						onChange={e =>
							dispatch(setPercent(Number(e.target.value)))
						}
					>
						{Array.from({ length: 101 }, (_, idx) => (
							<option key={idx} value={idx}>
								{idx}
							</option>
						))}
						<option key={'default'} value={-1}>
							DEF
						</option>
					</select>
					<Button
						width={105}
						height={38}
						text="Закрыть"
						disabled={closeKruzapDisabled}
						onMouseDown={() => handleButton('kruzap', 'close')}
						onMouseUp={() => stopGateMovement('kruzap')}
					/>
					<Button
						width={106}
						height={38}
						text="Открыть"
						disabled={openKruzapDisabled}
						onMouseDown={() => handleButton('kruzap', 'open')}
						onMouseUp={() => stopGateMovement('kruzap')}
					/>
					<span className={style.name}>Круза-п</span>
				</div>
			</div>
		</header>
	);
};

export default HeaderZra;
