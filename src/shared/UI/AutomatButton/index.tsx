import styles from './styles.module.scss';
import { FC } from 'react';

interface Props {
	state: 'on' | 'off';
	type: 'open' | 'close';
}

export const AutomatButton: FC<Props> = ({ state, type }) => {
	return (
		<button className={`${styles.button} ${styles[type]} ${styles[state]}`}>
			<span className={styles.button__text}>
				{type === 'open' ? 'открыто' : 'закрыто'}
			</span>
		</button>
	);
};
