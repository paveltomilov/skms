import React, { FC } from 'react';
import styles from './styles.module.scss';
import Button from '../../Button';

const HeroDescr: FC = () => {
	return (
		<div className={styles.wrapper}>
			<strong className={styles.wrapper__strong}>
				Интерактивный&nbsp;симуляционный&nbsp;тренажёр для
				инженерно-технического персонала цехов тепловой автоматики
			</strong>
			<p className={styles.wrapper__text}>
				Отработка штатных и аварийных ситуаций&nbsp;— в безопасной и
				реалистичной&nbsp;среде
			</p>
			<Button
				className={styles.wrapper__button}
				text="попробовать бесплатно"
				href="/login"
				width={504}
				height={40}
				radius={4}
				color="var(--lan-very-dark-mostly-black-blue)"
			/>
		</div>
	);
};

export default HeroDescr;
