'use client';
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
				<img
					className={styles.footer__container__img}
					src="/assets/images/footer.png"
					alt=""
				/>
				<div className={styles.footer_container__left}>
					<Link href="">
						<Image
							src="assets/svg/logo.svg"
							alt="Логотип"
							width={312}
							height={80}
							priority // если это важный контент, загружается сразу
						/>
					</Link>
					<Navigation gap={22} className={styles.footer__nav} />
					<Link
						href=""
						target="_blank"
						className={styles.footer_container_left__link}
					>
						Политика обработки персональных данных
					</Link>
					<Link
						href=""
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
							className={styles.footer_container_right_top__mail}
						>
							<svg
								className={
									styles.footer_container_right_top_mail__svg
								}
								width="19"
								height="15"
								viewBox="0 0 19 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18.75 1.875C18.75 0.84375 17.9062 0 16.875 0H1.875C0.84375 0 0 0.84375 0 1.875V13.125C0 14.1562 0.84375 15 1.875 15H16.875C17.9062 15 18.75 14.1562 18.75 13.125V1.875ZM16.875 1.875L9.375 6.5625L1.875 1.875H16.875ZM16.875 13.125H1.875V3.75L9.375 8.4375L16.875 3.75V13.125Z"
									fill="#F9FAFB"
								/>
							</svg>
							Skillmanagment@mail.ru
						</Link>
						<Link
							href="tel:+78452398636"
							className={
								styles.footer_container_right_top__telephone
							}
						>
							<svg
								className={
									styles.footer_container_right_top_telephone__svg
								}
								width="19"
								height="19"
								viewBox="0 0 19 19"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5.125 0.75C5.625 0.75 7.625 5.25 7.625 5.75C7.625 6.75 6.125 7.75 5.625 8.75C5.125 9.75 6.125 10.75 7.125 11.75C7.515 12.14 9.125 13.75 10.125 13.25C11.125 12.75 12.125 11.25 13.125 11.25C13.625 11.25 18.125 13.25 18.125 13.75C18.125 15.75 16.625 17.25 15.125 17.75C13.625 18.25 12.625 18.25 10.625 17.75C8.625 17.25 7.125 16.75 4.625 14.25C2.125 11.75 1.625 10.25 1.125 8.25C0.625 6.25 0.625 5.25 1.125 3.75C1.625 2.25 3.125 0.75 5.125 0.75Z"
									stroke="#F9FAFB"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							+7 (845) 239-86-36
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
		</footer>
	);
};

export default Footer;
