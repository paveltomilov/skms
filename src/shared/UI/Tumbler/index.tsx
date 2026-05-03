'use client';
import styles from './styles.module.scss';
import { FC } from 'react';
import { SwitchMode } from '@/shared/types/switch';

interface Props {
	mode: SwitchMode;
	onModeCommit?: (mode: SwitchMode) => void;
}

const Tumbler: FC<Props> = ({ mode, onModeCommit }) => {
	const handleClick = () => {
		const nextMode: SwitchMode = mode === 'on' ? 'off' : 'on';
		onModeCommit?.(nextMode);
	};

	return (
		<div className={styles.box}>
			<div className={styles.box__title}>
				<p
					className={`${styles.box__title_text} ${
						mode === 'off' && styles.box__title_text_off
					}`}
				>
					Собран
				</p>
			</div>
			<div className={styles.tumbler}>
				<div
					className={`${styles.tumbler__handle} ${
						mode === 'off' && styles.tumbler__handle_off
					} `}
					onClick={handleClick}
				/>
			</div>
			<div className={styles.box__title}>
				<p
					className={`${styles.box__title_text} ${
						mode === 'on' && styles.box__title_text_off
					}`}
				>
					Разобран
				</p>
			</div>
		</div>
	);
};

export default Tumbler;
