"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from "react";
import Loader from "@c/Loader/Loader";
import nextIcon from "../../public/images/file.svg";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => setLoading((prev) => !prev);
  return (
    <main className={styles.main}>
      <h1>Home</h1>
      {loading && <Loader />}
      <button onClick={handleClick}>TOGGLE LOADING</button>
      <Image
        className={styles.logo}
        src="/images/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <Image
        className={styles.logo}
        src={nextIcon}
        alt="Next.js logo"
        priority
      />

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
