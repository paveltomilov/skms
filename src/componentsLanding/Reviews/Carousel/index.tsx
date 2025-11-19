import { FC, useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './styles.module.scss';
import type { Swiper as SwiperCore } from 'swiper';
import ArrowLeftIcon from '../../IconSvg/arrowLeft';
import ArrowRightIcon from '../../IconSvg/arrowRight';

const Carousel: FC<{ slides: React.ReactNode[] }> = ({ slides }) => {
	const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(
		null,
	);

	const swiperRef = useRef<SwiperCore | null>(null);

	useEffect(() => {
		if (swiperInstance) {
			swiperRef.current = swiperInstance;
		}
	}, [swiperInstance]);

	return (
		<div className={styles.carousel}>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={20}
				slidesPerView={1}
				slidesPerGroup={1}
				loop
				autoplay={{
					delay: 50000,
					disableOnInteraction: false,
				}}
				breakpoints={{
					390: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 1.077,
					},
					992: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
				}}
				onSwiper={setSwiperInstance}
				className={styles.swiper}
			>
				{slides.map((content, i) => (
					<SwiperSlide key={i} className={styles.slide}>
						{content}
					</SwiperSlide>
				))}
			</Swiper>

			<button className={styles.swiper__button}>
				<ArrowLeftIcon
					aria-label="Предыдущий слайд"
					onClick={() => swiperRef.current?.slidePrev()}
					className={`${styles.arrow} ${styles.prev}`}
				/>
				<ArrowRightIcon
					aria-label="Следующий слайд"
					onClick={() => swiperRef.current?.slideNext()}
					className={`${styles.arrow} ${styles.next}`}
				/>
			</button>
		</div>
	);
};

export default Carousel;
