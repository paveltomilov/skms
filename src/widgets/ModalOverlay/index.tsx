import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { closeModal } from '@/store/modalSlice';
import Close from '@/shared/UI/icons/Close';
import { useAppDispatch } from '@/shared/hooks/store';
import { useDragging } from '@/shared/hooks/useDragging';
import { GATES } from '@/shared/configs/gate';

interface ModalOverlayProps {
	id: 'gateControl' | 'diagnostic' | 'gateValves' | 'automatic' | 'test';
	gateId?: string;
	children: React.ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = ({
	id,
	gateId = 'g1',
	children,
}) => {
	const { handleMouseDown, position } = useDragging();
	const dispatch = useAppDispatch();
	const { name } = GATES[gateId];

	return (
		<div
			className={styles.modal__wrapper}
			onClick={e => e.stopPropagation()}
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`,
				zIndex: '11',
			}}
		>
			<div
				id={id}
				className={styles.modal__header}
				onMouseDown={e => handleMouseDown(e)}
			>
				<span className={styles.modal__header_title}>
					{id === 'automatic' ? 'Автомат' : name}
				</span>
				<Button
					width={26}
					height={26}
					onClick={() => dispatch(closeModal(id))}
					aria-label="Закрыть"
					icon={<Close size="sm" />}
				/>
			</div>
			{children}
		</div>
	);
};

export default ModalOverlay;
