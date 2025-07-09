'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import ArrowChange from '@/shared/UI/icons/ArrowChange';

const FooterZra: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__buttons}>
				<Button
					id="footer-left-control-button"
					width={88}
					height={28}
					aria-label="Левый контрол"
					icon={<ArrowChange />}
				/>
				<Button
					id="footer-right-control-button"
					width={88}
					height={28}
					aria-label="Правый контрол"
					icon={<ArrowChange transform="mirror" />}
				/>
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

export default FooterZra;
