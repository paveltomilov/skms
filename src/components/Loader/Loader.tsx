import style from './Loader.module.scss';
import Image from 'next/image';
const Loader = () => {
  return (
    <div className={style.load}>
      <Image
        width="121"
        height="130"
        src="/images/load.svg"
        alt="Loading"
        className={style.image}
      />
    </div>
  );
};

export default Loader;
