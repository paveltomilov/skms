'use client';

import styles from './styles.module.scss';
import StudentCard from '@/entities/StudentCard';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import Button from '@/shared/UI/Button';
import { postMalfunctions } from '@/shared/utils/postMalfunctions/postMalfunctions';
import { useRequestData } from '@/shared/hooks/useRequestData';
import { useStudents } from '@/shared/hooks/useStudents';
import Loader from '@/shared/UI/Loader';
import ErrorMessage from '@/shared/components/ErrorMessage';

const Training = () => {

    const { urlBase, access, elements } = useRequestData();

    const { role } = useUserCookies();

    const { students, isLoading, error, refetch } = useStudents(role);

    const handleCreateMalfunctions = () => {
        postMalfunctions(urlBase, access, elements);
    };

    return (
        <>
            {role === 'student' ?
                <section>Недоступно для студента</section>
                :
                <section className={styles.training}>
                    <div className={styles.training__title}>Обучение</div>
                    <div className={styles.training__cards}>
                        {students.map((user) => (
                            <StudentCard
                                key={user.id}
                                id={user.id}
                                className={styles.training__cards__card}
                                firstName={user.first_name}
                                lastName={user.last_name} />
                        ))}
                    </div>
                </section>
            }
            {role != 'student' && <Button
                width={300}
                height={40}
                text='создать неисправности'
                onClick={() => handleCreateMalfunctions()}
            />}
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} refetch={refetch} />}
        </>
    );
};

export default Training;