'use client';
import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './styles.module.scss';
import SectionTitle from '../../SectionTitle';

const cards = [
	{
		title: 'Снижаем риски',
		description:
			'Тренажёр снижает инциденты, связанные с человеческим фактором',
		className: styles.item__left,
	},
	{
		title: 'Ускоряем адаптацию',
		description: 'Сотрудники осваивают работу в три раза быстрее',
		className: styles.item__right,
	},
];
const AboutTop: FC = () => {
	const isMobile = useMediaQuery({ maxWidth: 576 });

	return (
		<section className={styles.abouttop}>
			<div className={`${styles.abouttop__container} container`}>
				<div className={styles.content}>
					{isMobile ? (
						<SectionTitle
							className={styles.content__title}
							width={359}
							title="Совершенствуем специалистов повышаем эффективность предприятий"
						/>
					) : (
						<SectionTitle
							className={styles.content__title}
							width={503}
							title="Совершенствуем специалистов повышаем эффективность предприятий"
						/>
					)}
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
						{cards.map((card, id) => (
							<li key={id} className={card.className}>
								<h4 className={styles.item__title}>
									{card.title}
								</h4>
								<p className={styles.item__description}>
									{card.description}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default AboutTop;
