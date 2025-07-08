import { FC, useEffect, useState } from 'react';
import Button from '@/shared/UI/Button';
import Input from '@/shared/UI/Input';
import styles from './styles.module.scss';
import Close from '@/shared/UI/icons/Close';

interface ModalSize {
	width?: string;
	height?: string;
	headerHeight?: string;
}

interface ModalProps {
	header?: string;
	second?: number;
	children?: React.ReactNode;
	modalSize?: ModalSize;
	buttonWidthPx?: number;
	buttonHeightPx?: number;
	iconWidthPx?: number;
	iconHeightPx?: number;
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	isBlur?: boolean;
}

const ModalWrapper: FC<ModalProps> = ({
	isOpen,
	modalSize = {},
	header = 'ПКДВ-2',
	second = 59,
	onClose,
	isBlur = false,
	buttonWidthPx = 26,
	buttonHeightPx = 26,
	iconWidthPx = 20,
	iconHeightPx = 20,
	children,
}) => {
	const [clickedInside, setClickedInside] = useState(false);

	// Блокировка скролла при открытом модальном окне
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const style = {
		'--modal-width': modalSize?.width || 'auto',
		'--modal-height': modalSize?.height || 'auto',
		'--headerHeight': modalSize?.headerHeight || '34px',
	} as React.CSSProperties;

	const handleMouseDown = () => setClickedInside(true);
	const handleMouseUp = () => setClickedInside(false);

	// Закрытие по клику на оверлей (если клик был вне модального окна)
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!clickedInside && e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className={`${styles.overlay} ${
				isBlur ? styles.blurBackground : ''
			}`}
			onClick={handleOverlayClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			style={style}
		>
			<div className={styles.modal} onClick={e => e.stopPropagation()}>
				<div className={styles.header}>
					<div className={styles.headerWrapper}>
						<p className={styles.headerText}>{header}</p>
						<Button
							id="ModalHeader"
							height={buttonHeightPx}
							width={buttonWidthPx}
							className={styles.buttonHeader}
							icon={
								<Close
									size={{
										width: iconWidthPx,
										height: iconHeightPx,
									}}
								/>
							}
							onClick={onClose}
						/>
					</div>
				</div>
				<div className={styles.content}>
					{children ?? (
						<>
							<p className={styles.text}>
								Введите полученный код из 6 символов, которые мы
								отправили на указанный <br /> Вас e-mail
							</p>
							<div className={styles.input}>
								<Input status="default" type="code" />
							</div>
							<p className={styles.textTimer}>
								Отправить код повторно через {second} сек.
							</p>
							<Button
								id="1"
								height={55}
								width={270}
								disabled
								text="Войти"
								className={styles.buttonChandge}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ModalWrapper;
