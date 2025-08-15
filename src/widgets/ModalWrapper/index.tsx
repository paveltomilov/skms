import { FC, useState } from 'react';
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

interface Position {
	x: number;
	y: number;
}

const ModalWrapper: FC<ModalProps> = ({
	title,
	onClose,
	isBlur = false,
	children,
}) => {
	// начальные координаты окна
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	// состояние удержания header
	const [isDragging, setIsDragging] = useState<boolean>(false);
	// конечные координаты окна
	const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setStartPos({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;

		const newX = e.clientX - startPos.x;
		const newY = e.clientY - startPos.y;

		setPosition({
			x: newX,
			y: newY,
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};
	return (
		<div
			className={`${styles.modal} ${isBlur && styles.modal_isBlur}`}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			<div
				className={styles.modal__wrapper}
				onClick={e => e.stopPropagation()}
				style={{
					transform: `translate(${position.x}px, ${position.y}px)`,
				}}
			>
				<div
					className={styles.modal__header}
					onMouseDown={handleMouseDown}
				>
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
