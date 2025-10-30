import styles from './styles.module.scss';
import {Dispatch, FC, SetStateAction} from 'react';
import Image from 'next/image';
import Button from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';

interface PopupRegistrationDoneProps {
    closeModalSuccess?: Dispatch<SetStateAction<boolean>>
    closeRegistrationMode?: Dispatch<SetStateAction<boolean>>
    steps?: number,
}

const PopupRegistrationDone: FC<PopupRegistrationDoneProps> = ({closeModalSuccess, closeRegistrationMode, steps}) => {
    const router = useRouter();

    const handleClosePopupDone = () => {
        if (closeModalSuccess && closeRegistrationMode) {
            closeModalSuccess(false);
            closeRegistrationMode(false);
        }
        if (steps === 3) {
            router.push('/login');
        }
    };
    
    return(
        <div className={`${styles.container} ${steps !== 3 ? styles.pb : ''}`}>
            <Image
                width={200}
                height={200}
                src={'/svg/registrationDone.svg'}
                alt={'Регистрация завершена'}
                className={styles.container__image}
            />
            {steps === 3 ?
                <p className={styles.container__text}>
                    Пароль изменен
                </p> :
                <p className={styles.container__text}>
                    Регистрация прошла успешна.<br/>На&nbsp;указанный при регистрации e-mail была отправлена ссылка для завершения регистрации
                </p>
            }
            <Button
                width={270}
                height={55}
                text={'Продолжить'}
                ariaLabel={'Продолжить'}
                onClick={handleClosePopupDone}
                className={styles.container__button}
            />
        </div>
    );
};

export default PopupRegistrationDone;