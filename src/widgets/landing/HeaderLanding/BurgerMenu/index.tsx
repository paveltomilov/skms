'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import TelegramIcon from '@/widgets/landing/IconSvg/telegram';
import YoutubeIcon from '@/widgets/landing/IconSvg/youtube';
import DzenIcon from '@/widgets/landing/IconSvg/dzen';
import VkIcon from '@/widgets/landing/IconSvg/vk';

interface MobileMenuProps {
	isOpen: boolean;
	className?: string;
}

const items = [
	{ href: '#about', label: 'О нас' },
	{ href: '#product', label: 'Продукт' },
	{ href: '#advantages', label: 'Преимущества' },
	{ href: '#reviews', label: 'Отзывы' },
];

const socialLinks = [
	{
		href: 'https://vk.com',
		icon: (
			<VkIcon size={24} className={styles.mobile__social__link__icon} />
		),
	},
	{
		href: 'https://web.telegram.org/',
		icon: (
			<TelegramIcon
				size={24}
				className={styles.mobile__social__link__icon}
			/>
		),
	},
	{
		href: 'https://www.youtube.com/',
		icon: (
			<YoutubeIcon
				size={24}
				className={styles.mobile__social__link__icon}
			/>
		),
	},
	{
		href: 'https://dzen.ru/',
		icon: (
			<DzenIcon size={24} className={styles.mobile__social__link__icon} />
		),
	},
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => (
	<div className={`${styles.mobile__menu} ${isOpen ? styles.open : ''}`}>
		<ul className={styles.mobile__list}>
			{items.map(({ href, label }) => (
				<li key={href} className={styles.mobile__item}>
					<Link href={href} className={styles.mobile__link}>
						{label}
					</Link>
				</li>
			))}
		</ul>
		<div className={styles.mobile__mail}>
			<span className={styles.mobile__mail__span}>Почта</span>
			<Link
				className={styles.mobile__mail__link}
				href="mailto:Skillmanagment@mail.ru"
			>
				Skillmanagment@mail.ru
			</Link>
		</div>
		<div className={styles.mobile__social}>
			{socialLinks.map(({ href, icon }) => (
				<Link
					key={href}
					target="_blank"
					href={href}
					className={styles.mobile__social__link}
				>
					{icon}
				</Link>
			))}
		</div>
	</div>
);

export default MobileMenu;
