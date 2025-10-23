'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import StudentCard from '@/entities/StudentCard';
import { User } from '@/shared/types/users';
import { getUsers } from '@/shared/utils/getUsers/getUsers';

const Training = () => {

    const initialStudents: User[] = [];

    const [students,setStudents] = useState(initialStudents);

    useEffect(() => {
        async function getSudents() {
            const students = (await getUsers()).filter(user => user.role === 'student');
            setStudents(students);
        }
        getSudents();
    }, []);

    return (
        <section className={styles.training}>
            <div className={styles.training__title}>Обучение</div>
            <div className={styles.training__cards}>
                {students.map((user) => (
                    <StudentCard 
                    key={user.id} 
                    id = {user.id}
                    className={styles.training__cards__card} 
                    firstName={user.first_name}
                    lastName={user.last_name}/>
                ))}
            </div>
        </section>
    );
};

export default Training;