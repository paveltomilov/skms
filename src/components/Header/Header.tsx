import { FC, useEffect } from 'react';
import style from './Header.module.scss';
import { useDispatch } from 'react-redux';
import { setGateState } from '@/store/gateStateSlice';
import Button from '@c/Button';
import { useAppSelector } from '@/store/hooks';
import { disableButton, enableButton } from '@/store/buttonsSlice';
import GateWindow from '@c/GateWindow/GateWindow';
import { GATE_STATE_TYPE } from '@/store/gateStateSlice';

const Header: FC = () => {
	const dispatch = useDispatch();
	const buttonState = useAppSelector(state => state.buttonsReducer);
	const gateState = useAppSelector(state => state.gateReducer.state);

	useEffect(() => {
		if (gateState === 'open') {
			dispatch(disableButton('openBtn'));
			dispatch(disableButton('stopBtn'));
		} else if (gateState === 'close') {
			dispatch(disableButton('closeBtn'));
			dispatch(disableButton('stopBtn'));
		} else if (gateState === 'toOpen') {
			dispatch(disableButton('openBtn'));
			dispatch(disableButton('closeBtn'));
		} else if (gateState === 'toClose') {
			dispatch(disableButton('closeBtn'));
			dispatch(disableButton('openBtn'));
		} else if (gateState === 'intermediate') {
			dispatch(disableButton('stopBtn'));
		} else if (gateState === 'noPower') {
			dispatch(disableButton('stopBtn'));
			dispatch(disableButton('openBtn'));
			dispatch(disableButton('closeBtn'));
		}
	}, []);

	const handleClose = () => {
		dispatch(setGateState({ state: GATE_STATE_TYPE.toClose, value: 18.8 }));
		dispatch(disableButton('closeBtn'));
		dispatch(disableButton('openBtn'));
		dispatch(enableButton('stopBtn'));
	};

	const handleOpen = () => {
		dispatch(setGateState({ state: GATE_STATE_TYPE.toOpen, value: 18.8 }));
		dispatch(disableButton('closeBtn'));
		dispatch(disableButton('openBtn'));
		dispatch(enableButton('stopBtn'));
	};

	const handleStop = () => {
		dispatch(
			setGateState({ state: GATE_STATE_TYPE.intermediate, value: 18.8 }),
		);
		dispatch(enableButton('closeBtn'));
		dispatch(enableButton('openBtn'));
		dispatch(disableButton('stopBtn'));
	};

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
						disabled={buttonState.activeButtons['closeBtn']}
					/>
					<Button
						text="Стоп"
						width={70}
						height={38}
						id="stopBtn"
						onClick={handleStop}
						disabled={buttonState.activeButtons['stopBtn']}
					/>
					<Button
						onClick={handleOpen}
						text="Открыть"
						width={106}
						height={38}
						id="openBtn"
						disabled={buttonState.activeButtons['openBtn']}
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
						disabled={buttonState.activeButtons['closeBtn']}
					/>
					<Button
						text="Стоп"
						width={70}
						height={38}
						id="stopBtn"
						onClick={handleStop}
						disabled={buttonState.activeButtons['stopBtn']}
					/>
					<Button
						onClick={handleOpen}
						text="Открыть"
						width={106}
						height={38}
						id="openBtn"
						disabled={buttonState.activeButtons['openBtn']}
					/>
					<span className={style.name}>Круза-п</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
