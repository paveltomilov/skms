import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../SectionTitle';

const ForWhom: FC = () => {
    return (
        <section className={styles.forwhom}>
            <div className={`${styles.forwhom__container} container`}>
                <div className={styles.forwhom__title}>
                    <SectionTitle title="Для кого подойдет?" />
                </div>
                <div className={styles.forwhom__left}></div>
                <ul className={styles.forwhom__list}>
                    <li className={styles.item}>
                        <p className={styles.item__title}>
                            Руководители и методисты
                        </p>
                        <p className={styles.item__description}>
                            Эта группа отвечает за обучение, адаптацию
                            <br /> и эффективность команды. Для них тренажёр —
                            <br />
                            это инструмент оценки, контроля и снижения рисков
                        </p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.item__title}>
                            Опытные инженеры и технические специалисты
                        </p>
                        <p className={styles.item__description}>
                            Инженеры и слесари АСУ ТП могут отрабатывать сложные
                            сценарии и повышать квалификацию без риска <br />
                            для оборудования
                        </p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.item__title}>
                            Начинающие специалисты и студенты
                        </p>
                        <p className={styles.item__description}>
                            Сюда входят молодые сотрудники и студенты
                            техникумов. Для них тренажёр — это безопасная
                            практика
                            <br /> и подготовка к реальной работе
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default ForWhom;