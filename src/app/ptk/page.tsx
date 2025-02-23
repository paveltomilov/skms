import Image from 'next/image';
import styles from './page.module.scss';
// import Loader from '@c/Loader/Loader';
import ButtonsController from '@c/ButtonsController';
export default function Home() {
  return (
    <div className={styles.page}>
      {/* <Loader /> */}
      <ButtonsController />
    </div>
  );
}
