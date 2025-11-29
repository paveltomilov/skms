import { FC, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { closeModal, Modals } from '@/store/modalSlice';
import { useAppDispatch } from '@/shared/hooks/store';
import { useDragging } from '@/shared/hooks/useDragging';
import { GATES } from '@/shared/configs/gate';
import ModalHeader from '@/entities/ModalHeader';
import { clearCurrentStudent } from '@/store/trainingSlice';

interface ModalOverlayProps {
	id: Modals;
	gateId?: string;
	children: React.ReactNode;
	headerTitle?: string;
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

	useEffect(() => {
		if (modalRef.current) {
			const rect = modalRef.current.getBoundingClientRect();
			const x = (window.innerWidth - rect.width) / 2;
			const y = (window.innerHeight - rect.height) / 2;
			setPosition({ x: x, y: y });
		}
	}, []);

	return (
		<div
			ref={modalRef}
			className={styles.modal__wrapper}
			onClick={e => e.stopPropagation()}
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`,
				zIndex: '11',
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
				handleClose={() => {
					dispatch(closeModal(id));
					if (id === 'studentDelete') {
						dispatch(clearCurrentStudent());
					}
				}}
			/>
			{children}
		</div>
	);
};

export default ModalOverlay;