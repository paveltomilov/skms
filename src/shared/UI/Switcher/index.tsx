'use client';
import styles from './styles.module.scss';
import { FC } from 'react';
import SwitchHandle from '../icons/SwitchHandle';
import { SWITCHER_ANGLES } from '@/shared/configs/knob';
import { SwitchMode } from '@/shared/types/switch';
interface Props {
	mode: SwitchMode;
	onModeCommit?: (mode: SwitchMode) => void;
}

const Switcher: FC<Props> = ({ mode, onModeCommit }) => {
	const handleClick = () => {
		const nextMode: SwitchMode = mode === 'on' ? 'off' : 'on';
		onModeCommit?.(nextMode);
	};

	return (
		<div className={styles.switcher}>
			<SwitchHandle
				onClick={handleClick}
				className={styles.switcher__handle}
				angle={SWITCHER_ANGLES[mode]}
			/>
		</div>
	);
};

export default Switcher;
