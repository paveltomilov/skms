import React from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import TelegramIcon from '@/componentsLanding/IconsSvg/telegram';
import YoutubeIcon from '@/componentsLanding/IconsSvg/youtube';
import DzenIcon from '@/componentsLanding/IconsSvg/dzen';
import VkIcon from '@/componentsLanding/IconsSvg/vk';
import WhatsappIcon from '@/componentsLanding/IconsSvg/whatsapp';

const HeaderWindow: FC = () => {
	return (
		<div className={styles.header}>
			<div className={styles.header__window}>
				<div className={styles.mail}>
					<span className={styles.mail__span}>Почта</span>
					<Link
						className={styles.mail__link}
						href="mailto:Skillmanagment@mail.ru"
					>
						Skillmanagment@mail.ru
					</Link>
				</div>
				<div className={styles.social}>
					<Link
						target="_blank"
						className={styles.social__link}
						href="https://www.whatsapp.com/"
					>
						<WhatsappIcon
							size={16}
							className={styles.social__link__icon}
						/>
					</Link>
					<Link
						target="_blank"
						className={styles.social__link}
						href="https://web.telegram.org/"
					>
						<TelegramIcon
							size={16}
							className={styles.social__link__icon}
						/>
					</Link>

					<Link
						target="_blank"
						className={styles.social__link}
						href="https://www.youtube.com/"
					>
						<YoutubeIcon
							size={16}
							className={styles.social__link__icon}
						/>
					</Link>
					<Link
						target="_blank"
						className={styles.social__link}
						href="https://dzen.ru/"
					>
						<DzenIcon
							size={16}
							className={styles.social__link__icon}
						/>
					</Link>
					<Link
						target="_blank"
						className={styles.social__link}
						href="https://vk.com"
					>
						<VkIcon
							size={16}
							className={styles.social__link__icon}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeaderWindow;
