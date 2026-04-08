import { FC, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { closeModal, Modals } from '@/store/modalSlice';
import { useAppDispatch } from '@/shared/hooks/store';
import { useDragging } from '@/shared/hooks/useDragging';
import { GATES } from '@/shared/configs/gate';
import ModalHeader from '@/entities/ModalHeader';
import { clearCurrentStudent } from '@/store/trainingSlice';
import { detachProbe } from '@/store/multimeterSlice';

interface ModalOverlayProps {
	id: Modals;
	gateId?: string;
	children: React.ReactNode;
	headerTitle?: string;
	preventClose?: boolean;
}

const ModalOverlay: FC<ModalOverlayProps> = ({
	id,
	gateId = 'g1',
	children,
	headerTitle,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const { handleMouseDown, position, setPosition } = useDragging(modalRef);
	const dispatch = useAppDispatch();
	const name = GATES[gateId].name;

	const [isVisible, setIsVisible] = useState(false);

	const handleClose = () => {
		dispatch(detachProbe('red'));
		dispatch(detachProbe('black'));
		dispatch(closeModal(id));
		if (id === 'studentDelete') {
			dispatch(clearCurrentStudent());
		}
	};

	useEffect(() => {
		if (modalRef.current) {

			modalRef.current.style.visibility = 'hidden'; // Скрываем визуально, но сохраняем место в DOM для замера
			modalRef.current.style.transform = 'translate(0, 0)'; // Сбрасываем смещение для чистого замера

			// Форсируем перерисовку (Reflow), чтобы браузер применил стили выше перед замером
			// Чтение offsetWidth вызывает принудительный reflow
			const width = modalRef.current.offsetWidth;
			const height = modalRef.current.offsetHeight;

			// Вычисляем центр
			const x = (window.innerWidth - width) / 2;
			const y = (window.innerHeight - height) / 2;

			setPosition({ x, y });

			requestAnimationFrame(() => {
				setIsVisible(true);
			});
		}
	}, []);

	return (
		<div
			ref={modalRef}
			className={styles.modal__wrapper}
			onClick={e => e.stopPropagation()}
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`,
				opacity: isVisible ? 1 : 0,
				visibility: isVisible ? 'visible' : 'hidden',
				transition: 'opacity 0.1s ease-in-out',
				pointerEvents: isVisible ? 'auto' : 'none',
				position: 'fixed',
				top: 0,
				left: 0,
			}}
		>
			<ModalHeader
				id={id}
				handleMouseDown={handleMouseDown}
				headerTitle={headerTitle}
				gateName={name}
				handleClose={handleClose}
			/>
			{children}
		</div>
	);
};

export default ModalOverlay;
