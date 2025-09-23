import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import ModalHeader from '@/entities/ModalHeader';

interface PopupUserInfoProps {
    handlePopupClose: () => void;
    className?: string
}

const PopupUserInfo: FC<PopupUserInfoProps> = ({
    className,
    handlePopupClose
}) => {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        router.push('/');
    };

    return (
        <div className={cn(className, styles.userInfo)}>
            <ModalHeader
                headerTitle="Пользователь"
                handleClose={handlePopupClose}
            />
            <div className={styles.userInfo__profile}>
                <img className={styles.userInfo__profile__photo} alt="Фото пользователя"></img>
                <div className={styles.userInfo__profile__info}>
                    <div className={styles.userInfo__profile__info__name}>{localStorage.getItem('user_name')}</div>
                    <div className={styles.userInfo__profile__onfo__status}>
                        {localStorage.getItem('user_isstaff') === 'true' ? 'Преподаватель' : 'Студент'}
                    </div>
                </div>
            </div>
            <ul className={styles.userInfo__more}>
                <li>
                    <img src='/svg/support.svg' />
                    Помощь
                </li>
                <li>
                    <img src='/svg/history.svg' />
                    История сессий</li>
                <li>
                    <img src='/svg/add-account.svg' />
                    Добавить аккаунт</li>
            </ul>
            <Button
                width={125}
                height={38}
                text="Выйти"
                onClick={handleLogout}
                className={styles.userInfo__logout}
            />
        </div>
    );
};

export default PopupUserInfo;