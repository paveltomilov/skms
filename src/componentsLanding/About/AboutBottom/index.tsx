import React, { FC } from 'react';
import SectionTitle from '../../SectionTitle';
import styles from './styles.module.scss';

const AboutBottom: FC = () => {
	return (
		<section className={styles.aboutbottom}>
			<div className={`${styles.aboutbottom__container} container`}>
				<div className={styles.aboutbottom__content}>
					<SectionTitle
						className={styles.title}
						title="Опросы показали, что&nbsp;обучение&nbsp;требует изменений"
					/>
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
									Руководителей считают текущие методы
									обучения устаревшими
								</p>
							</div>
						</div>
						<div className={styles.content__right}>
							<p className={styles.content__right__description}>
								Мы выяснили: ценность тренажёра в практике,
								которая приближает к&nbsp;реальным условиям
							</p>
							<div className={styles.statistic}>
								<h4 className={styles.statistic__title}>
									Топ-3 цели при работе с тренажером
								</h4>
								<ul className={styles.schedule__list}>
									<li className={styles.item1}>
										<p className={styles.item__interest}>
											41,7%
										</p>
										<p className={styles.item__descr}>
											Уверенность в&nbsp;работе
										</p>
									</li>
									<li className={styles.item2}>
										<p className={styles.item__interest}>
											25%
										</p>
										<p className={styles.item__descr}>
											Подготовка к&nbsp;аттестации
										</p>
									</li>
									<li className={styles.item3}>
										<p className={styles.item__interest}>
											16,7%
										</p>
										<p className={styles.item__descr}>
											Повышение квалификации
										</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutBottom;
