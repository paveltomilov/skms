import Button from '@/shared/UI/Button';
import { FC } from 'react';
import styles from './styles.module.scss';

interface ErrorMessageProps {
	message: string;
	refetch: () => Promise<void>;
	textButton?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
	message,
	refetch,
	textButton,
}) => {
	if (!message) {
		return null;
	}

	return (
		<div className={styles.errorBox} role="alert">
			<p className={styles.errorMessage}>Ошибка: {message}</p>
			<Button
				width={200}
				height={40}
				text={textButton ? textButton : 'Обновить данные'}
				onClick={refetch}
			/>
		</div>
	);
};

export default ErrorMessage;
