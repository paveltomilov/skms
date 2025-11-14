import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import Card from './CardAdvantages';

const advantagesData = [
	{
		title: 'Снижение производственных рисков',
		description:
			'Подготовленный персонал реже допускает ошибки\n и аварийные ситуации',
	},
	{
		title: 'Подача,\n которую поймет каждый',
		description:
			'Сложные темы доступны\n и логичны — без лишней бюрроктратии',
	},
	{
		title: 'Экономия на обучении\nи простоях',
		description:
			'Меньше рисков остановок, меньше затрат на адаптацию новых сотрудников',
	},
	{
		title: 'Контроль\nи прозрачность обучения',
		description:
			'Руководство видит\n прогресс и готовность каждого специалиста',
	},
	{
		title: 'Максимально приближён к реальным условиям',
		description:
			'Интерфейс, оборудование\n и сценарии соответствуют реальной практике',
	},
	{
		title: 'Быстрая адаптация\nновых сотрудников',
		description:
			'Снижается риск травматизма у новичков за счет отработки сценариев в безопасной среде',
	},
];

const Advantages: FC = () => (
	<section id="advantages" className={styles.advantages}>
		<div className={`${styles.advantages__container} container`}>
			<SectionTitle
				className={styles.advantages__title}
				width={503}
				title="Преимущества, которые нельзя игнорировать"
			/>
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
		</div>
	</section>
);

export default Advantages;
