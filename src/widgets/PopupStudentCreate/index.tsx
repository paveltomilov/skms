
import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import LoginInput from '@/shared/UI/LoginInput';

export const PopupStudentCreate: FC = () => {
    return (
        <div className={styles.popup}>
            <div className={styles.form}>
                <LoginInput
                    label='ФИО ученика'
                    placeholder='ФИО'
                />
                <LoginInput
                    label='Email ученика'
                    placeholder='Email'
                />
                <Button
                className={styles.button}
                    width={344}
                    height={55}
                    text='Создать ученика' />
            </div>
        </div>
    );
};