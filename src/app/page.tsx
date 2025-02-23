'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Loader from '@c/Loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Импортирт RootState
// import { FilterState } from '../types/storeType';

export default function Home() {
  const filter = useSelector((state: RootState) => state.main.filter); // Используем state.main.filter

  console.log(filter);

  return (
    <main className={styles.main}>
      <Image
        className={styles.logo}
        src="/images/next.svg"
        alt="Next.js Logo"
        width={180}
        height={38}
        priority
      />
      {/* <Loader /> */}

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