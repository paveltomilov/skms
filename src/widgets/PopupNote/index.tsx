import { FC } from 'react';
import styles from './styles.module.scss';

import Button from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closeAllModal } from '@/store/modalSlice';

export const PopupNote: FC = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const handleChoose = () => {
        dispatch(closeAllModal());
        router.push('/training');
    };

    return (
        <div className={styles.popup}>
            <div className={styles.title}>Ученик не выбран</div>
            <Button
                className={styles.button}
                width={278}
                height={55}
                text='Выбрать'
                onClick={handleChoose} />
        </div>
    );
};