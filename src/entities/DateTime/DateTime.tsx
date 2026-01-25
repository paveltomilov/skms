import { useDate } from '@/shared/hooks/useDate';
import { FC } from 'react';
import styles from './styles.module.scss';

const DateTime: FC = () => {
    const { formattedDate, formattedTime, dateTimeDate, dateTimeTime } =
        useDate();

    return (
        <div suppressHydrationWarning className={styles.datetime}>
            <time dateTime={dateTimeDate} suppressHydrationWarning>
                {formattedDate}
            </time>{' '}
            <time dateTime={dateTimeTime} suppressHydrationWarning>
                {formattedTime}
            </time>
        </div>
    );
};

export default DateTime;