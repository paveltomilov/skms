'use client';
import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';

const HeaderPtk: FC = () => {

	// для вывода показаний частоты и мощности

	const readings = {
		'freq': 49.96,
		'pwr': 120.9
	};

	const [dateTime, setDateTime] = useState(new Date());
	useEffect(() => {
		const id = setInterval(() => {
			setDateTime(new Date());
		}, 1000);
		return () => {
			clearInterval(id);
		};
	}, []);


	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.windows}>
					<div className={styles.windows_ptk}>ПТК</div>
					<div className={styles.windows_defense}>Pабота защит</div>
					<div className={styles.windows_kpm}>КРМ</div>
				</div>
				<Window
				color = 'yellow'
				value='-4'
				textRight='°C'
				/>

				<div className={styles.buttons}>
					<Button
						className={styles.button}
						width={140}
						height={32}
						id="menu"
						text="Гл. меню"
						onClick={() => console.log('Нажата кнопка Главное меню')}
					/>
					<Button
						className={styles.button}
						width={140}
						height={32}
						id="signals"
						text="Сигналы"
						onClick={() => console.log('Нажата кнопка Сигналы')}
					/>
					<Button
						className={styles.button}
						width={140}
						height={32}
						id="graphs"
						text="Графики"
						onClick={() => console.log('Нажата кнопка Графики')}
					/>
				</div>
				<Button
					className={styles.button}
					width={32}
					height={32}
					id="?"
					text="?"
					onClick={() => console.log('Нажата кнопка ?')}
				/>
				<div className={styles.datetime}>{dateTime.toLocaleDateString('ru-RU',
					{
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})} {dateTime.toLocaleTimeString('ru-RU')}</div>
				<div className={styles.readings}>{readings.freq}Гц {readings.pwr}МВт</div>
			</div>
		</header>
	);
};

export default HeaderPtk;
