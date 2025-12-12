'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Close from '@/shared/UI/icons/Close';
import EllipseClose from '@/shared/UI/icons/EllipseClose';
import Micro from '@/shared/UI/icons/Micro';
import ArrowChange from '@/shared/UI/icons/ArrowChange';
import OperatorPanel from '@/entities/OperatorPanel';
import useShowModal from '@/shared/hooks/useShowModal';
import {
	configButtonListBottom,
	configButtonListTop,
} from '@/shared/configs/listButtonFooterPtk';

const FooterPtk: FC = () => {
	const handleModalNotification = useShowModal('notification');

	return (
		<footer className={styles.footer} aria-label="Панель управления">
			<nav
				className={styles.footer__leftPanel}
				aria-label="Кнопки управления"
			>
				<div className={styles.footer__leftPanel__top}>
					{configButtonListTop.map((item, idx) => (
						<Button
							key={idx}
							{...item}
							ariaLabel={
								item.ariaLabel
									? `${item.ariaLabel}`
									: `Кнопка ${idx + 1} верхней панели`
							}
						/>
					))}
				</div>

				<div className={styles.footer__leftPanel__bottom}>
					{configButtonListBottom.map((item, idx) => (
						<Button
							key={idx}
							{...item}
							ariaLabel={
								item.ariaLabel
									? `${item.ariaLabel}`
									: `Кнопка ${idx + 1} нижней панели`
							}
						/>
					))}
				</div>
			</nav>

			<div className={styles.footer__centralPanel}>
				<div className={styles.footer__centralGroup__left}>
					<Button
						width={26}
						height={26}
						aria-label="Кнопка С"
						text="С"
						onClick={handleModalNotification}
					/>
					<Button
						width={26}
						height={26}
						aria-label="Кнопка З"
						text="З"
						onClick={handleModalNotification}
					/>
				</div>
				<div className={styles.footer__centralGroup__middle}>
					<Button
						width={88}
						height={28}
						aria-label="Левый контрол"
						icon={<ArrowChange />}
						onClick={handleModalNotification}
					/>
					<Button
						width={88}
						height={28}
						aria-label="Правый контрол"
						icon={<ArrowChange transform="mirror" />}
						onClick={handleModalNotification}
					/>
				</div>
				<div className={styles.footer__centralGroup__right}>
					<Button
						width={88}
						height={26}
						aria-label="Блок 1"
						text="Бл1"
						onClick={handleModalNotification}
					/>
					<Button
						width={26}
						height={26}
						aria-label="Закрыть"
						icon={<Close size="xs" />}
						className={styles.footer__centralGroup__right_close}
						onClick={handleModalNotification}
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
						onClick={handleModalNotification}
					/>
					<Button
						width={88}
						height={28}
						aria-label="Инструмент 2"
						icon={<Micro />}
						onClick={handleModalNotification}
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
