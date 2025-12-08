import React, { FC } from 'react';
import styles from './styles.module.scss';
import Button from '../Button';
import SectionTitle from '../SectionTitle';

const Survey: FC = () => {
	return (
		<section className={styles.survey}>
			<div className={`${styles.survey__container} container`}>
				<SectionTitle
					className={styles.survey__title}
					title="Ваше мнение помогает нам развиваться"
				/>
				<p className={styles.survey__description}>
					Ответьте на несколько вопросов — это займёт всего пару минут
				</p>
				<Button
					className={styles.survey__button}
					text="пройти опрос"
					width={0}
					height={40}
					radius={4}
				/>
			</div>
		</section>
	);
};

export default Survey;
