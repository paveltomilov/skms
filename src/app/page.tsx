'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Loader from '@c/Loader/Loader';

export default function Home() {
  // const filter = useSelector(
  //   (state: { reduserFilter: { filter: FilterState } }) =>
  //     state.reduserFilter.filter
  // );
  return (
    <main className={styles.main}>
      <Image
        className={styles.logo}
        src="/images/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <Loader />

      <a
        className={styles.primary}
        href="/ptk"
        target="_blank"
        rel="noopener noreferrer"
      >
        ПТК
      </a>
    </main>
  );
}
