import styles from './style.module.scss';
import {FC} from 'react';
import FormRecoveryPassword from '@/widgets/FormRecoveryPassword';
import Button from '@/shared/UI/Button';

type PopupRecoveryProps = {
    setSteps?: (value: 1 | 2 | 3) => void;
    isOpen?: (value: boolean) => void,
}

const PopupRecoveryPassword:FC<PopupRecoveryProps> = ({setSteps, isOpen}) => {
    const handleClosePopupRecoveryPassword = () => {
        if (isOpen) {
            isOpen(false);
        }
    };

    return (
        <div className={styles.popupRecoveryPassword}>
            <div className={styles.popupRecoveryPassword_top}>
                <span className={styles.popupRecoveryPassword_top__text}>
                    Восстановление пароля
                </span>
                <Button
                    width={18}
                    height={18}
                    onClick={handleClosePopupRecoveryPassword}
                    aria-label="Закрыть"
                    className={styles.closeButton}
                />
            </div>
            <p className={styles.popupRecoveryPassword__description}>
                Введите полученный код из&nbsp;6&nbsp;символов, которые мы&nbsp;отправили на&nbsp;указанный Вами e-mail
            </p>
            <FormRecoveryPassword setStep={setSteps} isOpenPopup={isOpen}/>
        </div>
    );
};

export default PopupRecoveryPassword;