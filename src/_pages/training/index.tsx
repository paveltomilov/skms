'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import StudentCard from '@/entities/StudentCard';
import { User } from '@/shared/types/users';
import { getUsers } from '@/shared/utils/getUsers/getUsers';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import Button from '@/shared/UI/Button';
import { postMalfunctions } from '@/shared/utils/postMalfunctions/postMalfunctions';
import { useRequestData } from '@/shared/hooks/useRequestData';

const Training = () => {

    const initialStudents: User[] = [];

    const [students, setStudents] = useState(initialStudents);
    const [isStudent, setIsStudent] = useState(true);

    const { urlBase, access,elements } = useRequestData();

    const { role } = useUserCookies();

    const handleCreateMalfunctions =() =>  {
        postMalfunctions(urlBase,access,elements);
    };

    useEffect(() => {
        if (role != 'student') {
            setIsStudent(false);
            async function getSudents() {
                const students = (await getUsers()).filter(user => user.role === 'student');
                setStudents(students);
            }
            getSudents();
        }
    }
    , []);

    return (
        <>
            { !isStudent && <section className={styles.training}>
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
            </section>}
            <Button 
            width={300}
            height={40}
            text='создать неисправности'
            onClick={() => handleCreateMalfunctions()}
            />
            {isStudent && 
            <section>Недоступно для студента</section>}
        </>
    );
};

export default Training;