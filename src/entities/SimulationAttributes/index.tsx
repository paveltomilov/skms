import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import Button from '@/shared/UI/Button';
import { openModal } from '@/store/modalSlice';
import Timer from '../Timer';

const SimulationAttributes: FC<{ className?: string }> = ({ className }) => {
    const dispatch = useDispatch();
    return (
        <div className={cn(styles.attributes, className)}>
            <Button
                width={89}
                height={38}
                aria-label={'Задвижка исправна'}
                text={'Задвижка исправна'}
                className={styles.button__finish}
                onClick={() => dispatch(openModal('infoUnfinished'))}
            />
            <div className={styles.line}></div>
            <Timer/>
        </div>

    );
};

export default SimulationAttributes;