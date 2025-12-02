import { FC } from 'react';
import styles from './styles.module.scss';

const ErrorMessageText: FC<{ text: string }> = ({ text }) => {
	return <span className={styles.error} aria-live="polite">{text}</span>;
};

export default ErrorMessageText;
