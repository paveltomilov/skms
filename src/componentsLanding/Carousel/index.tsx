'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './styles.module.scss';

import type { Swiper as SwiperCore } from 'swiper';

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
					delay: 4000,
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
				<button
					type="button"
					aria-label="Предыдущий слайд"
					onClick={() => swiperRef.current?.slidePrev()}
					className={`${styles.arrow} ${styles.prev}`}
				>
					<svg
						width="14"
						height="26"
						viewBox="0 0 14 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13 1L1 13L13 25"
							stroke="#F9FAFB"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>

				<button
					type="button"
					aria-label="Следующий слайд"
					onClick={() => swiperRef.current?.slideNext()}
					className={`${styles.arrow} ${styles.next}`}
				>
					<svg
						className={styles.button__svg}
						width="14"
						height="26"
						viewBox="0 0 14 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.999998 25L13 13L1 0.999999"
							stroke="#F9FAFB"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Carousel;
