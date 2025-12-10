import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import Button from '@/shared/UI/Button';
import { openModal } from '@/store/modalSlice';
import Timer from '../Timer';

const SimulationControl: FC<{ className?: string }> = ({ className }) => {
    const dispatch = useDispatch();

    const openUnfinished = () => {
        dispatch(openModal('infoUnfinished'))
    }

    return (
        <div className={cn(styles.control, className)}>
            <Button
                width={89}
                height={38}
                aria-label={'Задвижка исправна'}
                text={'Задвижка исправна'}
                className={styles.control__buttonFinish}
                onClick={openUnfinished}
            />
            <Timer/>
        </div>
    );
};

export default SimulationControl;