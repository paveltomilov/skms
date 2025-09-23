import { FC, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import PopupUserInfo from '@/widgets/PopupUserInfo';

const OperatorPanel: FC = () => {

    const [userInfoIsOpen, setUserInfoIsOpen] = useState(false);
    const handleUserInfo = () => setUserInfoIsOpen(!userInfoIsOpen);

    return (
        <div className={styles.operatorPanel__wrapper}>
            {userInfoIsOpen &&
                <PopupUserInfo
                    className={styles.userInfo}
                    handlePopupClose={() => setUserInfoIsOpen(false)} />}
            <Button
                width={330}
                height={64}
                onClick={handleUserInfo}
                icon={
                    <div className={styles.panel}>
                        <div className={styles.panel__img}>
                        </div>
                        <div className={styles.panel__operator}>
                            <span className={styles.panel__operatorTitle}>Оператор:</span>
                            <span className={styles.panel__operatorName}>
                                ASUTP_SMENA_V
                            </span>
                        </div>
                        <div className={styles.panel__info}>Информация о профиле</div>
                    </div>
                }
            />
        </div>
    );
};

export default OperatorPanel;