import { FC } from 'react';
import styles from './styles.module.scss';
import { closeModal, Modals } from '@/store/modalSlice';
import { useAppDispatch } from '@/shared/hooks/store';
import { useDragging } from '@/shared/hooks/useDragging';
import { GATES } from '@/shared/configs/gate';
import ModalHeader from '@/entities/ModalHeader';

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
	const { handleMouseDown, position } = useDragging();
	const dispatch = useAppDispatch();
	const name = GATES[gateId].name;

	return (
		<div
			className={styles.modal__wrapper}
			onClick={e => e.stopPropagation()}
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`,
				zIndex: '11',
			}}
		>
			<ModalHeader
				id={id}
				handleMouseDown={e => handleMouseDown(e)}
				headerTitle={headerTitle}
				gateName={name}
				handleClose={() => dispatch(closeModal(id))}
			/>
			{children}
		</div>
	);
};

export default ModalOverlay;
