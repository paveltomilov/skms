import React, { FC } from 'react';
import SectionTitle from '../../SectionTitle';
import styles from './styles.module.scss';

const statisticData = [
	{
		interest: '41,7%',
		descr: 'Уверенность в работе',
		className: styles.item1,
	},
	{
		interest: '25%',
		descr: 'Подготовка к аттестации',
		className: styles.item2,
	},
	{
		interest: '16,7%',
		descr: 'Повышение квалификации',
		className: styles.item3,
	},
];

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
									{statisticData.map((item, idx) => (
										<li
											key={idx}
											className={item.className}
										>
											<p
												className={
													styles.item__interest
												}
											>
												{item.interest}
											</p>
											<p className={styles.item__descr}>
												{item.descr}
											</p>
										</li>
									))}
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
