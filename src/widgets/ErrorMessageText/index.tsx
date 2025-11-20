import { FC } from 'react';
import styles from './styles.module.scss';

const ErrorMessageText: FC<{ text: string }> = ({ text }) => {
	return <span className={styles.error}>{text}</span>;
};

export default ErrorMessageText;
