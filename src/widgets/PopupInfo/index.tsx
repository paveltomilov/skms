import { FC } from 'react';
import styles from './styles.module.scss';
import Error from '@/shared/UI/icons/Error';

export const PopupInfo: FC<{ content: 'start' | 'current' | 'malfunctions' }> = ({ content }) => {

    const renderContent = () => {
        switch (content) {
            case 'start':
                return (
                    <h2 className={styles.popup__content}>Получена новая неисправность. Симуляция запущена.</h2>
                );
            case 'current':
                return (
                    <h2 className={styles.popup__content}>Симуляция уже активна. Завершите текущую перед началом новой.</h2>
                );
            case 'malfunctions':
                return (
                    <div className={styles.popup__content__malfunctions}>
                        <Error className={styles.popup__content__malfunctions__img} />
                        <h2 className={styles.popup__content__malfunctions__text}>Не все дефекты найдены. Попробуйте еще раз!</h2>
                    </div>
                );
            default:
                return <h1>Hello!</h1>;
        }
    };

    return (
        <div className={styles.popup}>
            {renderContent()}
        </div>
    );
};