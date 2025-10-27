'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import 'swiper/css';
import 'swiper/css/navigation'; // если используете навигацию
import 'swiper/css/pagination';
import Button from '../Button';
import SectionTitle from '../SectionTitle';

const Survey: FC = () => {
	return (
		<section className={styles.survey}>
			<div className={`${styles.survey__container} container`}>
				<SectionTitle title="Ваше мнение помогает нам развиваться" />
				<div className={styles.survey__description}>
					<p>
						Ответьте на несколько вопросов — это займёт всего пару
						минут
					</p>
				</div>
				<Button
					text="пройти опрос"
					color="var(--lan-very-dark-mostly-black-blue)"
					bgColor="var(--lan-bright-cyan---lime-green)" // основной цвет кнопки
					hoverBgColor="var(--lan-moderate-cyan)" // цвет при наведении
					activeBgColor="var(--lan-gray)" // цвет при нажатии
					focusOutlineColor="var(--lan-moderate-cyan)" // outline при фокусе
					width={571}
					height={40}
					radius={4}
				/>
			</div>
		</section>
	);
};

export default Survey;
