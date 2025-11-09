import { FC, useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './styles.module.scss';

import type { Swiper as SwiperCore } from 'swiper';
import ArrowLeftIcon from '../IconsSvg/arrowLeft';
import ArrowRightIcon from '../IconsSvg/arrowRight';

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
				slidesPerView={2}
				loop
				autoplay={{
					delay: 40000,
					disableOnInteraction: false,
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

			<div className={styles.navButtons}>
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
			</div>
		</div>
	);
};

export default Carousel;
