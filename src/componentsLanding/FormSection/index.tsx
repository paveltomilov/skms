import styles from './styles.module.scss';
import FormLanding from '../FormLanding';
import Link from 'next/link';
import TelegramIcon from '../IconsSvg/telegram';
import VkIcon from '../IconsSvg/vk';
import YoutubeIcon from '../IconsSvg/youtube';
import DzenIcon from '../IconsSvg/dzen';

function FormSection() {
	return (
		<section className={styles.form__section}>
			<div className={`${styles.form__container} container`}>
				<FormLanding />
				<div className={styles.social__form}>
					<div className={styles.social__form__block}>
						<Link
							className={styles.link}
							target="_blank"
							href="https://web.telegram.org/k/"
						>
							<TelegramIcon className={styles.link__icon} />
							Telegram
						</Link>
					</div>
					<div className={styles.social__form__block}>
						<Link
							className={styles.link}
							target="_blank"
							href="https://vk.com"
						>
							<VkIcon className={styles.link__icon} />
							Вконтакте
						</Link>
					</div>
					<div className={styles.social__form__block}>
						<Link
							className={styles.link}
							target="_blank"
							href="https://www.youtube.com/"
						>
							<YoutubeIcon className={styles.link__icon} />
							Youtube
						</Link>
					</div>
					<div className={styles.social__form__block}>
						<Link
							className={styles.link}
							target="_blank"
							href="https://dzen.ru/"
						>
							<DzenIcon className={styles.link__icon__dzen} />
							Дзен
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FormSection;
