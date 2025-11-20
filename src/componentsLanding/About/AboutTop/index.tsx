import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../../SectionTitle';

const AboutTop: FC = () => {
    return (
        <section className={styles.abouttop}>
            <div className={`${styles.abouttop__container} container`}>
                <div className={styles.content}>
                    <SectionTitle
                        className={styles.content__title}
                        title="Совершенствуем специалистов повышаем эффективность предприятий"
                        width={504}
                    />
                    <div className={styles.content__descr}>
                        <p>
                            Наша миссия&nbsp;&mdash; сделать обучение
                            технического персонала ключевым элементом
                            безопасности и&nbsp;эффективности&nbsp;предприятия
                        </p>
                        <p>
                            Мы&nbsp;стремимся, чтобы каждый инженер был уверен
                            в&nbsp;своих действиях,
                            а&nbsp;предприятие&nbsp;&mdash; защищено
                            от&nbsp;ошибок, ведущих к&nbsp;авариям
                        </p>
                    </div>

                    <ul className={styles.card__list}>
                        <li className={styles.item__left}>
                            <h4 className={styles.item__title}>
                                Снижаем риски
                            </h4>
                            <p className={styles.item__description}>
                                Тренажёр снижает инциденты, связанные с
                                человеческим фактором
                            </p>
                        </li>
                        <li className={styles.item__right}>
                            <h4 className={styles.item__title}>
                                Ускоряем адаптацию
                            </h4>
                            <p className={styles.item__description}>
                                Сотрудники осваивают работу в&nbsp;три&nbsp;раза
                                быстрее
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutTop;