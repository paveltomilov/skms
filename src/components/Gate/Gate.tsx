import style from "./Gate.module.scss";

export const Gate = (id:string) => {
  return (
    <div className={style.gate} id={id}>
        <svg width="25" height="26" aria-hidden="true">
          <use xlinkHref="/images/sprite.svg#icon-gate-left"></use>
        </svg>
        <svg width="25" height="26" aria-hidden="true">
          <use xlinkHref="/images/sprite.svg#icon-gate-right"></use>
        </svg>
    </div>
  );
};
