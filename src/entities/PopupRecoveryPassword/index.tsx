import styles from './style.module.scss';
import {FC} from 'react';
import FormRecoveryPassword from '@/widgets/FormRecoveryPassword';
import Button from '@/shared/UI/Button';
import {useAppDispatch} from '@/shared/hooks/store';
import {closeModal} from '@/store/modalSlice';

type PopupRecoveryProps = {
    setSteps?: (value: 1 | 2 | 3) => void;
}

const PopupRecoveryPassword:FC<PopupRecoveryProps> = ({setSteps}) => {
    const dispatch = useAppDispatch();
    const handleClosePopupRecoveryPassword = () => {
        dispatch(closeModal('recoveryPassword'));
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
            <FormRecoveryPassword setStep={setSteps}/>
        </div>
    );
};

export default PopupRecoveryPassword;