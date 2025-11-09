import React from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';
import Navigation from '../Nav';
import Image from 'next/image';
import Link from 'next/link';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={`${styles.footer__container} container`}>
				<div className={styles.footer__content}>
					<div className={styles.footer__left}>
						<Image
							className={styles.footer__logo}
							src="assets/svg/logo.svg"
							alt="Логотип"
							width={312}
							height={80}
						/>
						<Navigation className={styles.footer__nav} />
						<Link
							href="/politic/person"
							target="_blank"
							className={styles.footer_container_left__link}
						>
							Политика обработки персональных данных
						</Link>
						<Link
							href="/politic/confidential"
							target="_blank"
							className={styles.footer_container_left__link}
						>
							Политики конфиденциальности
						</Link>
					</div>
					<div className={styles.footer_container__right}>
						<div className={styles.footer_container_right__top}>
							<Link
								href="mailto:Skillmanagment@mail.ru"
								className={
									styles.footer_container_right_top__mail
								}
							>
								Skillmanagment@mail.ru
							</Link>
							<Link
								href="tel:+78452398636"
								className={
									styles.footer_container_right_top__telephone
								}
							>
								+7 (8452) 39-86-36
							</Link>
						</div>
						<div className={styles.footer_container_right__logo}>
							<Link href="https://controlspace.ru/">
								<Image
									src="assets/svg/pointpulse.svg"
									alt="Логотип"
									width={120}
									height={18}
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
