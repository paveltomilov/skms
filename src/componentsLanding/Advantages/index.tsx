'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import Card from './CardAdvantages';

const Advantages: FC = () => {
	return (
		<section id="advantages" className={styles.advantages}>
			<div className={`${styles.advantages__container} container`}>
				<div className={styles.advantages__title}>
					<SectionTitle
						width={503}
						title="Преимущества, которые нельзя игнорировать"
					/>
				</div>
				<div className={styles.advantages__content}>
					<Card
						title="Снижение производственных рисков"
						description="Подготовленный персонал реже допускает ошибки и аварийные ситуации"
						gap="24"
					/>
					<Card
						title="Подача, которую поймет каждый"
						description="Сложные темы доступны и логичны — без лишней бюрроктратии"
						gap="24"
					/>
					<Card
						title="Экономия на обучении и простоях"
						description="Меньше рисков остановок, меньше затрат на адаптацию новых сотрудников"
						gap="24"
					/>
					<Card
						title="Контроль и прозрачность обучения"
						description="Руководство видит прогресс и готовность каждого специалиста"
						gap="24"
					/>
					<Card
						title="Максимально приближёнк реальным условиям"
						description="Интерфейс, оборудование и сценарии соответствуют реальной практике"
						gap="24"
					/>
					<Card
						title="Быстрая адаптация новых сотрудников"
						description="Снижается риск травматизма у новичков за счет отработки сценариев в безопасной среде"
						gap="24"
					/>
				</div>
			</div>
		</section>
	);
};

export default Advantages;
