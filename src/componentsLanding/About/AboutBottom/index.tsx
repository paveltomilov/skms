'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../../SectionTitle';

const AboutBottom: FC = () => {
	return (
		<div className={styles.aboutbottom}>
			<div className={`${styles.aboutbottom__container} container`}>
				<img
					className={styles.aboutbottom__container_img}
					src="assets/images/about-bottom.png"
					alt=""
				/>
				<div className={styles.title}>
					<SectionTitle title="Опросы показали, что обучение требует изменений" />
				</div>
				<div className={styles.content}>
					<div className={styles.content__left}>
						<div className={styles.content__left__description}>
							<p>
								Недостаток практики, перегрузка теорией и
								непрозрачная система оценки навыков мешают
								сотрудникам получать реальные результаты
							</p>
						</div>
						<div className={styles.supervisor}>
							<div className={styles.supervisor__image}>
								<img
									src="/assets/images/txt.png"
									width="266"
									height="100"
									alt="/"
								/>
							</div>
							<div className={styles.supervisor__descr}>
								<p>
									Руководителей считают текущие методы
									обучения устаревшими
								</p>
							</div>
						</div>
					</div>
					<div className={styles.content__right}>
						<div className={styles.content__right__description}>
							<p>
								Мы выяснили: ценность тренажёра в практике,
								которая приближает к реальным условиям
							</p>
						</div>
						<div className={styles.statistic}>
							<h4 className={styles.statistic__title}>
								Топ-3 цели при работе с тренажером
							</h4>
							<div className={styles.schedule}>
								<div className={styles.schedule1}>
									<div className={styles.interest}>
										<p>41,7%</p>
									</div>
									<div className={styles.statistic__descr}>
										<p>Уверенность в работе</p>
									</div>
								</div>
								<div className={styles.schedule2}>
									<div className={styles.interest}>
										<p>25%</p>
									</div>
									<div className={styles.statistic__descr}>
										<p>Подготовкак аттестации</p>
									</div>
								</div>
								<div className={styles.schedule3}>
									<div className={styles.interest}>
										<p>16,7%</p>
									</div>
									<div className={styles.statistic__descr}>
										<p>Повышение квалификации</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default AboutBottom;
