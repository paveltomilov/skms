import { FC, useEffect } from 'react';
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
	// Блокировка скролла с динамической компенсацией ширины скроллбара
	useEffect(() => {
		if (isOpen) {
			const scrollBarWidth =
				window.innerWidth - document.documentElement.clientWidth;
			document.body.classList.add('modal-open');
			if (scrollBarWidth > 0) {
				document.body.style.paddingRight = `${scrollBarWidth}px`;
			}
		} else {
			document.body.classList.remove('modal-open');
			document.body.style.paddingRight = '';
		}

		return () => {
			document.body.classList.remove('modal-open');
			document.body.style.paddingRight = '';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const style = {
		'--modal-width': modalSize.width ?? undefined,
		'--modal-height': modalSize.height ?? undefined,
		'--headerHeight': modalSize.headerHeight || '34px',
	} as React.CSSProperties;

	return (
		<div
			className={`${styles.overlay} ${
				isBlur ? styles.blurBackground : ''
			}`}
			style={style}
			role="dialog"
			aria-modal="true"
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
