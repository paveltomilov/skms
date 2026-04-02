import React from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';
import Navigation from '../Nav';
import Image from 'next/image';
import Link from 'next/link';
import { LANDING_CONTACTS } from '@/shared/configs/landingContacts';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={`${styles.footer__container} container`}>
				<div className={styles.footer__content}>
					<div className={styles.footer__top}>
						<div className={styles.footer__top__left}>
							<Image
								className={styles.footer__logo}
								src="/svg/logo.svg"
								alt="Логотип"
								width={312}
								height={80}
							/>
							<Navigation className={styles.footer__nav} />
						</div>
						<div className={styles.footer__top__right}>
							<Link
								href={`mailto:${LANDING_CONTACTS.email}`}
								className={styles.footer__mail}
							>
								{LANDING_CONTACTS.email}
							</Link>
							<Link
								href={LANDING_CONTACTS.phoneHref}
								className={styles.footer__telephone}
							>
								{LANDING_CONTACTS.phoneText}
							</Link>
						</div>
					</div>

					<div className={styles.footer__bottom}>
						<div className={styles.footer__bottom__left}>
							<Link
								href="/"
								target="_blank"
								className={styles.footer__link}
							>
								Политика обработки персональных данных
							</Link>
							<Link
								href="/policy"
								target="_blank"
								className={styles.footer__link}
							>
								Политики конфиденциальности
							</Link>
						</div>
						<div className={styles.footer__pointpulseBlock}>
							<Link href="/">
								<Image
									className={styles.footer__pointpulse}
									src="/svg/pointpulse.svg"
									alt="PointPulse"
									width={120}
									height={18}
								/>
							</Link>
							<p className={styles.footer__pointpulseCaption}>
								Под тренажёр
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
