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
								href="mailto:Skillmanagment@mail.ru"
								className={styles.footer__mail}
							>
								Skillmanagment@mail.ru
							</Link>
							<Link
								href="tel:+78452398636"
								className={styles.footer__telephone}
							>
								+7 (8452) 39-86-36
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
						<Link href="https://controlspace.ru/">
							<Image
								className={styles.footer__pointpulse}
								src="/svg/pointpulse.svg"
								alt="Логотип"
								width={120}
								height={18}
							/>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
