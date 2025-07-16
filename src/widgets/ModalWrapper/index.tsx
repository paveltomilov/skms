import { FC } from 'react';
import Button from '@/shared/UI/Button';
import styles from './styles.module.scss';
import Close from '@/shared/UI/icons/Close';

interface ModalProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	onClose: () => void;
	isBlur?: boolean;
}

const ModalWrapper: FC<ModalProps> = ({
	title,
	onClose,
	isBlur = false,
	children,
}) => {
	return (
		<div className={`${styles.modal} ${isBlur && styles.modal_isBlur}`}>
			<div
				className={styles.modal__wrapper}
				onClick={e => e.stopPropagation()}
			>
				<div className={styles.modal__header}>
					<span className={styles.modal__header_title}>{title}</span>
					<Button
						width={26}
						height={26}
						onClick={onClose}
						aria-label="Закрыть"
						icon={<Close size="sm" />}
					/>
				</div>
				{children}
			</div>
		</div>
	);
};

export default ModalWrapper;
