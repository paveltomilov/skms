'use client';

import styles from './styles.module.scss';
import StudentCard from '@/entities/StudentCard';

const Training = () => {

    return (
        <section className={styles.training}>
            <div className={styles.training__title}>Обучение</div>
            <div className={styles.training__cards}>
                {[...Array<number>(10)].map((_,index) => (
                    <StudentCard key={index} className={styles.training__cards__card} />
                    ))}
            </div>
        </section>
    );
};

export default Training;