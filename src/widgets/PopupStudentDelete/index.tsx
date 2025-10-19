import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';

export const PopupStudentDelete: FC = () => {
    const student = 'Иванов Иван Иванович';
    return (
        <div className={styles.popup}>
            <div className={styles.info}>Ученик {student} будет удален</div>
                <Button
                className={styles.button}
                    width={278}
                    height={55}
                    text='Подтвердить' />
        </div>
    );
};