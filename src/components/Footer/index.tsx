'use client';

import React from 'react';
import styles from './styles.module.scss';
import Button from '@/components/Button';
import { SmallCross, CurvedArrow, EllipseClose, Micro } from '@/shared/svg';

const Footer = () => {
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
						className={`${styles.footer__button} ${
							i < 8 && styles['footer__button--first-row']
						}`}
						aria-label={`Кнопка ${i}`}
					>
						{i === 0 && (
							<span className={styles.footer__buttonText}>
								КА
							</span>
						)}
						{i === 1 && (
							<span className={styles.footer__buttonText}>
								ТА
							</span>
						)}
					</Button>
				))}
			</nav>

			<div className={styles.footer__centralPanel}>
				<div className={styles.footer__centralGroup__left}>
					<Button
						id="footer-control-button-c"
						width={26}
						height={26}
						className={styles.footer__controlButton}
						aria-label="Кнопка С"
					>
						С
					</Button>
					<Button
						id="footer-control-button-z"
						width={26}
						height={26}
						className={styles.footer__controlButton}
						aria-label="Кнопка З"
					>
						З
					</Button>
				</div>
				<div className={styles.footer__centralGroup__middle}>
					<Button
						id="footer-left-control-button"
						width={88}
						height={28}
						className={styles.footer__mainButton}
						aria-label="Левый контрол"
					>
						<CurvedArrow />
					</Button>
					<Button
						id="footer-right-control-button"
						width={88}
						height={28}
						className={styles.footer__mainButton}
						aria-label="Правый контрол"
					>
						<CurvedArrow className={styles.footer__arrow} />
					</Button>
				</div>
				<div className={styles.footer__centralGroup__right}>
					<Button
						id="footer-block-1-button"
						width={88}
						height={26}
						className={styles.footer__actionButton}
						aria-label="Блок 1"
					>
						Бл1
					</Button>
					<Button
						id="footer-close-button"
						width={26}
						height={26}
						className={styles.footer__closeButton}
						aria-label="Закрыть"
					>
						<SmallCross />
					</Button>
				</div>
			</div>

			<div className={styles.footer__rightPanel}>
				<div className={styles.footer__toolsGroup}>
					<Button
						id="footer-tool-1-button"
						width={88}
						height={28}
						className={styles.footer__toolButton}
						aria-label="Инструмент 1"
					>
						<EllipseClose />
					</Button>
					<Button
						id="footer-tool-2-button"
						width={88}
						height={28}
						className={styles.footer__toolButton}
						aria-label="Инструмент 2"
					>
						<Micro />
					</Button>
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
					className={styles.footer__largeButton}
					image={{
						src: '/images/operator.webp',
						width: 40,
						height: 40,
					}}
					// eslint-disable-next-line no-console
					onClick={() => console.log('Кнопка оператор работает!')}
					style={{ padding: '1px' }}
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
