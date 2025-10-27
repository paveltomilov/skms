'use client';
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
				<div className={styles.forwhom__right}>
					<div className={styles.content}>
						<div className={styles.content__title}>
							<p>Руководители и методисты</p>
						</div>
						<div className={styles.content__description}>
							<p>
								Эта группа отвечает за обучение, адаптацию и
								эффективность команды. Для них тренажёр — это
								инструмент оценки, контроля и снижения рисков
							</p>
						</div>
					</div>
					<div className={styles.content}>
						<div className={styles.content__title}>
							<p>Опытные инженеры и технические специалисты</p>
						</div>
						<div className={styles.content__description}>
							<p>
								Инженеры и слесари АСУ ТП могут отрабатывать
								сложные сценарии и повышать квалификацию без
								риска для оборудования
							</p>
						</div>
					</div>
					<div className={styles.content}>
						<div className={styles.content__title}>
							<p>Начинающие специалисты и студенты</p>
						</div>
						<div className={styles.content__description}>
							<p>
								Сюда входят молодые сотрудники и студенты
								техникумов. Для них тренажёр — это безопасная
								практика и подготовка к реальной работе
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ForWhom;
