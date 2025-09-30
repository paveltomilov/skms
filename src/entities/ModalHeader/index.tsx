import { FC, MouseEventHandler } from 'react';
import styles from './styles.module.scss';
import { Modals } from '@/store/modalSlice';
import Button from '@/shared/UI/Button';
import Close from '@/shared/UI/icons/Close';

interface ModalHeaderProps {
    id?: Modals;
    handleMouseDown?: MouseEventHandler<HTMLDivElement>;
    headerTitle?: string;
    gateName?: string;
    handleClose: () => void;
};

const ModalHeader: FC<ModalHeaderProps> = ({
    id,
    handleMouseDown,
    headerTitle,
    gateName,
    handleClose
}) => {
    return (
        <div
            id={id}
            className={styles.header}
            onMouseDown={handleMouseDown}
        >
            <span className={styles.header__title}>
                {headerTitle || gateName}
            </span>
            <Button
                width={26}
                height={26}
                onClick={handleClose}
                aria-label="Закрыть"
                icon={<Close size="sm" />}
            />
        </div>
    );
};

export default ModalHeader;