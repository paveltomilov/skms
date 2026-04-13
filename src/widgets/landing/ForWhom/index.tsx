import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../SectionTitle';

const forWhomData = [
	{
		title: 'Электрослесари КИП',
		description:
			'Для электрослесарей КИП тренажёр позволяет без вмешательства в технологический процесс проходить все итерации выполнения работ и отрабатывать действия в безопасной среде.',
	},
	{
		title: 'Опытные инженеры и технические специалисты',
		description:
			'Инженеры и слесари АСУ ТП могут отрабатывать сложные сценарии и повышать квалификацию без риска для оборудования.',
	},
	{
		title: 'Начинающие специалисты и студенты',
		description:
			'Сюда входят молодые сотрудники и студенты техникумов. Для них тренажёр — это безопасная практика и подготовка к реальной работе.',
	},
];

const ForWhom: FC = () => {
	return (
		<section className={styles.forwhom}>
			<div className={`${styles.forwhom__container} container`}>
				<SectionTitle
					className={styles.forwhom__title}
					title="Для кого подойдет&nbsp;?"
				/>

				<div className={styles.forwhom__left}></div>
				<ul className={styles.forwhom__list}>
					{forWhomData.map((item, idx) => (
						<li key={idx} className={styles.item}>
							<p className={styles.item__title}>{item.title}</p>
							<p className={styles.item__description}>
								{item.description}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default ForWhom;
