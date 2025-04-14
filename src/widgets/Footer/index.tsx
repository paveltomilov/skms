'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import Close from '@/shared/UI/icons/Close';
import EllipseClose from '@/shared/UI/icons/EllipseClose';
import Micro from '@/shared/UI/icons/Micro';

const Footer: FC = () => {
	return (
		<footer className={styles.footer} aria-label="Панель управления">
			<nav
				className={styles.footer__leftPanel}
				aria-label="Кнопки управления"
			>
				{Array.from({ length: 16 }).map((_, i) => (
					<Button
						key={i}
						id={`footer-button-${i}`}
						width={88}
						height={28}
						aria-label={`Кнопка ${i}`}
						disabled={i > 1}
						text={
							i === 0 ? (
								<span className={styles.footer__buttonText}>
									КА
								</span>
							) : i === 1 ? (
								<span className={styles.footer__buttonText}>
									ТА
								</span>
							) : undefined
						}
					/>
				))}
			</nav>

			<div className={styles.footer__centralPanel}>
				<div className={styles.footer__centralGroup__left}>
					<Button
						id="footer-control-button-c"
						width={26}
						height={26}
						aria-label="Кнопка С"
						text="С"
					/>
					<Button
						id="footer-control-button-z"
						width={26}
						height={26}
						aria-label="Кнопка З"
						text="З"
					/>
				</div>
				<div className={styles.footer__centralGroup__middle}>
					<Button
						id="footer-left-control-button"
						width={88}
						height={28}
						aria-label="Левый контрол"
						icon={<Chevron size="sm" transform="rotateLeft90" />}
					/>
					<Button
						id="footer-right-control-button"
						width={88}
						height={28}
						aria-label="Правый контрол"
						icon={<Chevron size="sm" transform="rotate90" />}
					/>
				</div>
				<div className={styles.footer__centralGroup__right}>
					<Button
						id="footer-block-1-button"
						width={88}
						height={26}
						aria-label="Блок 1"
						text="Бл1"
					/>
					<Button
						id="footer-close-button"
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
						id="footer-tool-1-button"
						width={88}
						height={28}
						aria-label="Инструмент 1"
						icon={<EllipseClose />}
					/>
					<Button
						id="footer-tool-2-button"
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

			<div className={styles.footer__operatorPanel}>
				<Button
					id="footer-operator-button"
					width={44}
					height={44}
					image={{
						src: '/images/operator.webp',
						width: 40,
						height: 40,
					}}
					style={{ padding: '1px' }}
					onClick={() => console.log('Кнопка оператор работает!')}
				/>
				<div className={styles.footer__operator__wrapper}>
					<span className={styles.footer__operator}>Оператор:</span>
					<span className={styles.footer__operatorName}>
						ASUTP_SMENA_V
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
