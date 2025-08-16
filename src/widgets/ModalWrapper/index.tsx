
import { FC } from 'react';
import Button from '@/shared/UI/Button';
import styles from './styles.module.scss';
import Close from '@/shared/UI/icons/Close';
import { useDragging } from '@/shared/hooks/useDragging';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
import { GATES } from '@/shared/configs/gate';
import { PopupGateControl } from '../PopupGateControl';
import PopupGateValves from '../PopupGateValves';
import PopupDiagnostic from '@/entities/PopupDiagnostic';
import { Automatic } from '../Automatic';

interface ModalProps {
	className?: string;
	isBlur?: boolean;
}

const ModalWrapper: FC<ModalProps> = ({ isBlur = false }) => {
	const { gateValves, diagnostic, gateControl, automatic } = useAppSelector(
		state => state.modal,
	);
	const id = useAppSelector(state => state.gate.activeGateId as string);
	const dispatch = useAppDispatch();
	const { handleMouseDown, position } = useDragging();

	const { name } = GATES[id];

	return (
		<div className={`${styles.modal} ${isBlur && styles.modal_isBlur}`}>
			{gateControl && (
				<div
					className={styles.modal__wrapper}
					onClick={e => e.stopPropagation()}
					style={{
						transform: `translate(${position.control.x}px, ${position.control.y}px)`,
						zIndex: '11',
					}}
				>
					<div
						id="control"
						className={styles.modal__header}
						onMouseDown={handleMouseDown}
					>
						<span className={styles.modal__header_title}>
							{name}
						</span>
						<Button
							width={26}
							height={26}
							onClick={() => dispatch(closeModal('gateControl'))}
							aria-label="Закрыть"
							icon={<Close size="sm" />}
						/>
					</div>
					<PopupGateControl />
				</div>
			)}
			{diagnostic && (
				<div
					className={styles.modal__wrapper}
					onClick={e => e.stopPropagation()}
					style={{
						transform: `translate(${position.diagnostic.x}px, ${position.diagnostic.y}px)`,
						zIndex: '12',
					}}
				>
					<div
						id="diagnostic"
						className={styles.modal__header}
						onMouseDown={handleMouseDown}
					>
						<span className={styles.modal__header_title}>
							{name}
						</span>
						<Button
							width={26}
							height={26}
							onClick={() => dispatch(closeModal('diagnostic'))}
							aria-label="Закрыть"
							icon={<Close size="sm" />}
						/>
					</div>
					<PopupDiagnostic />
				</div>
			)}
			{gateValves && (
				<div
					className={styles.modal__wrapper}
					onClick={e => e.stopPropagation()}
					style={{
						transform: `translate(${position.values.x}px, ${position.values.y}px)`,
						zIndex: '12',
					}}
				>
					<div
						id="values"
						className={styles.modal__header}
						onMouseDown={handleMouseDown}
					>
						<span className={styles.modal__header_title}>
							{name}
						</span>
						<Button
							width={26}
							height={26}
							onClick={() => dispatch(closeModal('gateValves'))}
							aria-label="Закрыть"
							icon={<Close size="sm" />}
						/>
					</div>
					<PopupGateValves />
				</div>
			)}
			{automatic && (
				<div
					className={styles.modal__wrapper}
					onClick={e => e.stopPropagation()}
					style={{
						transform: `translate(${position.automatic.x}px, ${position.automatic.y}px)`,
					}}
				>
					<div
						id="automatic"
						className={styles.modal__header}
						onMouseDown={handleMouseDown}
					>
						<span className={styles.modal__header_title}>
							{'Автомат aaa'}
						</span>
						<Button
							width={26}
							height={26}
							onClick={() => dispatch(closeModal('automatic'))}
							aria-label="Закрыть"
							icon={<Close size="sm" />}
						/>
					</div>
					<Automatic />
				</div>
			)}
		</div>
	);
};

export default ModalWrapper;
