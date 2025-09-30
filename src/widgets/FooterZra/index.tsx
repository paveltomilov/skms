'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import ArrowChange from '@/shared/UI/icons/ArrowChange';
import OperatorPanel from '@/entities/OperatorPanel';

const FooterZra: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__buttons}>
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
			<OperatorPanel />
		</footer>
	);
};

export default FooterZra;
