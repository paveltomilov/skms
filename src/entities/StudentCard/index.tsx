import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useDispatch } from 'react-redux';
import { openModal } from '@/store/modalSlice';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

interface Props {
    className?: string,
    id: number,
    firstName: string,
    lastName: string,
};

const StudentCard: FC<Props> = ({className, id, firstName, lastName}) => {

    const dispatch = useDispatch();

    const router = useRouter();

    return (
        <div className={cn(styles.card, className)}>
            <div className={styles.card__profile}>
                <img className={styles.card__profile__photo} src='/images/user_icon.png' alt="Фото пользователя"></img>
                <div className={styles.card__profile__name}>{id} {firstName} {lastName}</div>
            </div>
            <div className={styles.card__buttons}>
                <Button
                    width={239}
                    height={32}
                    text='Задать симуляцию'
                    className={styles.card__buttons__button}
                    onClick={() => router.push('/ptk')}
                />
                <Button
                    width={239}
                    height={32}
                    text='Статистика'
                    className={styles.card__buttons__button}
                    onClick={() => dispatch(openModal('studentStatistics'))}
                />
                <Button
                    width={239}
                    height={32}
                    text='Удалить ученика'
                    className={styles.card__buttons__button}
                    onClick={() => dispatch(openModal('studentDelete'))}
                />
            </div>
        </div>
    );
};

export default StudentCard;