'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Loader from '@c/Loader/Loader';
import { GateWindow } from '@c/GateWindow/GateWindow';
export default function Home() {
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
      <GateWindow />
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
