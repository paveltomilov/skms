import styles from './styles.module.scss';
import { FC } from 'react';

interface Props {
	state: 'on' | 'off';
	type: 'open' | 'close';
	onMouseDown?: () => void;
	onMouseUp?: () => void;
}

export const AutomatButton: FC<Props> = ({
	state,
	type,
	onMouseDown,
	onMouseUp,
}) => {
	let text;

	if (type === 'open' && state === 'on') text = 'открыто';
	else if (type === 'open' && state === 'off') text = 'открыть';
	else if (type === 'close' && state === 'on') text = 'закрыто';
	else if (type === 'close' && state === 'off') text = 'закрыть';

	return (
		<button
			className={`${styles.button} ${styles[type]} ${styles[state]}`}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			<span className={`${styles.button__text} ${styles[state]}`}>
				{text}
			</span>
		</button>
	);
};
