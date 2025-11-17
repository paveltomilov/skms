'use client';

import React, { FC } from 'react';
import SectionTitle from '../SectionTitle';
import Card from './CardAdvantages';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './styles.module.scss';

const advantagesData = [
	{
		title: 'Снижение производственных рисков',
		description:
			'Подготовленный персонал реже допускает ошибки и аварийные ситуации',
	},
	{
		title: 'Подача,\n которую поймет каждый',
		description:
			'Сложные темы доступны и логичны — без лишней бюрроктратии',
	},
	{
		title: 'Экономия на обучении\nи простоях',
		description:
			'Меньше рисков остановок, меньше затрат на адаптацию новых сотрудников',
	},
	{
		title: 'Контроль\nи прозрачность обучения',
		description:
			'Руководство видит прогресс и готовность каждого специалиста',
	},
	{
		title: 'Максимально приближён к реальным условиям',
		description:
			'Интерфейс, оборудование и сценарии соответствуют реальной практике',
	},
	{
		title: 'Быстрая адаптация\nновых сотрудников',
		description:
			'Снижается риск травматизма у новичков за счет отработки сценариев в безопасной среде',
	},
];

const Advantages: FC = () => {
	const isMobile = useMediaQuery({ maxWidth: 479 });
	return (
		<section id="advantages" className={styles.advantages}>
			<div className={`${styles.advantages__container} container`}>
				{isMobile ? (
					<SectionTitle
						className={styles.advantages__title}
						width={359}
						title="Преимущества, которые нельзя игнорировать"
					/>
				) : (
					<SectionTitle
						className={styles.advantages__title}
						width={503}
						title="Преимущества, которые нельзя игнорировать"
					/>
				)}

				{isMobile ? (
					<Swiper
						slidesPerView={1}
						spaceBetween={16}
						breakpoints={{
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
						}}
					>
						{advantagesData.map((item, index) => (
							<SwiperSlide key={index}>
								<li className={styles.advantages__list}>
									<Card
										title={item.title}
										description={item.description}
										gap="24"
									/>
								</li>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<ul className={styles.advantages__list}>
						{advantagesData.map((item, index) => (
							<li key={index}>
								<Card
									title={item.title}
									description={item.description}
									gap="24"
								/>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default Advantages;
