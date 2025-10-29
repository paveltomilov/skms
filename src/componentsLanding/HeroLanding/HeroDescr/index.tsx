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

			<Button
				className={styles.wrapper__button}
				text="попробовать бесплатно"
				width={504}
				height={40}
				radius={4}
			/>
		</div>
	);
};

export default HeroDescr;
