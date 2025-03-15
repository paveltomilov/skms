'use client';
import { FC, useEffect } from 'react';
import style from './Header.module.scss';
import { setGateState } from '@/store/gateStateSlice';
import Button from '@c/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { disableButton, enableButton } from '@/store/buttonsSlice';
import GateWindow from '@c/GateWindow/GateWindow';
import {
	GATE_ACTIONS,
	DISABLED_BUTTONS_MAP,
} from '@/shared/configs/headerConfig';

const Header: FC = () => {
	const dispatch = useAppDispatch();
	const gateState = useAppSelector(state => state.gateReducer.state);
	const buttonState = useAppSelector(
		state => state.buttonsReducer.activeButtons,
	);

	const { closeBtn, openBtn, stopBtn } = buttonState;

	useEffect(() => {
		DISABLED_BUTTONS_MAP[gateState]?.forEach(btn => {
			dispatch(disableButton(btn));
		});
	}, [gateState, dispatch]);

	const handleGateAction = (action: keyof typeof GATE_ACTIONS) => {
		const config = GATE_ACTIONS[action];

		if (config) {
			dispatch(
				setGateState({ state: config.state, value: config.value }),
			);
			config.disabled.forEach(btn => dispatch(disableButton(btn)));
			config.enabled.forEach(btn => dispatch(enableButton(btn)));
		}
	};

	const handleClose = () => handleGateAction('close');
	const handleOpen = () => handleGateAction('open');
	const handleStop = () => handleGateAction('stop');

	return (
		<header className={style.header}>
			<div className={style.wrapper}>
				<span className={style.defense}>Работа защит</span>

				<div className={style.part}>
					<span className={style.name}>птк</span>
					<Button
						onClick={handleClose}
						text="Закрыть"
						width={105}
						height={38}
						id="closeBtn"
						disabled={closeBtn}
					/>
					<Button
						text="Стоп"
						width={70}
						height={38}
						id="stopBtn"
						onClick={handleStop}
						disabled={stopBtn}
					/>
					<Button
						onClick={handleOpen}
						text="Открыть"
						width={106}
						height={38}
						id="openBtn"
						disabled={openBtn}
					/>
				</div>

				<GateWindow />

				<div className={style.part}>
					<Button
						onClick={handleClose}
						text="Закрыть"
						width={105}
						height={38}
						id="closeBtn"
						disabled={closeBtn}
					/>
					<Button
						text="Стоп"
						width={70}
						height={38}
						id="stopBtn"
						onClick={handleStop}
						disabled={stopBtn}
					/>
					<Button
						onClick={handleOpen}
						text="Открыть"
						width={106}
						height={38}
						id="openBtn"
						disabled={openBtn}
					/>
					<span className={style.name}>Круза-п</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
