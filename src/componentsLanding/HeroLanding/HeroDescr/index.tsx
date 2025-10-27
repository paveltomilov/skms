'use client';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import Button from '../../Button';

const HeroDescr: FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper__strong}>
				<strong>
					Интерактивный симуляционный тренажёр для
					инженерно-технического персонала цехов тепловой автоматики
				</strong>
			</div>
			<div className={styles.wrapper__text}>
				<p>
					Отработка штатных и аварийных ситуаций — в безопасной и
					реалистичной среде
				</p>
			</div>
			<div className={styles.wrapper__button}>
				<Button
					text="попробовать бесплатно"
					color="var(--lan-very-dark-mostly-black-blue)"
					bgColor="var(--lan-bright-cyan---lime-green)" // основной цвет кнопки
					hoverBgColor="var(--lan-moderate-cyan)" // цвет при наведении
					activeBgColor="var(--lan-gray)" // цвет при нажатии
					focusOutlineColor="var(--lan-moderate-cyan)" // outline при фокусе
					width={504}
					height={40}
					radius={4}
				/>
			</div>
		</div>
	);
};

export default HeroDescr;
