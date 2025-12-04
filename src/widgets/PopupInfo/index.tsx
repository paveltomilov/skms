import { FC } from 'react';
import styles from './styles.module.scss';
import Error from '@/shared/UI/icons/Error';

export const PopupInfo: FC<{ content: 'start' | 'current' | 'malfunctions' }> = ({ content }) => {

    return (
        <div className={styles.popup}>
            {content === 'start' &&
                <div className={styles.popup__content}>Получена новая неисправность. Симуляция запущена.</div>}
            {content == 'current' &&
                <div className={styles.popup__content}>Симуляция уже активна. Завершите текущую перед началом новой.</div>}
            {content == 'malfunctions' &&
                <div className={styles.popup__content__malfunctions}>
                    <Error className={styles.popup__content__malfunctions__img}/>
                    <div className={styles.popup__content__malfunctions__text}>Не все дефекты найдены. Попробуйте еще раз!</div>
                </div>}
        </div>
    );
};