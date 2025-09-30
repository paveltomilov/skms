'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Close from '@/shared/UI/icons/Close';
import EllipseClose from '@/shared/UI/icons/EllipseClose';
import Micro from '@/shared/UI/icons/Micro';
import ArrowChange from '@/shared/UI/icons/ArrowChange';
import OperatorPanel from '@/entities/OperatorPanel';

const FooterPtk: FC = () => {
	return (
		<footer className={styles.footer} aria-label="Панель управления">
			<nav
				className={styles.footer__leftPanel}
				aria-label="Кнопки управления"
			>
				<Button
					width={88}
					height={28}
					aria-label={'Кнопка КА'}
					text="КА"
					href="/ptk/boiler"
				/>
				<Button
					width={88}
					height={28}
					aria-label={'Кнопка ТА'}
					text="ТА"
					href="/ptk"
				/>
				{Array.from({ length: 14 }).map((_, i) => (
					<Button
						key={i}
						width={88}
						height={28}
						aria-label={`Кнопка ${i}`}
						disabled
					/>
				))}
			</nav>

			<div className={styles.footer__centralPanel}>
				<div className={styles.footer__centralGroup__left}>
					<Button
						width={26}
						height={26}
						aria-label="Кнопка С"
						text="С"
					/>
					<Button
						width={26}
						height={26}
						aria-label="Кнопка З"
						text="З"
					/>
				</div>
				<div className={styles.footer__centralGroup__middle}>
					<Button
						width={88}
						height={28}
						aria-label="Левый контрол"
						icon={<ArrowChange />}
					/>
					<Button
						width={88}
						height={28}
						aria-label="Правый контрол"
						icon={<ArrowChange transform="mirror" />}
					/>
				</div>
				<div className={styles.footer__centralGroup__right}>
					<Button
						width={88}
						height={26}
						aria-label="Блок 1"
						text="Бл1"
					/>
					<Button
						width={26}
						height={26}
						aria-label="Закрыть"
						icon={<Close size="xs" />}
						className={styles.footer__centralGroup__right_close}
					/>
				</div>
			</div>

			<div className={styles.footer__rightPanel}>
				<div className={styles.footer__toolsGroup}>
					<Button
						width={88}
						height={28}
						aria-label="Инструмент 1"
						icon={<EllipseClose />}
					/>
					<Button
						width={88}
						height={28}
						aria-label="Инструмент 2"
						icon={<Micro />}
					/>
				</div>
				<div className={styles.footer__warning__wrapper}>
					<p className={styles.footer__warning__text}>
						Предупредительная
					</p>
				</div>
			</div>
			<OperatorPanel />
		</footer>
	);
};

export default FooterPtk;
