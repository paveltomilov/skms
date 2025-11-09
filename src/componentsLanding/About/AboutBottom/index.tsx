import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../../SectionTitle';

const AboutBottom: FC = () => {
	return (
		<div className={styles.aboutbottom}>
			<div className={`${styles.aboutbottom__container} container`}>
				<img
					className={styles.aboutbottom__container_img}
					src="/assets/images/about-bottom.png"
					alt=""
				/>
				<div className={styles.title}>
					<SectionTitle title="Опросы показали," />
					<SectionTitle title="что обучение требует изменений" />
				</div>
				<div className={styles.content}>
					<div className={styles.content__left}>
						<p className={styles.content__left__description}>
							Недостаток практики, перегрузка теорией и
							непрозрачная система оценки навыков мешают
							сотрудникам получать реальные результаты
						</p>
						<div className={styles.supervisor}>
							<span className={styles.supervisor__procent}>
								~75%
							</span>
							<p className={styles.supervisor__descr}>
								Руководителей считают текущие методы обучения
								устаревшими
							</p>
						</div>
					</div>
					<div className={styles.content__right}>
						<p className={styles.content__right__description}>
							Мы выяснили: ценность тренажёра в практике, которая
							приближает к реальным условиям
						</p>
						<div className={styles.statistic}>
							<h4 className={styles.statistic__title}>
								Топ-3 цели при работе с тренажером
							</h4>
							<div className={styles.schedule}>
								<div className={styles.schedule1}>
									<p className={styles.interest}>41,7%</p>
									<p className={styles.statistic__descr}>
										Уверенность в работе
									</p>
								</div>
								<div className={styles.schedule2}>
									<p className={styles.interest}>25%</p>
									<p className={styles.statistic__descr}>
										Подготовкак аттестации
									</p>
								</div>
								<div className={styles.schedule3}>
									<p className={styles.interest}>16,7%</p>
									<p className={styles.statistic__descr}>
										Повышение квалификации
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutBottom;
