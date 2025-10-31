'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../../SectionTitle';

const AboutTop: FC = () => {
	return (
		<div className={styles.abouttop}>
			<div className={`${styles.abouttop__container} container`}>
				<img
					className={styles.abouttop__container__img}
					src="/assets/images/line.png"
					alt=""
				/>
				<div className={styles.content}>
					<div className={styles.content__title}>
						<SectionTitle title="Совершенствуем специалистов повышаем эффективность предприятий" />
					</div>
					<div className={styles.content__descr}>
						<div>
							<p>
								Наша миссия — сделать обучение технического
								персонала ключевым элементом безопасности и
								эффективности предприятия
							</p>
						</div>
						<div>
							<p>
								Мы стремимся, чтобы каждый инженер был уверен в
								своих действиях, а предприятие — защищено от
								ошибок, ведущих к авариям
							</p>
						</div>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.block__left}>
						<h4 className={styles.block__title}>Снижаем риски</h4>
						<p className={styles.block__description}>
							Тренажёр снижает инциденты, связанные с человеческим
							фактором
						</p>
					</div>
					<div className={styles.block__right}>
						<h4 className={styles.block__title}>
							Ускоряем адаптацию
						</h4>
						<p className={styles.block__description}>
							Сотрудники осваивают работу в три раза быстрее
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutTop;
