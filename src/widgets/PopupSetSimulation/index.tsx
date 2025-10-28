import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';

const malfunctions: string[] =
    [
        'Неисправность 1',
        'Неисправность 2',
        'Неисправность 3',
        'Неисправность 4',
        'Неисправность 5',
        'Неисправность 6',
    ];

export const PopupSetSimulation: FC = () => {
    return (
        <div className={styles.popup}>
            <Button
                width={307}
                height={38}
                text='+ Добавить элемент'
            />
            <div className={styles.element}>Название элемента</div>
            <div className={styles.malfunction}>
                <select
                    name="malfunction"
                    id="malfunction-select"
                    className={styles.malfunction__select}
                    onChange={e => console.log(e.target.value)}
                >
                    {malfunctions.map((mal) => (
                        <option key={mal} value={mal} className='opt'>
                            {mal}
                        </option>
                    ))}
                </select>
            </div>
            <Button
                width={307}
                height={38}
                text='Удалить симуляцию'
            />
            <Button
                width={307}
                height={38}
                text='Назначить симуляцию'
            />
        </div>
    );
};